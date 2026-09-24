import { useState } from 'react';
import type { FC, SyntheticEvent } from 'react';

import './ConnectionForm.scss';

interface ConnectionFormProps {
	onConnect: (idInstance: string, apiTokenInstance: string) => void;
}

export const ConnectionForm: FC<ConnectionFormProps> = ({ onConnect }) => {
	const [idInstance, setIdInstance] = useState<string>('');
	const [apiTokenInstance, setApiTokenInstance] = useState<string>('');
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();

		const trimmedId = idInstance.trim();
		const trimmedToken = apiTokenInstance.trim();

		if (trimmedId === '' || trimmedToken === '') {
			setError('Пожалуйста, заполните все поля для подключения');
			return;
		}

		setError(null);
		onConnect(trimmedId, trimmedToken);
	};

	return (
		<div className="connection-form-wrapper">
			<div className="connection-form-card">
				<div className="connection-form__header">
					<h2 className="connection-form__title">Авторизация GREEN-API</h2>
					<p className="connection-form__subtitle">
						Введите учетные данные вашего инстанса для работы с чатом
					</p>
				</div>

				<form onSubmit={handleSubmit} className="connection-form">
					<div className="connection-form__field">
						<label className="connection-form__label">idInstance</label>
						<input
							type="text"
							className="connection-form__input"
							placeholder="Например: 1101800000"
							value={idInstance}
							onChange={(e) => setIdInstance(e.target.value)}
						/>
					</div>

					<div className="connection-form__field">
						<label className="connection-form__label">apiTokenInstance</label>
						<input
							type="password"
							className="connection-form__input"
							placeholder="Введите apiTokenInstance"
							value={apiTokenInstance}
							onChange={(e) => setApiTokenInstance(e.target.value)}
						/>
					</div>

					{error ? <div className="connection-form__error">{error}</div> : null}

					<button type="submit" className="connection-form__button">
						Подключиться
					</button>
				</form>
			</div>
		</div>
	);
};
