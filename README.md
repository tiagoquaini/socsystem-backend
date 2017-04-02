# **Running localy** #

### Install mongodb: ###
Set the environment variable


### Load the node modules: ###

```
$ npm install
```

### Run the server: ###
```
$ NODE_ENV=development node server.js
```

### Run the mongo: ###
You can specify the location of the /data/db folder by running
```
$ mongod -dbpath /Users/i845130/Desktop/Personal/Desktop/socsystem-backend/mongodata
```
or you can only run 
```
$ mongod
```

## Logging into MongoDB ##

```
$ sudo mongo admin --username root --password HdE74WF3Ab8L
```
```
$ sudo mongo admin --username adminmongod --password botafogo#123
```
### Mongo User ###
* **User:** adminmongod
* **Pwd:** botafogo#123
* **Role:** root

### Mongo User fitnessboard ###
* **User:** fitnessboardmongod
* **Pwd:** btwafgao15#123
* **Role:** readWrite
* **bd:** fitnessboard
