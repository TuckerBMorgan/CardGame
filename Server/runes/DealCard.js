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
    state.controllers[rune.controllerGuid].hand.push(state.controllers[rune.controllerGuid].deck.splice(index, 1)[0]);
    state.controllers[rune.controllerGuid].seenCards[card.cardGuid] = true;
    card.state = "InHand";

    //Need to come up with a keyword to tell the game to do this
    /*
    require('../cards/' + card.set + "/" + card.id).onDeal(card, state.controllers[rune.controllerGuid], state);
    */
    
    if(state.controllers[rune.controllerGuid].type == "PlayerController")
    {
        server.sendMessage(JSON.stringify(card), socket);
    }
}

exports.CreateRune = function (controllerGuid, cardGuid) 
{
    var rune = {
        "runeType":"DealCard",
        "controllerGuid":controllerGuid,
        "cardGuid":cardGuid
    }
    return rune;
}

exports.canSee = function (rune, controller, state) {
    return true;
}