FROM node:20.18-bullseye AS node
LABEL authors="flockean"

WORKDIR /app
COPY . .
RUN npm install --production

CMD ["npm", "start"]