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
    
  ],
  "canPlay":cardFunctions.basicCanPlay,
  "attack":cardFunctions.basicAttack,
  "canAttack":cardFunctions.canAttack,
  "takeDamage":cardFunctions.takeDamage,
  "isAlive":cardFunctions.baseIsAlive,
  "onBattleCry":function (playOption, card, controller, state) {
   
   var others = ent.returnAllAliveAndOnTeam(card.team, state);
   var modHealthRune = {
       "runeType":"ModifyRune",
       "target":card.cardGuid,
       "amount":others.length
   }

   rune.executeRune(modHealthRune, state);}
}