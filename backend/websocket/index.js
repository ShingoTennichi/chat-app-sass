
const http = require('http');
const server = http.createServer()
const port = 3001;

const io = require('socket.io')(server, {
  cors: { origin: "*" }
});

const key = "message";

io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(socket.handshake.auth);
  socket.on(key, (message) => {
    console.log(message);
    io.emit(key, [`${socket.id} said ${message}`, "me"]);
  });
});

server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});

class message {
  constructor(authorId, authorName, message) {
    this.authorId = authorId;
    this.authorName = authorName;
    this.message = message;
  }

}