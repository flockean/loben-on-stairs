# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Production
Prerequisite: MongoDB / MongoCompass installed or Docker-compose / Docker-Desktop

```
docker compose up
```

## Development

Prerequisite: MongoDB / MongoCompass installed or Docker

In the project directory, you can run:

Start Backend:
```
cd backend  
npm start 
```

Start Frontend:  
```
cd backend  
npm start 
```

### Initialize Backend Database via Docker
Init Database via Docker

Create Network for Application  
`docker network create -d bridge loben-net`

MongoDB Initialize  
`docker run --network loben-net -p 27017:27017 --name mongo -d mongo:latest`

UI for MongoDB Backend (optional)  
`docker run --network loben-net -p 8081:8081 mongo-express`