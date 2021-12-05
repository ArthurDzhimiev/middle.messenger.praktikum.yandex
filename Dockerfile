FROM node:latest
WORKDIR /var/www
COPY package*.json ./
RUN npm set-script prepare ""
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD node server.js
