

var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags');

//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cost": 2,
  "baseAttack": 3,
  "currentHealth":0,
  "totalHealth":0,
  "baseHealth": 2,
  "set":cardTags.BASIC,
  "id":"bloodfenRaptor",
  "tags" : {
    [cardTags.BEAST]:true
  },
  "enchantments":[
    
  ],
  "canPlay":cardFunctions.basicCanPlay,
  "attack":cardFunctions.basicAttack,
  "canAttack":cardFunctions.basicCanAttack,
  "takeDamage":cardFunctions.basicTakeDamage,
  "isAlive":cardFunctions.baseIsAlive
}
//END_OF_CARD_DATA