var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var playerCount = 0;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('/index.html');
});

io.on('connection', function (socket) {
  playerCount++;
  setTimeout(function(){socket.emit('selfConnect', { playerCount: playerCount })}, 1500);
  socket.broadcast.emit('connected', {playerCount: playerCount});
  socket.on('disconnect', function (){
    playerCount--;
    io.emit('disconnected', { playerCount: playerCount });
  });
});

server.listen(80);
console.log("Multiplayer app listening on port 80");
