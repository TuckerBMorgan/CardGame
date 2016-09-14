var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags');

//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cost": 4,
  "baseAttack": 3,
  "currentHealth":0,
  "totalHealth":0,
  "baseHealth": 5,
  "set":cardTags.BASIC,
  "id":"senjinShieldmasta",
  "tags":{
    [cardTags.TAUNT]:true
  },
  "enchantments":[
    
  ],
  "canPlay":cardFunctions.basicCanPlay,
  "attack":cardFunctions.basicAttack,
  "canAttack":cardFunctions.basicCanAttack,
  "isAlive":cardFunctions.baseIsAlive,
  "takeDamage":cardFunctions.basicTakeDamage,
}
//END_OF_CARD_DATA