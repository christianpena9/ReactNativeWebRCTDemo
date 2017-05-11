const express = require('express');
const app     = express();
const server  = require('http').Server(app);
const io      = require('socket.io')(server);
const port    = process.env.PORT || 3000;
var users = {};

// The event will be called when a client is connected.
io.on('connection', (socket) => {
    console.log(socket.id, 'has connected!');

    // The event will be called when a client is disconnected
    socket.on('disconnect', () => {
        console.log(socket.id, 'has disconnected!');
    });

    socket.on('message', (message) => {
        console.log('message received:', message.text);

        socket.broadcast.emit('message', message);
    });


    socket.emit('message', {
        text: 'Welcome to the chat application!'
    });


});

// Runs once the server is online
server.listen(port, () => {
    console.log('server is running @', port);
});
