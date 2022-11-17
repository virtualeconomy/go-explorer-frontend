FROM node:18-alpine

ENV PORT=3000
EXPOSE 3000

WORKDIR /app
COPY package.json /app

COPY . /app
RUN npm install
RUN npm run build
CMD ["npm", "start"]