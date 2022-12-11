FROM node:18-alpine

# Pass environment variables to image
# deploy_mode = build or build-text
ARG deploy_mode
ARG main_backend
ARG test_backend
ENV VEFRONTEND_DEPLOYMODE=$deploy_mode
ENV VEFRONTEND_MAINBACKEND=$main_backend
ENV VEFRONTEND_TESTBACKEND=$test_backend

ENV PORT=3000
EXPOSE 3000

WORKDIR /app
COPY package.json /app

COPY . /app
RUN npm install
RUN npm run $VEFRONTEND_DEPLOYMODE
CMD ["npm", "start"]
