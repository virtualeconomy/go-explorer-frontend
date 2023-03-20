FROM node:18-alpine

# Pass environment variables to image
ARG deploy_mode
ENV DEPLOY_MODE=$deploy_mode
ARG main_backend
ENV MAIN_BACKEND=$main_backend
ARG test_backend
ENV TEST_BACKEND=$test_backend
ARG dev_backend
ENV DEV_BACKEND=$dev_backend

ENV PORT=3000
EXPOSE 3000

WORKDIR /app
COPY package.json /app

COPY . /app
RUN npm install
RUN npm run build
CMD ["npm", "start"]
