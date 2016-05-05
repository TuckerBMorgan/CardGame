/*
*This is a an example and layout file
*Every minion cards starts from this one
*/
//Everthing above this line will not be copied into new files
//DEFAULT_FILE_STARTS_NOW


var cardFunctions = require('./cardFunctions')
var ent = require('../entityManager');

//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cardName": "test",
  "desc": "desc",
  "art": "test",
  "cost": 1,
  "baseHealth": 1,
  "baseAttack": 1,
    //A short note about IDS, THEY CANNOT CHANGE unless all files that use it change as a well, they are the only way to go from an instance of a entity to the file that they use
  "id":"test",
  "tags":[]
}
//END_OF_CARD_DATA


exports.onGraveyard = cardFunctions.basicOnGraveyard;

exports.onPlay = cardFunctions.basicOnPlay;

exports.onDeal = cardFunctions.basicOnDeal;

exports.canPlay = cardFunctions.basicCanPlay

exports.attack = cardFunctions.basicAttack;

exports.canAttack = cardFunctions.basicCanAttack;

exports.takeDamage = cardFunctions.baseTakeDamage;

exports.isAlive = cardFunctions.baseIsAlive;