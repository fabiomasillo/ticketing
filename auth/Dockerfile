FROM node:alpine


WORKDIR /app 
COPY .npmrc .
COPY package.json .  
RUN npm install --omit=dev 

COPY . .

CMD ["npm", "start"]