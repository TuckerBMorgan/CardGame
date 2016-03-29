var newController = require("./runes/newController")
var server = require('./server');
var util = require('./util')
var Rune = require('./RuneVM')
var error = require('./errorMessages')
var entities = require('./entityManager')
var state = {
    "controllers":{},//by guid look up of all controllers
    "entities":{},
    "connections":[],
    "controllersByIP":{},
    "cards":{},
    "playersReady":0
}

var CONNCETION_NUM_NEEDED = 1;
var connectionNum = 0;

var sockets = [];

exports.connectionLost = function () {
    connectionNum--;
    if(connectionNum == 0)
    {
       resetGame();   
    }
}

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
        //valid newConnection rune
        //{
        // "type":"newConnection",
        // "name":"foo"    
        //}
        case "newConnection":
            connectionNum++;
            if(connectionNum == CONNCETION_NUM_NEEDED)
            {
                sockets.push(socket);
                
                var fakesocket = {
                    "remoteAddress":"00-00-00"
                }
                sockets.push(fakesocket);
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
                sockets.push(fakesocket);
                connectionNum++;
                connectionNum++;
            }
            else
            {
                console.log("someone is trying to connect to a full game, NOPE, maybe latter a spectator");
            }
            
            
            
            break;
        //valid read rune
        //{
        // "type":"ready"    
        //}
        case "ready":
        var keys = Object.keys(state.controllers);
        keys.forEach(function(element) {
            console.log(element);
            for(var i = 0;i<30;i++) 
            {
                var card = util.loadCard("test");
                var useCard = {
                    "runeType":"CreateCard",
                }
                var cardkeys = Object.keys(card);
                cardkeys.forEach(function (element) {
                    useCard[element] = card[element];
                })
                useCard.controllerGuid = element;
                useCard.cardGuid = util.createGuid();
                Rune.executeRune(useCard, state);
            }
            
            var cardKeys = Object.keys(state.controllers[element].deck);
            var index = Math.floor(Math.random() * cardKeys.length);
            var dc = {
                "runeType":"DealCard",
                "controllerGuid":element,
                "cardGuid":state.controllers[element].deck[index].cardGuid
            }
            Rune.executeRune(dc, state);
            
            cardKeys = Object.keys(state.controllers[element].deck);
            index = Math.floor(Math.random() * cardKeys.length);
            var dc2 = {
                "runeType":"DealCard",
                "controllerGuid":element,
                "cardGuid":state.controllers[element].deck[index].cardGuid
            }   
            Rune.executeRune(dc2, state);
            
            cardKeys = Object.keys(state.controllers[element].deck);
            index = Math.floor(Math.random() * cardKeys.length);
            var dc3 = {
                "runeType":"DealCard",
                "controllerGuid":element,
                "cardGuid":state.controllers[element].deck[index].cardGuid
            }
            Rune.executeRune(dc3, state);
            
            return;
        })
        
        
        break;
        //valid play card message
        //{
        // "type":"playCard",   
        // "index":n//indexed at 0
        //}
        case "playCard":
          var controller = state.controllersByIP[socket.remoteAddress];
          var index = obj.index;
          
          console.log(index);
          if(index >= 0 || index < controller.hand.length - 1)
          {
              var playCard = {
                  "runeType":"PlayCard",
                  "controllerGuid":controller.guid,
                  "cardGuid":controller.hand[index].cardGuid,
                  "originOfCard":0
              }
              Rune.executeRune(playCard, state);
          }
          else
          {
              //bad message, not sure what responce should be
            //  error.card
          }
        break;
        //valid mulligan rune
        //{
        // "type":"mulligan",
        // "cards":[n number of indexes]  
        //}
        case "mulligan":
            var controller = state.controllersByIP[socket.remoteAddress];
            var shuffleCards = [];
            for(var i = 0;i<obj.cards.length;i++)
            {
                //any bad index and we bail
                if(obj.cards[i] < 0 || obj.cards[i] > controller.hand.length)
                {
                    //will have it fire error code eventually
                    return;
                }
                console.log(obj.cards[i]);
                shuffleCards.push(controller.hand[obj.cards[i]].cardGuid);
            }
            
            for(var i = 0;i<shuffleCards.length;i++)
            {
                var sc = {
                    "runeType":"ShuffleCard",
                    "controllerGuid":controller.guid,
                    "cardGuid":shuffleCards[i]
                }
                Rune.executeRune(sc, state);
            }
            for(var i = 0;i<obj.cards.length;i++)
            {
                var index = Math.floor(Math.random() * controller.deck.length);
                var dc = {
                    "runeType":"DealCard",
                    "controllerGuid":controller.guid,
                    "cardGuid":controller.deck[index].cardGuid
                }
                
                Rune.executeRune(dc, state);
            }
            state.playersReady++;
            if(state.playersReady == CONNCETION_NUM_NEEDED)
            {
                var obj = {
                    "runeType":"StartGame"
                }
                Rune.executeRune(obj, state);
            }
        break;
        
        default:
            break;
    }
}

function bootstrap(state) {
    
    
    //for each connection that we have create a controller
    state.connections.forEach(function(element, index) {
        var guid = util.createGuid();
        console.log("---- " + guid  +" ====");
        var name = "name---";
        var type;
        if(index == 0)
        {
            type = newController.PLAYER_CONTROLLER;
        }
        else 
        {
            type = newController.AI_CONTROLLER;
            state.ai = {};
        }
        var obj = { 
            "guid":guid,
            "name":name,
            "controllerType":type
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
                "controllerGuid":innerElement,
                "controllerName":contr.name,
                "type":contr.type,
                "isMe":false
            }
            //If the one we are sending to, is the one we are creating the rune from, we tell them that, so they know who they are
            if(contr == state.controllers[element])
            {
                sec.isMe = true;    
            }
            if(state.controllers[element].type == newController.PLAYER_CONTROLLER)
            {
                //and send it
                server.sendMessage(JSON.stringify(sec), state.controllers[element].socket);          
            }
        })
    })
}


function resetGame() {
    entities.entities = {};
    sockets = [];
    connectionNum = 0;
    state.cards = {};
}