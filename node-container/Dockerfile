FROM node:carbon
WORKDIR /usr/src/app
COPY main.js ./
COPY package.json ./
COPY index.html ./
RUN npm install
EXPOSE 8000
EXPOSE 1883
ENTRYPOINT ["npm", "start"]
