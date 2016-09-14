var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags');
var Rune = require('../../RuneVM');
var util = require('../../util');


exports.MURLOC_SCOUT_PATH = "basic/murlocScout";

//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cost": 1,
  "baseAttack": 2,
  "currentHealth":0,
  "totalHealth":0,
  "baseHealth": 4,
  "set":cardTags.BASIC,
  "id":"murlocTidehunter",
  "tags":{
      [cardTags.BATTLE_CRY]:true,
      [cardTags.MURLOC]:true
  },
  "enchantments":[
    
  ],
  "canPlay":cardFunctions.basicCanPlay,
  "attack":cardFunctions.basicAttack,
  "canAttack":cardFunctions.basicCanAttack,
  "isAlive":cardFunctions.baseIsAlive,
  "takeDamage":cardFunctions.basicTakeDamage,
  "onBattleCry":function (playOption, card, controller, state) {
    var murlocGuid = util.createGuid();
    
    var summon = {
        "runeType":"SummonMinion",
        "controllerGuid":controller.guid,
        "sourceCardGuid":card.cardGuid,
        "cardGuid":murlocGuid,
        "cardId":exports.MURLOC_SCOUT_PATH
    }
    Rune.executeRune(summon, state);}
}
//END_OF_CARD_DATA