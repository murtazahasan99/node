const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });

  socket.on('client to server event',( )=> {
    socket.emit('server to client event', "msg");
  });
});

io.of("/admin").on("connection", (socket) => {
    console.log("admin connected");
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});