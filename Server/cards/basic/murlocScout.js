var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags');

//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cost": 0,
  "baseAttack": 1,
  "currentHealth":0,
  "totalHealth":0,
  "baseHealth": 1,
  "set":cardTags.BASIC,
  "id":"murlocScout",
  "tags":{
      [cardTags.MURLOC]:true
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