var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags');
var rune = require('../../RuneVM');

//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cost": 2,
  "baseAttack": 2,
  "currentHealth":0,
  "totalHealth":0,
  "baseHealth": 1,
  "set":cardTags.BASIC,
  "id":"frostwoldWarlord",
  "tags":{
      [cardTags.BATTLE_CRY]:true,
  },
  "enchantments":[
    
  ]
}
//END_OF_CARD_DATA
exports.onBattleCry = function (card, controller, state) {
   
   var others = ent.returnAllAliveAndOnTeam(card.team, state);
   var modHealthRune = {
       "runeType":"ModifyRune",
       "target":card.cardGuid,
       "amount":others.length
   }

   rune.executeRune(modHealthRune, state);
}

exports.canPlay = cardFunctions.basicCanPlay

exports.attack = cardFunctions.basicAttack;

exports.canAttack = cardFunctions.basicCanAttack;

exports.takeDamage = cardFunctions.baseTakeDamage;

exports.isAlive = cardFunctions.baseIsAlive;