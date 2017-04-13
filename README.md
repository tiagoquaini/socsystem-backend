# **Running localy** #

### Install mongodb: ###
Set the environment variable

### Load the node modules: ###

```
$ npm install
```

### Run the server: ###
```
$ npm start
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

### Admin
In order to make yourself an admin, use following command on mongodb:
```
db.users.update(
  {"name": "tiago"},
  {
    $set: {"admin": true}
  }
)
```