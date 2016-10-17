var fs = require('fs'); 
var server = require('../server');

//{
// "runeType":"DealCard",
// "controllerGuid":"xxxxxxxx-xxxx-xxyx-xxxx-xxxxxxxx0xxx",   
// "cardGuid":"xxxxxxxx-xxxx-xxyx-xxxx-xxxxxxxx0xxx"
//}

exports.execute = function (rune, state) {
    //get the location of the player we are dealing
    var socket = state.controllers[rune.controllerGuid].socket;
    //init a card object
    var card;
    //get the controller's deck
    var deck = state.controllers[rune.controllerGuid].deck;
    //set a zeroed index
    var index = 0;
    //iterate through the deck
    for(var i = 0;i < deck.length;i++)
    {
        //if the deck[i] GUID matches the target GUID stop looping
        if(deck[i].cardGuid ==  rune.cardGuid) 
        {
            index = i;
            card = deck[i];
            break;
        }
    }
    //remove that card from the deck and add the card to the hand
    state.controllers[rune.controllerGuid].hand.push(state.controllers[rune.controllerGuid].deck.splice(index, 1)[0]);
    //set the seen cards for this controller and this card to true
    state.controllers[rune.controllerGuid].seenCards[card.cardGuid] = true;
    //we never do more than declare card??
    card.state = "InHand";

    //Need to come up with a keyword to tell the game to do this
    /*
    require('../cards/' + card.set + "/" + card.id).onDeal(card, state.controllers[rune.controllerGuid], state);
    */
    //send that controller's player the changes
    if(!rune["ai_proto"]){
        if(state.controllers[rune.controllerGuid].type == "PlayerController")
        {
            server.sendMessage(JSON.stringify(card), socket);
        }
    }
}

exports.CreateRune = function (controllerGuid, cardGuid) 
{
    var rune = {
        "runeType":"DealCard",
        "controllerGuid":controllerGuid,
        "cardGuid":cardGuid,
        "ai_proto": false
    }
    return rune;
}

exports.canSee = function (rune, controller, state) {
    return true;
}