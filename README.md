# Getting Started with LobenOnStairsApp

This project was developed by Lucas Buchholz (Lead), Ronny V., Lukas K.

## Still in Development

Warning, this Application is yet not completly developed, Posts and Upload are not Synced and not permanent saved yet.


## Prerequisite

For Development / localmachine mongoDB needed. -> MongoCompass (optional: Docker-image `mongo:latest`)  

For Production Readyness Docker / Docker-compose is needed. -> Docker-Desktop  

## Development


Step 1.  
`git clone https://github.com/flockean/loben-on-stairs`  
`cd loben-on-stairs`  
`git checkout develop`  


MongoDB / MongoCompass installed OR Docker / Docker-Desktop  

Step 2.  
### Docker / Docker-Desktop

`docker pull mongo:latest`  
`docker run mongo:latest`  

### (XOR) MongoCompass

MongoCompass need to be installed an started (Have a Connection on default localhost:27017)

Step 3.  
Start Frontend:  
```
npm install  
npm start  
```

Step 4. (on another Terminal)  
Start Backend:
```
npm install  
cd backend  
npm start  
```


## Production / localmachine
For this some File Changes might needed:
### on localhost

Step 1.  
`git clone https://github.com/flockean/loben-on-stairs`  
`cd loben-on-stairs`  
`git checkout develop`  

`loben-on-stairs/src/App.js` Should be BACKEND-URL `http://localhost:5000`  
`loben-on-stairs/backend/index.js` Should be BACKEND-URL`mongodb://mongo:27017/`  

Now it should be possible to StartUp with `docker-compose up`

### on dedicated Server


Step 1.  
`git clone https://github.com/flockean/loben-on-stairs`  
`cd loben-on-stairs`  
`git checkout develop`  


Step 2.  
`loben-on-stairs/src/App.js` Should be BACKEND-URL `http://<YOUR-SERVER-IP>:5000`  
`loben-on-stairs/backend/index.js` Should be BACKEND-URL`mongodb://mongo:27017/`  

Now it should be possible to StartUp with `docker-compose up`  
