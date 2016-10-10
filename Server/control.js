var newController = require("./runes/NewController")
var server = require('./server');
var util = require('./util')
var Rune = require('./RuneVM')
var error = require('./errorMessages')
var entities = require('./entityManager')
var options = require('./createOptions')
var controllerRune = require('./runes/NewController')
var AI = require('./aicontroller')
var updateState = require('./updateState');
var testDecks = require('./TestDecks/testdeck')
var playCard = require('./runes/PlayCard')
var SetHeroHealth = require("./runes/SetHeroHealth");


var state = {
    "controllers":{},//by guid look up of all controllers
    "entities":{},//guid look up for all cards and controllers
    "connections":[],
    "controllersByIP":{},
    "cards":{},//copies of each distinct card used
    "playersReady":0,
    "attackedThisTurn":[],//an array of the GUIDs that have gotten into combat this turn
    "spellEnchantments":{},
    "preEventListeners":{},
    "postEventListeners":{},
    "runes":[]//every rune that is run is tracked here
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
    //lets try and set an object
    var obj;
    try
    {
        //a message comes across the wire and we open a json object equal to the message
        obj = JSON.parse(message);
    }
    catch(e)
    {
        console.log(e + " on message " + message + "that is not a valid json object");
    }
    //switching on the type occurring
    switch (obj["type"]) {
        //valid newConnection rune
        //{
        // "type":"newConnection",
        // "name":"foo"    
        //}
        case "newConnection":
            //increment the connection number
            connectionNum++;
            //if we hit the sweet spot of how many we need to start a game
            if(connectionNum == CONNCETION_NUM_NEEDED)
            {
                //add this connection to the socket list
                sockets.push(socket);
                
                //create a faker *for AI?*
                var fakesocket = {
                    "remoteAddress":"00-00-00"
                }
                //add that one to the socket list
                sockets.push(fakesocket);
                //init state.controllers to be an open object
                state.controllers = {};
                //init entities to be an open object
                state.entities = {};
                //init controllersByIP as an open object
                state.controllersByIP = {};
                //init connections as an empty array
                state.connections = [];
                //add each socket to the connections array
                sockets.forEach(function(element) {
                    state.connections.push(element.remoteAddress);
                })
                //run bootstrap on this state
                    //what we have at this point are empty objects and empty arrays
                    //but we do have a valid connection list of remote addresses
                bootstrap(state);
                //now that bootstrap has run we have created each new controller and told the other player about it
                //increment the ready number
                state.playersReady++;
            }
            else if(connectionNum == 0)
            {
                //add the most recent socket
                sockets.push(socket);
                //add a fake socket
                sockets.push(fakesocket);
                //increment twice
                connectionNum++;
                connectionNum++;
            }
            else
            {
                console.log("someone is trying to connect to a full game, NOPE, maybe latter a spectator");
            }
            
            
            
            break;
        //valid ready rune
        //{
        // "type":"ready"    
        //}
        case "ready":
        state.playersReady++;
        if(state.playersReady == 2)
        {
            var keys = Object.keys(state.controllers);
            //random who will go first
            var goFirst = Math.floor((Math.random() * 100)) % 2;
            
            //quickly be able to reference each "player"
            var first = state.controllers[keys[0]];
            var second = state.controllers[keys[1]];

            //set the turn order array and which turn it is
            state["turnOrder"] = [];
            state["OnTurnPlayer"] = 0;
            state.turnOrder[0] = first;
            state.turnOrder[1] = second;

            //the deck that will be used for both characters
            var useDeck = testDecks.deck;
            
            //iterate through the use deck
            for(var i = 0;i<useDeck.length;i++) 
            {
                //for each car, load it into a temp variable called card
                var card = util.loadCard(useDeck[i]);
                //card comes back where the prototype items are equal to the card values and card now carries the function calls as well
                //create the create card rune
                var useCard = {
                    "runeType":"CreateCard",
                }
                //get the properties of a single card
                var cardkeys = Object.keys(card);
                //copy the keys from the card we just yanked, we want to make sure that CreateCard is the first key in the object
                cardkeys.forEach(function (element) {
                    useCard[element] = card[element];
                })
                //set the GUIDs so that this card can be accessed by the player GUID and it's unique GUID
                useCard.controllerGuid = first.guid;
                useCard.cardGuid = util.createGuid();
                //execute create card on this card
                Rune.executeRune(useCard, state);
            }
            //same as the above
            for(var i = 0;i<30;i++) 
            {
                var card = util.loadCard(useDeck[i]);
                var useCard = {
                    "runeType":"CreateCard",
                }
                var cardkeys = Object.keys(card);
                cardkeys.forEach(function (element) {
                    useCard[element] = card[element];
                })
                useCard.controllerGuid = second.guid;
                useCard.cardGuid = util.createGuid();
                Rune.executeRune(useCard, state);
            }
            //The player going first gets three cards
            var firstHand = [];
            for(var i = 0;i<3;i++)
            {
                //Insure that we are being dealt unqiue cards
                //Else while we are creating the hand we could get two or
                //more of the same cards and so error out
                var newGuid = util.dealCard(first.deck);
                if(firstHand.indexOf(newGuid) != -1)
                {
                    i--;
                    continue;
                }
                //if the card is unique we add it to the first hand
                firstHand.push(newGuid);
            }
            
            //The player going second gets four cards        
            var secondHand = [];
            for(var i = 0;i<4;i++)
            {
                var newGuid = util.dealCard(second.deck);
                if(secondHand.indexOf(newGuid) != -1)
                {
                    i--;
                    continue;
                }
                secondHand.push(newGuid);
            }
            
            //for each dealt card in the first player's hand
            for(var i = 0;i<firstHand.length;i++)
            {
                //create a new rune for dealing cards
                var dealCardRune = {
                    "runeType":"DealCard",
                    "controllerGuid":first.guid,
                    "cardGuid":firstHand[i]
                }
                //deal the card
                Rune.executeRune(dealCardRune, state);
            }
            //same as above
            for(var i = 0;i<secondHand.length;i++)
            {
                var dealCardRune = {
                    "runeType":"DealCard",
                    "controllerGuid":second.guid,
                    "cardGuid":secondHand[i]
                }
                Rune.executeRune(dealCardRune, state);
            }
            
            first.state = controllerRune.MULLIGAN;
            second.state = controllerRune.MULLIGAN;
            var op1 = options.createOptions(first.guid, state);
            var op2 = options.createOptions(second.guid, state);
            
            var opack1 = {
                "runeType":"optionRune",
                "options":op1
            }
            
            var opack2 = {
                "runeType":"optionRune",
                "options":op2
            }
            
            if(first.type != controllerRune.AI_CONTROLLER)
            {
                server.sendMessage(JSON.stringify(opack1), first.socket);
                AI.evaluateMulligan(second, state);
            }
            else
            {
                server.sendMessage(JSON.stringify(opack2), second.socket);
                AI.evaluateMulligan(first, state);
            }
        }
        break;
        
        case "mulligan":
        //This is a special case since we have to deal with the fact that mulligan is a multi choice state change 
            var index = obj["index"];
            var controller = state.controllersByIP[socket.remoteAddress];
            exports.executeMulligan(index, controller, state);
        break;
        
        //valid option message
        //{
        // "type":"option",   
        // "index":n//indexed at 0
        //}
        case "option":
            var controller = state.controllersByIP[socket.remoteAddress];
            exports.executeOptions(obj, controller, state);
        break;
        
        default:
            break;
    }
}

exports.executeMulligan = function (indices, controller, state) 
{
        indices.sort();
        for(var i = 0;i<indices.length;i++)
        {
            var Shuffle = {
                "runeType":"ShuffleCard",
                "controllerGuid":controller.guid,
                "cardGuid":controller.hand[indices[i]].cardGuid
            }
            Rune.executeRune(Shuffle, state);
            for(var k = 0;k<indices.length;k++)
            {
                indices[k] -= 1;
            }
        }
        
        for(var i = 0;i<indices.length;i++)
        {
            var deal = {
                "runeType":"DealCard",
                "controllerGuid":controller.guid,
                "cardGuid":util.dealCard(controller.deck)
            }
            Rune.executeRune(deal, state);
        }
        controller.state = controllerRune.WAITING_FOR_START;
        
        //This is dumb next to fix
        var controllerKeys = Object.keys(state.controllers);
        var count = 0;
        controllerKeys.forEach(function (element) {
            if(state.controllers[element].state === controllerRune.WAITING_FOR_START)
            {
                count++;
            }
        })
        
        if(count == 2)
        {
            var startGame = {
               "runeType":"StartGame"
            }
            Rune.executeRune(startGame, state);
            
            var characterOptions = options.createOptions(state.turnOrder[state.OnTurnPlayer].guid, state);
            state.turnOrder[state.OnTurnPlayer].options = characterOptions;
            state.turnOrder[state.OnTurnPlayer].state = controllerRune.IN_TURN;
            
            var optionsPack = {
                "runeType":"optionRune",
                "options":characterOptions
            }
            
            if(state.turnOrder[state.OnTurnPlayer].type == "PlayerController")
            {
                server.sendMessage(JSON.stringify(optionsPack), state.turnOrder[state.OnTurnPlayer].socket);
            }
            else
            {
                var index =  AI.calculateMove(state.turnOrder[state.OnTurnPlayer], characterOptions, state);
                var objj = {
                        "index":index
                    }
                setTimeout(function () {
                    
                    exports.executeOptions(objj, state.turnOrder[state.OnTurnPlayer], state);
                },1600);
            }
        }
}

exports.executeOptions = function (payload, controller, state) {
     //They gave us a good number
        var index = payload["index"];
        if(index >= 0 && index < controller.options.length)
        {
            var useOption = controller.options[index];
            console.log(useOption)
            switch(useOption["option"])
            {
                case options.ATTACK_TYPE:
                    var entity = entities.getEntity(useOption["attackGuid"], state);
                    if(entity.type === entities.MINION)
                    {
                        entity.attack(entity, useOption["defenderGuid"], controller, state);
                    }
                break;
                
                case options.PLAY_CARD_TYPE:
                    var givenIndex = 
                    Rune.executeRune(playCard.CreateRune(controller["guid"], useOption["cardGuid"],useOption, payload["boardIndex"] ), state);
                break;
                
                case options.PLAY_SPELL:

                    var playSpellRune = {
                        "runeType":"PlaySpell",
                        "controllerGuid":controller.guid,
                        "cardGuid":useOption["cardGuid"],
                        "option":useOption
                    }
                    Rune.executeRune(playSpellRune, state);
                
                break;
                
                case options.END_TURN:
                
                    var rotateTurn = {
                        "runeType":"RotateTurn",
                        "previousGuid":state.turnOrder[state.OnTurnPlayer].guid
                    }
                    Rune.executeRune(rotateTurn, state);
                
                break;
                
                default:
                break;
            }


            updateState.updateState(state); 

            var characterOptions = options.createOptions(state.turnOrder[state.OnTurnPlayer].guid, state);
            state.turnOrder[state.OnTurnPlayer].options = characterOptions;
            state.turnOrder[state.OnTurnPlayer].state = controllerRune.IN_TURN;
            
            
            var optionsPack = {
                "runeType":"optionRune",
                "options":characterOptions
            }
            
            console.log("Character Options " + JSON.stringify(characterOptions));
            
            if(state.turnOrder[state.OnTurnPlayer].type == "PlayerController")
            {
                server.sendMessage(JSON.stringify(optionsPack), state.turnOrder[state.OnTurnPlayer].socket);
            }
            else
            {
                var index =  AI.calculateMove(state.turnOrder[state.OnTurnPlayer], characterOptions, state);
                var objj = {
                    "index":index
                }
                setTimeout(function () {
                    exports.executeOptions(objj, state.turnOrder[state.OnTurnPlayer], state);
                },800);
            }
        }
        
}

//set up the game executed once enough players have connected
function bootstrap(state) {
    //for each connection that we have create a controller
    state.connections.forEach(function(element, index) {
        var guid = util.createGuid();
        var name = "name---";
        var type;
        if(index == 0)
        {
            type = newController.PLAYER_CONTROLLER;
        }
        else 
        {
            //AI will always be index 1
            type = newController.AI_CONTROLLER;
            state.ai = {};
        }
        //create a new controller object
        var obj = { 
            //the GUID we created
            "guid":guid,
            //name of the controller
            "name":name,
            //AI vs player
            "controllerType":type,
            //the hero
            "hero":"hunter"
        }
        //create the new controller by executing obj as a rune
        //  state.controllers[guid] is set to the newly created controller via execute rune
        newController.execute(obj, state)
        //get the IP of the controller and point it to the controller
        state.controllersByIP[element] = state.controllers[guid];
        //the controller has a pointer towards the socket value
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
                "isMe":false,
                "hero":contr.hero.id
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


    keys.forEach(function(element){
        var hero = state["controllers"][element]["hero"];
        Rune.executeRune(SetHeroHealth.CreateRune(element, hero["baseHealth"]), state);
    })
}

function resetGame() {
    entities.entities = {};
    sockets = [];
    connectionNum = 0;
    state.cards = {};
}