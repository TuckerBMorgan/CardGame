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
    "postEventListeners":{}
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
                state.playersReady++;
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
                
            var first = state.controllers[keys[0]];
            var second = state.controllers[keys[1]];
            state["turnOrder"] = [];
            state["OnTurnPlayer"] = 0;
            state.turnOrder[0] = first;
            state.turnOrder[1] = second;
            var useDeck = testDecks.deck;
            
            for(var i = 0;i<useDeck.length;i++) 
            {
                var card = util.loadCard(useDeck[i]);
                var useCard = {
                    "runeType":"CreateCard",
                }
                var cardkeys = Object.keys(card);
                //copy the keys from the card we just yanked, we want to make sure that CreateCard is the first key in the object
                cardkeys.forEach(function (element) {
                    useCard[element] = card[element];
                })
                useCard.controllerGuid = first.guid;
                useCard.cardGuid = util.createGuid();
                Rune.executeRune(useCard, state);
            }
            
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
            
            for(var i = 0;i<firstHand.length;i++)
            {
                var dealCardRune = {
                    "runeType":"DealCard",
                    "controllerGuid":first.guid,
                    "cardGuid":firstHand[i]
                }
                Rune.executeRune(dealCardRune, state);
            }
            
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
            exports.executeOptions(obj.index, controller, state);
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
                setTimeout(function () {
                    exports.executeOptions(index, state.turnOrder[state.OnTurnPlayer], state);
                },1600);
            }
        }
}

exports.executeOptions = function (index, controller, state) {
     //They gave us a good number
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
                    Rune.executeRune(playCard.CreateRune(controller["guid"], useOption["cardGuid"],useOption ), state);
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
                
                setTimeout(function () {
                    exports.executeOptions(index, state.turnOrder[state.OnTurnPlayer], state);
                },800);
            }
        }
        
}

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
            type = newController.AI_CONTROLLER;
            state.ai = {};
        }
        var obj = { 
            "guid":guid,
            "name":name,
            "controllerType":type,
            "hero":"hunter"
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
                console.log(JSON.stringify(sec));
                //and send it
                server.sendMessage(JSON.stringify(sec), state.controllers[element].socket);          
            }
        })
    })


    keys.forEach(function(element){
        var hero = state["controllers"][element]["hero"];
        console.log(hero);
        Rune.executeRune(SetHeroHealth.CreateRune(element, hero["baseHealth"]), state);
    })
}

function resetGame() {
    entities.entities = {};
    sockets = [];
    connectionNum = 0;
    state.cards = {};
}