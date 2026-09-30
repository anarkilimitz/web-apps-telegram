import { useState } from 'react';

import type { FC, SyntheticEvent, ChangeEvent } from 'react';

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

	const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
		const phone = e.target.value.replace(/\D/g, '').slice(0, 11);

		setPhoneInput(phone);
	};

	const handleStartChat = (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (phoneInput.length !== 11) {
			return;
		}

		onSelectChat(`${phoneInput}@c.us`);
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
						onChange={handlePhoneChange}
						inputMode="numeric"
						maxLength={11}
					/>

					{phoneInput.length > 0 && phoneInput.length < 11 && (
						<div className="chat-selector__hint">
							Номер телефона должен содержать 11 цифр
						</div>
					)}

					<button
						type="submit"
						className="chat-selector__submit-btn"
						disabled={phoneInput.length !== 11}
					>
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
