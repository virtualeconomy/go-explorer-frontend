FROM node:18-alpine

# Pass environment variables to image
ARG deploy_mode
ENV VEFRONTEND_DEPLOYMODE=$deploy_mode

ENV PORT=3000
EXPOSE 3000

WORKDIR /app
COPY package.json /app

COPY . /app
RUN npm install
RUN npm run build
# start production version
CMD ["npm", "start-prod:node"]
# start dev version
# CMD ["npm", "start-dev:node"]
