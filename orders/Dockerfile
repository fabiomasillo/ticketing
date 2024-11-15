FROM node:alpine

WORKDIR /app

COPY package.json .
COPY .npmrc .
RUN npm install --omit=dev

COPY . .

CMD ["npm", "start"]