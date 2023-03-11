FROM node:18

WORKDIR /src
EXPOSE 3001
RUN npm i npm@latest -g

COPY package.json package-lock*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]