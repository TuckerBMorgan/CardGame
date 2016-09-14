var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags');

//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cost": 2,
  "baseAttack": 2,
  "currentHealth":0,
  "totalHealth":0,
  "baseHealth": 1,
  "set":cardTags.BASIC,
  "id":"bluegillWarrior",
  "tags":{
      [cardTags.CHARGE]:true,
      [cardTags.MURLOC]:true
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