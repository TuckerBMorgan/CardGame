
var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags')

//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cardName": "Boulderfist Orge",
  "desc": "ME HAVE GOOD STATS FOR THE COST",
  "cardText":"",
  "art": "boulderfistOgre",
  "cost": 6,
  "baseHealth": 7,
  "baseAttack": 6,
  "set":cardTags.BASIC,
  "id":"boulderfistOgre",
  "tags":[]
}
//END_OF_CARD_DATA

exports.canPlay = cardFunctions.basicCanPlay

exports.attack = cardFunctions.basicAttack;

exports.canAttack = cardFunctions.basicCanAttack;

exports.takeDamage = cardFunctions.baseTakeDamage;

exports.isAlive = cardFunctions.baseIsAlive;