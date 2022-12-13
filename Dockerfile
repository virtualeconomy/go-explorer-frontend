FROM node:18-alpine

# Pass environment variables to image
ARG deploy_mode
ENV DEPLOY_MODE=$deploy_mode

ENV PORT=3000
EXPOSE 3000

WORKDIR /app
COPY package.json /app

COPY . /app
RUN npm install
RUN npm run build
CMD ["npm", "start"]
