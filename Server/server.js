var net = require('net');
var control = require('./control');

var ECONNRESETCODE = "ECONNRESET";

var server = net.createServer(function(socket) {
    socket.on('data', function(data) {
        control.routing(data, socket);
    })
    socket.on('error', function (exec) {
        console.log(exec);
        if(exec.code == ECONNRESETCODE)
        {
            delete require.cache[control];
            control.connectionLost();
        }   
    })
})

exports.sendMessage = function(message, socket)
{
    console.log("Outgoing message + " + message);
    socket.write(message + "@@");
}

server.listen(4884, '127.0.0.1');

    