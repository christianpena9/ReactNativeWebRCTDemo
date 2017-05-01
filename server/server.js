const express = require('express');
const app     = express();
const server  = require('http').Server(app);
const io      = require('socket.io')(server);
const port    = process.env.PORT || 3000;

// The event will be called when a client is connected.
io.on('connection', (socket) => {
    console.log(socket.id, 'has connected!');

    function join(roomID) {
        socket.emit('join', roomID, function(socketIds) {
            console.log('join', socketIds);
        });
    }

    // The event will be called when a client is disconnected
    socket.on('disconnect', () => {
        console.log(socket.id, 'has disconnected!');
    });
});

// Runs once the server is online
server.listen(port, () => {
    console.log('server is running @ ', port);
});
