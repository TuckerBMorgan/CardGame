var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags');
var Rune = require('../../RuneVM');
var DamageRune = require('../../runes/damageRune');

//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cost": 1,
  "baseAttack": 1,
  "currentHealth":0,
  "totalHealth":0,
  "baseHealth": 1,
  "set":cardTags.BASIC,
  "id":"elvenArcher",
  "tags":{
      [cardTags.BATTLE_CRY]:true,
      [cardTags.TARGET]:true
  },
  "enchantments":[
    
  ]
}
//END_OF_CARD_DATA

exports.ELVEN_ARCHER_DAMAGE_AMOUNT = 1;

//On Battle cry Novice engineer should deal the playing character a card
exports.onBattleCry = function (playOption, card, controller, state) {
    Rune.executeRune(DamageRune.CreateRune(card["cardGuid"], playOption["target"], exports.ELVEN_ARCHER_DAMAGE_AMOUNT, state));
}

exports.filterTargets = function()
{
    
}

exports.canPlay = cardFunctions.basicCanPlay

exports.attack = cardFunctions.basicAttack;

exports.canAttack = cardFunctions.basicCanAttack;

exports.takeDamage = cardFunctions.baseTakeDamage;

exports.isAlive = cardFunctions.baseIsAlive;