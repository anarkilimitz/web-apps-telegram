import { useState } from 'react';
import type { FC } from 'react';
import { ConnectionForm } from './widgets/ConnectionForm/ConnectionForm';
import { ChatSelector } from './widgets/ChatSelector/ChatSelector';
import { ChatWindow } from './widgets/ChatWindow/ChatWindow';

import '../src/app/styles/global.scss';

export const App: FC = () => {
	// состояние авторизации
	const [credentials, setCredentials] = useState<{
		idInstance: string;
		apiTokenInstance: string;
	} | null>(null);

	// состояние выбранного чата (номер телефона собеседника)
	const [chatId, setChatId] = useState<string>('');
	const [isChatSelected, setIsChatSelected] = useState<boolean>(false);

	// обработчик успешного подключения из ConnectionForm
	const handleConnect = (idInstance: string, apiTokenInstance: string) => {
		setCredentials({ idInstance, apiTokenInstance });
	};

	// вход / смена аккаунта
	const handleLogout = () => {
		setCredentials(null);
		setChatId('');
		setIsChatSelected(false);
	};

	// обработчик выбора чата
	const handleSelectChat = (selectedChatId: string) => {
		setChatId(selectedChatId);
		setIsChatSelected(true);
	};

	if (!credentials) {
		return <ConnectionForm onConnect={handleConnect} />;
	}

	if (!isChatSelected) {
		return (
			<ChatSelector onSelectChat={handleSelectChat} onLogout={handleLogout} />
		);
	}

	return (
		<ChatWindow
			idInstance={credentials.idInstance}
			apiTokenInstance={credentials.apiTokenInstance}
			chatId={chatId}
			onLogout={handleLogout}
		/>
	);
};

export default App;
