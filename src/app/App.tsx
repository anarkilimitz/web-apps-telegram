import { useState } from 'react';

import type { FC } from 'react';
import type { IGreenApiCredentials } from '../shared/types';

import { ConnectionForm } from '../widgets/ConnectionForm/ConnectionForm';
import { ChatSelector } from '../widgets/ChatSelector/ChatSelector';
import { ChatWindow } from '../widgets/ChatWindow/ChatWindow';

import '../app/styles/global.scss';

export const App: FC = () => {
	// состояние авторизации
	const [credentials, setCredentials] = useState<IGreenApiCredentials | null>(null);

	// состояние выбранного чата (номер телефона собеседника)
	const [chatId, setChatId] = useState<string>('');
	const [isChatSelected, setIsChatSelected] = useState<boolean>(false);

	// обработчик успешного подключения из ConnectionForm
	const handleConnect = (credentials: IGreenApiCredentials) => {
		setCredentials(credentials);
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
