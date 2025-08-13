# Базовый образ
FROM node:21-alpine

# Рабочая директория
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы
COPY . .

# Аргументы для переменных среды (опционально, если нужно передавать при сборке)
ARG VITE_HOST
ARG VITE_TG_BOT_NAME
ARG VITE_DATA_AUTH_URL
ARG VITE_DOMEN
ARG VITE_API_URL
ARG VITE_API_IMAGE_URL

# Устанавливаем переменные среды
ENV VITE_HOST=$VITE_HOST
ENV VITE_TG_BOT_NAME=$VITE_TG_BOT_NAME
ENV VITE_DATA_AUTH_URL=$VITE_DATA_AUTH_URL
ENV VITE_DOMEN=$VITE_DOMEN
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_IMAGE_URL=$VITE_API_IMAGE_URL

EXPOSE 5174

CMD ["npm", "run", "dev"]