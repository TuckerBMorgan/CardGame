var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags');
var Rune = require('../../RuneVM');
var util = require('../../util');

exports.MECHANIC_DRAGONLING_PATH = "basic/mechanicalDragonling";

//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cost": 1,
  "baseAttack": 2,
  "currentHealth":0,
  "totalHealth":0,
  "baseHealth": 4,
  "set":cardTags.BASIC,
  "id":"dragonlingMechanic",
  "tags":{
      [cardTags.BATTLE_CRY]:true
  },
  "enchantments":[
    
  ],
  "canPlay":cardFunctions.basicCanPlay,
  "attack":cardFunctions.basicAttack,
  "canAttack":cardFunctions.canAttack,
  "takeDamage":cardFunctions.takeDamage,
  "isAlive":cardFunctions.baseIsAlive,
  "onBattleCry":function (playOption, card, controller, state) {
    var dragonGuid = util.createGuid();
    
    var summon = {
        "runeType":"SummonMinion",
        "controllerGuid":controller.guid,
        "sourceCardGuid":card.cardGuid,
        "cardGuid":dragonGuid,
        "cardId":exports.MECHANIC_DRAGONLING_PATH
    }
    Rune.executeRune(summon, state);}
}
//END_OF_CARD_DATA