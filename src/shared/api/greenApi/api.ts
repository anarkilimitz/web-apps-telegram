import type {
	ISendMessageRequest,
	ISendMessageResponse,
	IWebhookNotification,
	IGetStateInstanceResponse,
	IDeleteNotificationResponse,
} from '../../types';

const BASE_URL = 'https://api.green-api.com';

export const greenApi = {
	// отправка сообщения
	sendMessage: async (
		idInstance: string,
		apiTokenInstance: string,
		chatId: string,
		message: string
	): Promise<ISendMessageResponse> => {
		const url = `${BASE_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

		const request: ISendMessageRequest = {
			chatId,
			message,
		};

		const response = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(request),
		});

		if (!response.ok) {
			throw new Error('Ошибка при отправке сообщения');
		}

		return response.json() as Promise<ISendMessageResponse>;
	},

	// проверка состояния инстанса (авторизации)
	getStateInstance: async (
		idInstance: string,
		apiTokenInstance: string
	): Promise<IGetStateInstanceResponse> => {
		const url = `${BASE_URL}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`;

		const response = await fetch(url, { method: 'GET' });

		if (!response.ok) {
			throw new Error('Неверные учетные данные');
		}

		return response.json() as Promise<IGetStateInstanceResponse>;
	},

	// получение входящего уведомления
	receiveNotification: async (
		idInstance: string,
		apiTokenInstance: string
	): Promise<IWebhookNotification> => {
		const url = `${BASE_URL}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;

		const response = await fetch(url, { method: 'GET' });

		if (!response.ok) {
			throw new Error('Ошибка при получении уведомлений');
		}

		return response.json() as Promise<IWebhookNotification>;
	},

	// удаление полученного уведомления (чтобы оно не приходило снова)
	deleteNotification: async (
		idInstance: string,
		apiTokenInstance: string,
		receiptId: number
	): Promise<IDeleteNotificationResponse> => {
		const url = `${BASE_URL}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`;

		const response = await fetch(url, { method: 'DELETE' });

		if (!response.ok) {
			throw new Error('Ошибка при удалении уведомления');
		}

		return response.json() as Promise<IDeleteNotificationResponse>;
	},
};
