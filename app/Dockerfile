FROM node:16.13.0
WORKDIR /app
COPY package*.json ./
RUN npm install && \
    npm install -g @vue/cli \
    npm install -g firebase-tools
COPY . .
EXPOSE 3000
ENTRYPOINT npm run serve -- --port 3000
