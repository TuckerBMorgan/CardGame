
var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags')

//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cost": 3,
  "baseAttack": 1,
  "currentHealth":0,
  "totalHealth":0,
  "baseHealth": 4,
  "set":cardTags.BASIC,
  "id":"dalaranMage",
  "tags":{
      [cardTags.SPELL_DAMAGE]:1
  },
  "enchantments":[
    
  ],
  "canPlay":cardFunctions.basicCanPlay,
  "attack":cardFunctions.basicAttack,
  "canAttack":cardFunctions.canAttack,
  "takeDamage":cardFunctions.takeDamage,
  "isAlive":cardFunctions.baseIsAlive
}
//END_OF_CARD_DATA