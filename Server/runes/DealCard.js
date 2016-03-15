var fs = require('fs'); 
var server = require('../server');

//{
// "runeType":"DealCard",
// "controllerGuid":"xxxxxxxx-xxxx-xxyx-xxxx-xxxxxxxx0xxx",   
// "cardGuid":"xxxxxxxx-xxxx-xxyx-xxxx-xxxxxxxx0xxx"
//}

exports.execute = function (rune, state) {
    var socket = state.controllers[rune.controllerGuid].socket;
    var card;
    var deck = state.controllers[rune.controllerGuid].deck;
    var index = 0;
    for(var i = 0;i < deck.length;i++)
    {
        if(deck[i].cardGuid ==  rune.cardGuid)
        {
            index = i;
            card = deck[i];
            break;
        }
    }
    
    server.sendMessage(JSON.stringify(card) ,socket);
    state.controllers[rune.controllerGuid].hand.push(state.controllers[rune.controllerGuid].deck.splice(index, 1)[0]);
}

exports.canSee = function (rune, controller, state) {
    return rune.controllerGuid == controller.guid;
}