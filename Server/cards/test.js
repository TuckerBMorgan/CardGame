var cardFunctions = require('./cardFunctions')
var ent = require('../entityManager');

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

exports.canPlay = cardFunctions.basicCanPlay

exports.attack = cardFunctions.basicAttack;

exports.canAttack = cardFunctions.basicCanAttack;

exports.takeDamage = cardFunctions.baseTakeDamage;