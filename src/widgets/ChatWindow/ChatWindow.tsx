import { useState, useEffect } from 'react';
import type { FC, SyntheticEvent } from 'react';
import { greenApi } from '../../shared/api/greenApi/api';

import { ChatHeader } from '../ChatHeader/ChatHeader';
import './ChatWindow.scss';

interface ChatWindowProps {
	idInstance: string;
	apiTokenInstance: string;
	chatId: string;
	onLogout: () => void;
}

interface IMessageItem {
	id: string;
	text: string;
	sender: 'me' | 'incoming';
	time: string;
}

export const ChatWindow: FC<ChatWindowProps> = ({
	idInstance,
	apiTokenInstance,
	chatId,
	onLogout,
}) => {
	const [messages, setMessages] = useState<IMessageItem[]>([]);
	const [inputText, setInputText] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

	const getCurrentTime = () => {
		const now = new Date();
		return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	};

	// фоновый опрос входящих сообщений (Polling)
	useEffect(() => {
		let isMounted = true;

		const pollNotifications = async () => {
			try {
				const response = await greenApi.receiveNotification(
					idInstance,
					apiTokenInstance
				);

				if (!isMounted || !response) return;

				const { receiptId, body } = response;

				// проверка что это входящее текстовое сообщение
				if (
					body &&
					body.typeWebhook === 'incomingMessageReceived' &&
					body.messageData &&
					body.messageData.typeMessage === 'textMessage'
				) {
					const senderChatId = body.senderData?.chatId;
					const text = body.messageData.textMessageData?.textMessage;

					// если сообщение относится к активному чату
					if (senderChatId === chatId && text) {
						setMessages((prev) => [
							...prev,
							{
								id: receiptId.toString(),
								text,
								sender: 'incoming',
								time: getCurrentTime(),
							},
						]);
					}
				}

				// удаление обработанного уведомления из очереди GREEN-API
				if (receiptId) {
					await greenApi.deleteNotification(
						idInstance,
						apiTokenInstance,
						receiptId
					);
				}
			} catch (error) {
				console.error('Ошибка при получении уведомлений:', error);
			}
		};

		// опрос каждые 4 секунды
		const interval = setInterval(pollNotifications, 4000);

		return () => {
			isMounted = false;
			clearInterval(interval);
		};
	}, [idInstance, apiTokenInstance, chatId]);

	const handleSendMessage = async (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		const trimmedText = inputText.trim();

		if (!trimmedText || loading) return;

		try {
			setLoading(true);
			await greenApi.sendMessage(
				idInstance,
				apiTokenInstance,
				chatId,
				trimmedText
			);

			setMessages((prev) => [
				...prev,
				{
					id: Date.now().toString(),
					text: trimmedText,
					sender: 'me',
					time: getCurrentTime(),
				},
			]);
			setInputText('');
		} catch (error) {
			console.error(error);
			alert('Ошибка при отправке сообщения через GREEN-API');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="telegram-chat">
			<ChatHeader chatId={chatId} onLogout={onLogout} />

			<div className="telegram-chat__messages-container">
				{messages.length === 0 ? (
					<div className="telegram-chat__empty">
						<div className="telegram-chat__empty-bubble">
							История пуста. Отправьте сообщение или дождитесь ответа!
						</div>
					</div>
				) : (
					messages.map((msg) => (
						<div
							key={msg.id}
							className={`tg-message ${
								msg.sender === 'me' ? 'tg-message--out' : 'tg-message--in'
							}`}
						>
							<div className="tg-message__bubble">
								<span className="tg-message__text">{msg.text}</span>
								<span className="tg-message__time">{msg.time}</span>
							</div>
						</div>
					))
				)}
			</div>

			<form onSubmit={handleSendMessage} className="telegram-chat__input-form">
				<input
					type="text"
					className="telegram-chat__input"
					placeholder="Написать сообщение..."
					value={inputText}
					onChange={(e) => setInputText(e.target.value)}
				/>
				<button
					type="submit"
					className="telegram-chat__send-btn"
					disabled={loading}
					title="Отправить"
				>
					➤
				</button>
			</form>
		</div>
	);
};