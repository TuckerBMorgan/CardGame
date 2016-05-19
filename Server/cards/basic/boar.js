var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags');
var Rune = require('../../RuneVM');
var util = require('../../util');

//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cost": 1,
  "baseAttack": 1,
  "baseHealth": 1,
  "set":cardTags.BASIC,
  "id":"boar",
  "tags":{
      [cardTags.BEAST]:true
  }
}
//END_OF_CARD_DATA

exports.canPlay = cardFunctions.basicCanPlay

exports.attack = cardFunctions.basicAttack;

exports.canAttack = cardFunctions.basicCanAttack;

exports.takeDamage = cardFunctions.baseTakeDamage;

exports.isAlive = cardFunctions.baseIsAlive;