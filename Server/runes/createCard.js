var fs = require('fs'); 
var entity = require('../entityManager')
//{
//  "runeType":"CreateCard",
//  "controllerGuid":"xxxxxxxx-xxxx-xxyx-xxxx-xxxxxxxx0xxx",
//  "cardGuid":"xxxxxxxx-xxxx-xxyx-xxxx-xxxxxxxx0xxx"
//   //Then the card is attached as an object after   
//}
exports.execute = function (rune, state) {       
   state.controllers[rune.controllerGuid].deck.push(rune);
   entity.addEntity(rune, rune.cardGuid, state);  
}

exports.canSee = function (rune, controller, state) {
    return false;
}