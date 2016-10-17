var fs = require('fs'); 
var entity = require('../entityManager')
//{
//  "runeType":"CreateCard",
//  "controllerGuid":"xxxxxxxx-xxxx-xxyx-xxxx-xxxxxxxx0xxx",
//  "cardGuid":"xxxxxxxx-xxxx-xxyx-xxxx-xxxxxxxx0xxx"
//   //Then the card is attached as an object after   
//}
exports.execute = function (rune, state) {     
	//take a given card and add it to the deck of the correct player  
   state.controllers[rune.controllerGuid].deck.push(rune);
   //add this card to the correct entity
   entity.addEntity(rune, rune.cardGuid, state);  
}

//at the moment this rune intentionaly does not have a CreateRune function

exports.canSee = function (rune, controller, state) {
    return false;
}