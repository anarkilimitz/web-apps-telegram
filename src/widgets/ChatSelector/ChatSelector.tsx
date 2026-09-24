import { useState } from 'react';
import type { FC, SyntheticEvent } from 'react';

import './ChatSelector.scss';

interface ChatSelectorProps {
	onSelectChat: (chatId: string) => void;
	onLogout: () => void;
}

export const ChatSelector: FC<ChatSelectorProps> = ({
	onSelectChat,
	onLogout,
}) => {
	const [phoneInput, setPhoneInput] = useState<string>('');

	const handleStartChat = (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		const phone = phoneInput.trim().replace(/\D/g, ''); // только цифры
		if (!phone) {
			alert('Введите корректный номер телефона');
			return;
		}
		onSelectChat(`${phone}@c.us`);
	};

	return (
		<div className="chat-selector-wrapper">
			<div className="chat-selector-card">
				<h2 className="chat-selector__title">Начать чат</h2>
				<p className="chat-selector__subtitle">
					Введите номер телефона собеседника (с кодом страны, без плюса)
				</p>

				<form onSubmit={handleStartChat} className="chat-selector__form">
					<input
						type="text"
						className="chat-selector__input"
						placeholder="Например: 79991234567"
						value={phoneInput}
						onChange={(e) => setPhoneInput(e.target.value)}
					/>
					<button type="submit" className="chat-selector__submit-btn">
						Открыть чат
					</button>
					<button
						type="button"
						className="chat-selector__back-btn"
						onClick={onLogout}
					>
						Назад к авторизации
					</button>
				</form>
			</div>
		</div>
	);
};
