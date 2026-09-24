const BASE_URL = 'https://api.green-api.com';

export const greenApi = {
	// Отправка сообщения
	sendMessage: async (
		idInstance: string,
		apiTokenInstance: string,
		chatId: string,
		message: string
	) => {
		const url = `${BASE_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
		const response = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ chatId, message }),
		});

		if (!response.ok) {
			throw new Error('Ошибка при отправке сообщения');
		}
		return response.json();
	},

	// получение входящего уведомления
	receiveNotification: async (idInstance: string, apiTokenInstance: string) => {
		const url = `${BASE_URL}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;
		const response = await fetch(url, { method: 'GET' });

		if (!response.ok) {
			throw new Error('Ошибка при получении уведомлений');
		}
		return response.json();
	},

	// Удаление полученного уведомления (чтобы оно не приходило снова)
	deleteNotification: async (
		idInstance: string,
		apiTokenInstance: string,
		receiptId: number
	) => {
		const url = `${BASE_URL}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`;
		const response = await fetch(url, { method: 'DELETE' });

		if (!response.ok) {
			throw new Error('Ошибка при удалении уведомления');
		}
		return response.json();
	},
};
