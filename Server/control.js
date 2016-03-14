var newController = require("./runes/newController")
var server = require('./server');
var util = require('./util')
var Rune = require('./RuneVM')

var state = {
    "controllers":{},//by guid look up of all controllers
    "entities":{},
    "connections":[],
    "controllersByIP":{}
}

var CONNCETION_NUM_NEEDED = 1;
var connectionNum = 0;

var sockets = [];
exports.routing = function (message, socket) {
    var obj;
    try
    {
        obj = JSON.parse(message);
    }
    catch(e)
    {
        console.log(e + " on message " + message + "that is not a valid json object");
    }
    console.log(obj);
    switch (obj["type"]) {
        case "newConnection":
            connectionNum++;
            if(connectionNum == CONNCETION_NUM_NEEDED)
            {
                sockets.push(socket);
                state.controllers = {};
                state.entities = {};
                state.controllersByIP = {};
                state.connections = [];
                sockets.forEach(function(element) {
                    state.connections.push(element.remoteAddress);
                })
                bootstrap(state);
            }
            else if(connectionNum == 0)
            {
                sockets.push(socket);
                connectionNum++;
            }
            else
            {
                console.log("someone is trying to connect to a full game, NOPE, maybe latter a spectator");
            }
            
            
            
            break;
        case "ready":
        var keys = Object.keys(state.controllers);
        keys.forEach(function(element) {
            for(var i = 0;i<30;i++) 
            {
                var cc = {
                    "runeType":"CreateCard",
                    "cardID":"test"
                }
                Rune.executeRune(cc, state);
            }
        })
        break;
        default:
            break;
    }
}

function bootstrap(state) {
    
    
    //for each connection that we have create a controller
    state.connections.forEach(function(element, index) {
        var guid = util.createGuid();
        var name = "name---";
        var type = newController.PLAYER_CONTROLLER;
        var obj = {
            "guid":guid,
            "name":name,
            "type":type
        }
        newController.execute(obj, state)
        state.controllersByIP[element] = state.controllers[guid];
        state.controllers[guid].socket = sockets[index];
    }, this);
    
    //for each ip, tell them about the other controllers ie: send them the newControllers runes
    
    var keys = Object.keys(state.controllers);
   //foreach controller in the game
    keys.forEach(function(element) {
    
            var innerKeys = Object.keys(state.controllers);
            //against them again
            innerKeys.forEach(function (innerElement) {
                //create the newControllerRune
                var contr = state.controllers[innerElement];
                var sec = {
                    "runeType":"NewController",
                    "controllerGuid":contr.guid,
                    "controllerName":contr.name,
                    "type":contr.type,
                    "isMe":false
                }
                console.log(sec);
                //If the one we are sending to, is the one we are creating the rune from, we tell them that, so they know who they are
                if(contr == state.controllers[element])
                {
                    sec.isMe = true;    
                }
                //and send it
                server.sendMessage(JSON.stringify(sec), state.controllers[element].socket);          
        })
    })
}