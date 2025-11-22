# Task Manager Full-Stack App 

> Повнофункціональний full-stack вебзастосунок з React + Node.js для управління завданнями.

##  Опис проєкту
Цей проєкт є системою управління завданнями (Task Manager), розробленою в рамках курсу лабораторних робіт. Застосунок дозволяє користувачам реєструватися, створювати проєкти, додавати завдання, переміщувати їх між статусами та отримувати миттєві сповіщення про зміни.

Система складається з двох частин: серверної (REST API) та клієнтської (Single Page Application), які взаємодіють між собою в реальному часі.

##  Функціональність

### Backend
-  RESTful API на Node.js + Express
-  PostgreSQL база даних з Prisma ORM
-  JWT аутентифікація (Access + Refresh tokens)
-  WebSocket для real-time комунікації (Socket.io)
-  Файловий сервіс (завантаження файлів)
-  API документація (Swagger)

### Frontend
-  React 18 + TypeScript
-  Система аутентифікації (Login/Register)
-  CRUD інтерфейси для завдань
-  Real-time оновлення через Socket.io
-  Валідація форм (React Hook Form + Zod)
-  Drag & Drop функціональність (dnd-kit)
-  Адаптивний дизайн (Tailwind CSS)

## Технології

### Backend
- Node.js 18+
- Express.js
- PostgreSQL (Neon/Render)
- Prisma ORM
- Socket.io
- JWT + bcrypt
- Multer (файли)

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router v6
- Axios
- Socket.io-client
- Zustand (state management)
- React Hook Form + Zod
- dnd-kit (drag & drop)

## Встановлення та запуск

### Вимоги
- Node.js 18+
- npm

### Backend

```bash
# Клонування репозиторію
git clone [https://github.com/user0822/lab3-realtime.git](https://github.com/user0822/lab3-realtime.git)
cd lab3-realtime

# Встановлення залежностей
npm install

# Налаштування .env (приклад)
# DATABASE_URL="postgresql://..."
# JWT_SECRET="secret"

# Міграція бази даних
npx prisma db push

# Запуск сервера
npm run dev
Frontend
Bash

# Клонування репозиторію
git clone [https://github.com/user0822/lab6-frontend.git](https://github.com/user0822/lab6-frontend.git)
cd lab6-frontend

# Встановлення залежностей
npm install

# Запуск у режимі розробки
npm run dev
Production Deployment
Backend
Задеплоєно на: Render URL API: https://task-manager-api-o8is.onrender.com/api Docs: https://www.google.com/search?q=https://task-manager-api-o8is.onrender.com/api-docs

Frontend
Задеплоєно на: Vercel URL: https://www.google.com/search?q=https://lab6-frontend-git-main-vadyms-projects-81dee9ba.vercel.app

Структура проєкту
Backend
backend/
├── src/
│   ├── controllers/    # Бізнес-логіка (Auth, Tasks, Files)
│   ├── routes/         # API маршрути
│   ├── middleware/     # Auth & Upload middleware
│   ├── socket/         # Real-time логіка
│   └── utils/          # Хешування, JWT
├── prisma/
│   └── schema.prisma   # Схема БД
Frontend
frontend/
├── src/
│   ├── components/     # UI компоненти (Button, Card, Input)
│   ├── pages/          # Сторінки (Login, Dashboard)
│   ├── services/       # API & Socket сервіси
│   ├── stores/         # Zustand store (authStore)
│   ├── schemas/        # Zod схеми валідації
│   └── types/          # TypeScript інтерфейси
Тестові облікові дані
## Скріншоти

### Головна сторінка
<img width="1901" height="957" alt="image" src="https://github.com/user-attachments/assets/655f510b-3ea0-4ac1-be7f-f28a3c984e2d" />

### Dashboard
<img width="1916" height="954" alt="image" src="https://github.com/user-attachments/assets/c3ddb60a-4826-4396-a431-29243a6e00c8" />


### CRUD інтерфейс
<img width="955" height="326" alt="image" src="https://github.com/user-attachments/assets/7ae5380f-9822-4155-a742-1de0fcf2f02e" />


### Real-time функціональність
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/66bd8e0f-fc0c-4df5-9803-e0d5d7006992" />

Для швидкого входу можна використати:
Email: final@test.com
Password: password123
Продуктивність
Використано оптимізацію запитів Prisma (індекси).

React компоненти використовують композицію для уникнення зайвих ре-рендерів.

Real-time оновлення знижують навантаження на сервер (немає polling).

Безпека
JWT токени з коротким терміном дії + Refresh токени.

Bcrypt для хешування паролів.

Helmet для захисту HTTP заголовків.

Rate Limiting для захисту від спаму.

CORS налаштування.

API Документація
Swagger документація доступна за адресою: Відкрити Swagger UI

Автор
Вадим Венський
Група: ІПЗ-41
GitHub: @user0822
