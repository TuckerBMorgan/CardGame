var net = require('net');
var control = require('./control');
var createCard = require('./runes/createCard')

var ECONNRESETCODE = "ECONNRESET";

var server = net.createServer(function(socket) {
    socket.on('data', function(data) {
        control.routing(data, socket);
    })
    socket.on('error', function (exec) {
        console.log(exec);
        if(exec.code == ECONNRESETCODE)
        {
            control.connectionLost();
        }
    })
})



exports.sendMessage = function(message, socket)
{
    console.log(message);
    socket.write(message + "\n\n");

}

server.listen(4884, '127.0.0.1');

