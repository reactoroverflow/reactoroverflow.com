'use strict';

var app = require('./lib/express');
var clog = require('./lib/clog');
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  clog.green('a user connected');
});

http.listen(4000, function(){
  clog.green('Listening on port 4000');
});
