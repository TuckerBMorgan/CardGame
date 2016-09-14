var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags');
var Rune = require('../../RuneVM');


//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cost": 1,
  "baseAttack": 2,
  "currentHealth":0,
  "totalHealth":0,
  "baseHealth": 1,
  "set":cardTags.BASIC,
  "id":"mechanicalDragonling",
  "tags":{
      [cardTags.MECH]:true,
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