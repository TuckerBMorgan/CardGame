var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags');
var Rune = require('../../RuneVM');
var util = require('../../util');

//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cost": 3,
  "baseAttack": 1,
  "currentHealth":0,
  "totalHealth":0,
  "baseHealth": 4,
  "set":cardTags.BASIC,
  "id":"silverbackPatriach",
  "tags":{
      [cardTags.TAUNT]:true,
      [cardTags.BEAST]:true
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
