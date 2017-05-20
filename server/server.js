const express = require('express');
const app     = express();
const server  = require('http').Server(app);
const io      = require('socket.io')(server);
const port    = process.env.PORT || 3000;

// all connected to the server
var clientInfo = {};

// The event will be called when a client is connected.
io.on('connection', (socket) => {
    console.log(socket.id, 'has connected to server!');

    // The event will be called when a client is disconnected
    socket.on('disconnect', () => {
        console.log(socket.id, 'has disconnected from server!');
        var userData = clientInfo[socket.id];

        if(typeof userData !== 'undefined') {
            socket.leave(userData.room);

            // let everyone else know that a user has left. This is for debugging
            io.to(userData.room).emit('message', {
                name: 'Server: ',
                text: userData.name + ' has left!'
            });

            // delete an attribute from the clientInfo object
            delete clientInfo[socket.id];
        }
    }); // end of disconnect

    // Listen on ready and then join socket to room
    socket.on('ready', (data) => {
        clientInfo[socket.id] = data;
        socket.join(data.room);

        socket.broadcast.emit('message', {
            name: 'Server: ',
            text: data.name + ' has joined!'
        });
    });

    // Listen for signal and emit data to client
    socket.on('signal', (data) => {
        // sending to all clients in 'joinSignalVideoRoom' room except sender
        socket.to(data.room).emit('signaling_message', {
            type: data.type,
            message: data.message
        });
    }); // end of signal

}); // end of connection

// Runs once the server is online
server.listen(port, () => {
    console.log('server is running @', port);
});
