FROM node:18-alpine

# Pass environment variables to image
# deploy_mode = build or build-text
ARG deploy_mode
ENV VEBACKEND_DEPLOYMODE=$deploy_mode

ENV PORT=3000
EXPOSE 3000

WORKDIR /app
COPY package.json /app

COPY . /app
RUN npm install
RUN npm run $VEBACKEND_DEPLOYMODE
CMD ["npm", "start"]
