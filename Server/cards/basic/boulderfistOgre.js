
var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags')

//START_OF_CARD_DATA
//they also have two other varibles called currentHealth and totalHealth
//currentHealth is there current health value
//totalHealth is the highest amount of health they can up to = baseHealth += any health enchaments
exports.card = {
  "type": ent.MINION,
  "cost": 6,
  "baseAttack": 6,
  "currentHealth":0,
  "totalHealth":0,
  "baseHealth": 7,
  "set":cardTags.BASIC,
  "id":"boulderfistOgre",
  "tags":{},
  "enchantments":[
    
  ]
}
//END_OF_CARD_DATA

exports.canPlay = cardFunctions.basicCanPlay

exports.attack = cardFunctions.basicAttack;

exports.canAttack = cardFunctions.basicCanAttack;

exports.takeDamage = cardFunctions.baseTakeDamage;

exports.isAlive = cardFunctions.baseIsAlive;