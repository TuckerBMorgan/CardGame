var net = require('net');
var control = require('./control');
var createCard = require('./runes/createCard')

var server = net.createServer(function(socket) {
    socket.on('data', function(data) {
        control.routing(data, socket);
    })
    
    
})

exports.sendMessage = function(message, socket)
{
    console.log(message);
    socket.write(message + "\n\n");

}

server.listen(4884, '127.0.0.1');

