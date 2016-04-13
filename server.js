var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

server.listen(process.env.PORT || 8000);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/client.js', (req, res) => res.sendFile(path.join(__dirname, 'client.js')));

io.on('connection', (socket) => {
  socket.on('coord', (data) => {
    data.id = socket.id;
    socket.broadcast.emit('cursor', data);
  });

  socket.on('disconnect', () => socket.broadcast.emit('deadcursor', socket.id));
});
