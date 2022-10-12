FROM node:16-alpine3.15

WORKDIR /app

COPY package.json ./ 

RUN npm install
RUN npm install -g serve

COPY . ./

RUN npm run build

COPY . .

EXPOSE 3000

CMD ["serve", "-s", "build"]
