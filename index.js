'use strict';

var app = require('./lib/express');
var clog = require('./lib/clog');
var http = require('http').Server(app);

require('./lib/socketio')(http);

http.listen(4000, function(){
  clog.green('Listening on port 4000');
});
