import type { FC } from 'react';
import './ChatHeader.scss';

interface ChatHeaderProps {
	chatId: string;
	onLogout: () => void;
}

export const ChatHeader: FC<ChatHeaderProps> = ({ chatId, onLogout }) => {
	const formattedPhone = chatId
		? `+${chatId.replace('@c.us', '')}`
		: 'Не выбран';

	return (
		<div className="chat-header">
			<div className="chat-header__left">
				<div className="chat-header__avatar">
					{chatId ? chatId.slice(0, 2).toUpperCase() : 'TG'}
				</div>
				<div className="chat-header__meta">
					<h3 className="chat-header__title">Telegram Chat</h3>
					<span className="chat-header__status">{formattedPhone}</span>
				</div>
			</div>

			<button
				type="button"
				className="chat-header__exit-btn"
				onClick={onLogout}
				title="Сменить аккаунт"
			>
				Выход
			</button>
		</div>
	);
};
