# Web Apps Telegram

Учебное React-приложение с интерфейсом в стиле Telegram для отправки и получения текстовых сообщений через **GREEN-API**.

Проект выполнен на **React + TypeScript + Vite**. Архитектура разделяет приложение на `app`, общие API и типы в `shared`, а функциональные блоки интерфейса — в `widgets`.

> **Важно:** в текущей реализации используются GREEN-API endpoint'ы `waInstance`. Для работы нужны действующие `idInstance` и `apiTokenInstance`.

## Возможности

- подключение к GREEN-API по `idInstance` и `apiTokenInstance`;
- проверка учетных данных перед подключением;
- выбор собеседника по номеру телефона;
- отправка текстовых сообщений;
- получение входящих сообщений через polling;
- удаление обработанных уведомлений из очереди GREEN-API;
- отображение входящих и исходящих сообщений;
- отображение времени сообщений;
- выход из текущего подключения;
- адаптивный интерфейс;
- SCSS-стилизация;
- TypeScript;
- ESLint.

## Стек

- React 19
- TypeScript 6
- Vite 8
- SCSS / Sass
- GREEN-API
- ESLint 9
- @vitejs/plugin-react

## Структура проекта

```text
web-apps-telegram/
├── public/                         # Статические файлы и favicon
├── src/
│   ├── app/
│   │   ├── App.tsx                 # Основная логика и состояние приложения
│   │   └── styles/
│   │       ├── _variables.scss     # Глобальные CSS-переменные
│   │       ├── _mixins.scss        # SCSS mixins
│   │       └── global.scss         # Глобальные стили и reset
│   ├── shared/
│   │   ├── api/greenApi/api.ts     # Методы GREEN-API
│   │   └── types/index.ts          # Общие TypeScript-типы
│   ├── widgets/
│   │   ├── ConnectionForm/         # Форма подключения
│   │   ├── ChatSelector/           # Выбор чата
│   │   ├── ChatHeader/             # Шапка чата
│   │   └── ChatWindow/             # Сообщения и работа с API
│   └── main.tsx                    # Точка входа React
├── eslint.config.js                # Конфигурация ESLint
├── index.html                      # HTML-шаблон
├── package.json                    # Скрипты и зависимости
├── package-lock.json               # Зафиксированные зависимости
├── tsconfig.json                   # Основной TS config
├── tsconfig.app.json               # TS config приложения
├── tsconfig.node.json              # TS config Vite
├── vite.config.ts                  # Конфигурация Vite
└── README.md
```

## Как работает приложение

Приложение проходит три основных состояния:

```text
ConnectionForm
      │
      │ успешная проверка GREEN-API
      ▼
ChatSelector
      │
      │ выбран номер телефона
      ▼
ChatWindow
      │
      ├── отправка сообщения
      └── получение сообщений через polling
```

### ConnectionForm

Пользователь вводит `idInstance` и `apiTokenInstance`. Перед переходом дальше вызывается `getStateInstance()` из GREEN-API.

### ChatSelector

Принимает номер телефона собеседника, оставляет только цифры и формирует `chatId` вида:

```text
79991234567@c.us
```

### ChatWindow

Отвечает за список сообщений, отправку сообщений и получение входящих уведомлений. Polling выполняется каждые **4 секунды**. Обработанное уведомление удаляется из очереди GREEN-API.

## GREEN-API

API-слой находится в:

```text
src/shared/api/greenApi/api.ts
```

Реализованы:

| Метод | Назначение |
|---|---|
| `getStateInstance` | Проверка учетных данных |
| `sendMessage` | Отправка сообщения |
| `receiveNotification` | Получение уведомления |
| `deleteNotification` | Удаление обработанного уведомления |

Базовый URL:

```text
https://api.green-api.com
```

Учетные данные не хранятся в репозитории — они вводятся через форму подключения.

## Установка

### Требования

- Node.js
- npm
- Git

### Клонирование

```bash
git clone https://github.com/anarkilimitz/web-apps-telegram.git
cd web-apps-telegram
```

### Установка зависимостей

```bash
npm install
```

## Запуск в режиме разработки

```bash
npm run dev
```

Vite настроен на автоматическое открытие браузера. Если этого не произошло, откройте адрес, который Vite покажет в терминале (обычно `http://localhost:5173`).

## Проверка приложения локально

1. Запустите `npm run dev`.
2. Откройте приложение в браузере.
3. Введите действующие `idInstance` и `apiTokenInstance` GREEN-API.
4. Нажмите **«Подключиться»**.
5. Введите номер телефона собеседника с кодом страны, без `+`.
6. Нажмите **«Открыть чат»**.
7. Отправьте тестовое сообщение.
8. Проверьте получение входящего сообщения.
9. Для смены подключения нажмите **«Выход»**.

Для тестирования рекомендуется использовать отдельный тестовый инстанс GREEN-API.

## Сборка

```bash
npm run build
```

Скрипт:

1. удаляет старую директорию `dist`;
2. выполняет TypeScript build-check через `tsc -b`;
3. запускает production-сборку Vite.

Результат находится в:

```text
dist/
```

## Проверка production-сборки локально

После сборки:

```bash
npm run preview
```

Команда запускает локальный сервер с уже собранной production-версией. Адрес будет указан в терминале.

## Проверка ESLint

```bash
npm run lint
```

Конфигурация находится в `eslint.config.js`. В частности, проверяются TypeScript/React-файлы и React Hooks; `dist` и `node_modules` исключены из проверки.

## Основные npm-команды

| Команда | Назначение |
|---|---|
| `npm install` | Установка зависимостей |
| `npm run dev` | Development-сервер |
| `npm run build` | TypeScript check + production-сборка |
| `npm run preview` | Просмотр production-сборки |
| `npm run lint` | ESLint |

## Основные файлы

### `src/main.tsx`

Точка входа React-приложения. Создает React root и подключает `App`.

### `src/app/App.tsx`

Центральный компонент приложения. Хранит:

- `credentials` — учетные данные GREEN-API;
- `chatId` — выбранный чат;
- `isChatSelected` — выбран ли чат.

На основании этого состояния отображается `ConnectionForm`, `ChatSelector` или `ChatWindow`.

### `src/shared/api/greenApi/api.ts`

Изолирует HTTP-запросы к GREEN-API от UI-компонентов.

### `src/shared/types/index.ts`

Содержит интерфейсы для учетных данных, сообщений, запросов и уведомлений GREEN-API.

### `src/app/styles/`

Глобальные стили, переменные и SCSS-вспомогательные конструкции.

### `src/widgets/`

Основные функциональные части интерфейса. Каждый widget содержит компонент и его SCSS.

## Стилизация

Стили написаны на SCSS. Глобальные переменные находятся в `src/app/styles/_variables.scss`, а reset и общие правила — в `global.scss`.

Стили конкретных widgets расположены рядом с компонентами:

```text
ConnectionForm.scss
ChatSelector.scss
ChatHeader.scss
ChatWindow.scss
```

## Безопасность

`idInstance` и `apiTokenInstance` не должны попадать в исходный код или Git-репозиторий.

Не публикуйте реальные токены в:

- исходниках;
- `package.json`;
- README;
- issue / pull request;
- публичных скриншотах.

Для тестирования используйте отдельный тестовый инстанс.

## Архитектура

Проект использует упрощенное разделение по слоям:

- **app** — инициализация и основная логика приложения;
- **shared** — общие API и типы;
- **widgets** — самостоятельные функциональные блоки интерфейса.

Такое разделение отделяет работу с внешним API от UI и упрощает дальнейшее расширение проекта.
