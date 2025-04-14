# Используем официальный образ Node.js версии 22
FROM node:22

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Открываем порт для Express.js
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "start"]
