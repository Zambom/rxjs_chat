const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: '*'
}));
app.use(express.json({ limit: '50mb' }));

const http = require('http');
const server = http.createServer(app);

/*const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

io.on('connection', (socket) => {
    console.log('new user approaches');
});*/

module.exports = server;