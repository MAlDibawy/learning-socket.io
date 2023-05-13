const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ["GET", "POST"],
    }
})

io.on('connection', socket => {
    // console.log(`u r connected successfuly ${socket.id}`);
    socket.on('send_message', (message) => {
        console.log(message)
        socket.broadcast.emit('receive_message', message);
    });

});

server.listen(5000, () => {
    console.log('server is running')
})