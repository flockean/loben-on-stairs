FROM node:20.18-bullseye as node

LABEL authors="flockean"

# npm build in docker, can be removed when building the application made in workflow

RUN apt-get update && apt-get install default-jre -y
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build



# Main Image

FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=node /app/dist /usr/share/nginx/html

LABEL authors="flockean"
LABEL version="v1.0"
