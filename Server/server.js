var net = require('net');
var control = require('./control');

var ECONNRESETCODE = "ECONNRESET";
var messageOutQueue = []


console.log("\033[2J\033[1;1H");

console.log("Server has started");

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

var sendingMessage = false;

function killMe()
{
    sendingMessage = false;
    if(messageOutQueue.length > 0)
    {
        sendingMessage = true;
        var msgObj = messageOutQueue.shift();
        console.log("Outgoing message + " + msgObj.message);
        msgObj.socket.write(msgObj.message + "@@", killMe);
    }
}

exports.sendMessage = function(message, socket)
{
    if(!sendingMessage)
    {
        sendingMessage = true;
        console.log("Outgoing message + " + message);
        socket.write(message + "@@", killMe);
    }
    else
    {
        var msgObj = {
            "message":message,
            "socket":socket
        }
        messageOutQueue.push(msgObj);
    }
}

server.listen(4884, '127.0.0.1');

    