FROM node:16-alpine3.15

WORKDIR /app

COPY package.json ./

RUN npm install

COPY tsconfig.build.json ./

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start:prod"]