FROM node:24-alpine

WORKDIR /app

COPY backend/package*.json ./backend/

WORKDIR /app/backend

RUN npm install 

COPY backend/ ./

COPY frontend/ ../frontend/ 

EXPOSE 3000

CMD ["npm", "start"]