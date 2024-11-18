FROM node:20.18-bullseye as node
LABEL authors="flockean"

WORKDIR /app
COPY . .
RUN npm install --production

CMD ["npm", "start"]