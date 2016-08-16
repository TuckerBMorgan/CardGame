var entity = require('../entityManager')

//{
//  "runeType":"ShuffleCard",
//  "controllerGuid":"xxxxxxxx-xxxx-xxyx-xxxx-xxxxxxxx0xxx",
//  "cardGuid":"xxxxxxxx-xxxx-xxyx-xxxx-xxxxxxxx0xxx"
//   //   
//}
exports.execute = function (rune, state) {       
    var deck = state.controllers[rune["controllerGuid"]].deck;
    var hand = state.controllers[rune["controllerGuid"]].hand;
    hand.some(function(element, index) {
        if(element["cardGuid"] == rune["cardGuid"])
        {
            deck.push(element);
            hand.splice(index, 1);
            return true;
        }
        return false;
    })  
}

exports.CreateCard = function(controllerGuid, cardGuid)
{
    var rune = {
        "runeType":"ShuffleCard",
        "controllerGuid":controllerGuid, 
        "cardGuid":cardGuid
    }
    return rune;
}

exports.canSee = function (rune, controller, state) {
    return true;
}