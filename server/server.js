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
    });

    socket.on('joinSignalRoom', (data) => {
        clientInfo[socket.id] = data;
        socket.join(data.room);

        /*
            Note: Un-comment the below code to see how many users are
            currently connected to the server
        */
        // io.clients( (error, clients) => {
        //     if (error) throw error;
        //     console.log(clients);
        // });

        //emit a message letting everyone in the room that
        //that someone has joined
        socket.broadcast.to(data.room).emit('message', {
            name: 'Server: ',
            text: data.name + ' has joined!'
        }); // end of socket.broadcast
    }); // end of joinSignalRoom

    socket.on('message', (message) => {
        io.to(clientInfo[socket.id].room).emit('message', message)
    });

}); // end of connection

// Runs once the server is online
server.listen(port, () => {
    console.log('server is running @', port);
});
