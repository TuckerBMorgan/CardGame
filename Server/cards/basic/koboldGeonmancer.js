
var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags')

//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cost": 2,
  "baseAttack": 2,
  "currentHealth":0,
  "totalHealth":0,
  "baseHealth": 2,
  "set":cardTags.BASIC,
  "id":"koboldGeomancer",
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
