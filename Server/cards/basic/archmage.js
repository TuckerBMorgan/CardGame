var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags');


//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cost": 6,
  "baseAttack": 4,
  "currentHealth":0,
  "totalHealth":0,
  "baseHealth": 7,
  "team":-1,
  "set":cardTags.BASIC,
  "id":"archmage",
  "tags" : {
    [cardTags.SPELL_DAMAGE]:1
  },
  "enchantments":[
    
  ]
}
//END_OF_CARD_DATA

exports.canPlay = cardFunctions.basicCanPlay

exports.attack = cardFunctions.basicAttack;

exports.canAttack = cardFunctions.basicCanAttack;

exports.takeDamage = cardFunctions.baseTakeDamage;

exports.isAlive = cardFunctions.baseIsAlive;