var http = require('http');
var express = require('express');
var config = require('./config/config')();
var app = require('./config/express')(app);

require('./config/passport')();
require('./config/database.js')(config.db);

http.createServer(app).listen(config.port, function(){
	console.log('Express Http Server ' + config.address + ' (' + config.env + ') escutando na porta ' + config.port);
});
