FROM node:16
WORKDIR /app
COPY package*.json ./
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]