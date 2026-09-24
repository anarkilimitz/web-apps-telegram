import { useState } from 'react';
import type { FC, SyntheticEvent } from 'react';
import { greenApi } from '../../shared/api/greenApi/api';

import './ConnectionForm.scss';

interface ConnectionFormProps {
	onConnect: (idInstance: string, apiTokenInstance: string) => void;
}

export const ConnectionForm: FC<ConnectionFormProps> = ({ onConnect }) => {
	const [idInstance, setIdInstance] = useState<string>('');
	const [apiTokenInstance, setApiTokenInstance] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();

		const trimmedId = idInstance.trim();
		const trimmedToken = apiTokenInstance.trim();

		if (trimmedId === '' || trimmedToken === '') {
			setError('Пожалуйста, заполните все поля для подключения');
			return;
		}

		try {
			setIsLoading(true);
			setError(null);

			// проверяем существование и валидность инстанса в GREEN-API
			await greenApi.getStateInstance(trimmedId, trimmedToken);

			onConnect(trimmedId, trimmedToken);
		} catch (err) {
			console.error(err);
			setError('Неверный idInstance или apiTokenInstance');
		} finally {
			setIsLoading(false);
		}
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
							autoComplete="off"
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

					<button
						type="submit"
						className="connection-form__button"
						disabled={isLoading}
					>
						{isLoading ? 'Проверка...' : 'Подключиться'}
					</button>
				</form>
			</div>
		</div>
	);
};
