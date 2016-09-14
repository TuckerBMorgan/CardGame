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
    
  ],
  "canPlay":cardFunctions.basicCanPlay,
  "attack":cardFunctions.basicAttack,
  "canAttack":cardFunctions.basicCanAttack,
  "takeDamage":cardFunctions.basicTakeDamage,
  "isAlive":cardFunctions.baseIsAlive
}
//END_OF_CARD_DATA