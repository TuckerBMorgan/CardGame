
var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags')

//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cost": 4,
  "baseAttack": 4,
  "currentHealth":0,
  "totalHealth":0,
  "baseHealth": 4,
  "set":cardTags.BASIC,
  "id":"ogreMagi",
  "tags":{
      [cardTags.SPELL_DAMAGE]:1
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