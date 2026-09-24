// учетные данные для подключения к GREEN-API
export interface IGreenApiCredentials {
	idInstance: string;
	apiTokenInstance: string;
}

// модель сообщения в чате
export interface IMessage {
	idMessage: string;
	text: string;
	sender: 'outgoing' | 'incoming';
	timestamp?: number;
}

// данные для отправки текстового сообщения
export interface ISendMessageRequest {
	chatId: string;
	message: string;
}

// ответ при успешной отправке сообщения
export interface ISendMessageResponse {
	idMessage: string;
}

// структура входящего уведомления от GREEN-API (ReceiveNotification)
export interface IWebhookNotification {
	receiptId: number;
	body: {
		typeWebhook: string;
		instanceData?: {
			idInstance: number;
			wid: string;
			typeInstance: string;
		};
		timestamp?: number;
		idMessage?: string;
		senderData?: {
			chatId: string;
			sender: string;
			senderName?: string;
		};
		messageData?: {
			typeMessage: string;
			textMessageData?: {
				textMessage: string;
			};
		};
	};
}

// состояние чата
export interface IChatState {
	credentials: IGreenApiCredentials | null;
	chatId: string;
	messages: IMessage[];
	isConnected: boolean;
	isLoading: boolean;
	error: string | null;
}
