

var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags');

//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cardName": "Bloodfen Raptor",
  "desc": "\"Kill 30 raptors.\" - Hermet Nesignwary",
  "cardText":"",
  "art": "bloodfenRaptor",
  "cost": 2,
  "baseHealth": 2,
  "baseAttack": 3,
  "set":cardTags.BASIC,
  "id":"bloodfenRaptor",
  "tags":[cardTags.BEAST]
}
//END_OF_CARD_DATA

exports.canPlay = cardFunctions.basicCanPlay

exports.attack = cardFunctions.basicAttack;

exports.canAttack = cardFunctions.basicCanAttack;

exports.takeDamage = cardFunctions.baseTakeDamage;

exports.isAlive = cardFunctions.baseIsAlive;