var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags');
var Rune = require('../../RuneVM');
var util = require('../../util');
var SummonRune = require("../../runes/SummonMinion")

exports.BOAR_PATH = "basic/boar";

//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cost": 3,
  "baseAttack": 2,
  "currentHealth":0,
  "totalHealth":0,
  "baseHealth": 3,
  "set":cardTags.BASIC,
  "id":"razorfenHunter",
  "tags":{
      [cardTags.BATTLE_CRY]:true
  },
  "enchantments":[
    
  ],
  "canPlay":cardFunctions.basicCanPlay,
  "attack":cardFunctions.basicAttack,
  "canAttack":cardFunctions.basicCanAttack,
  "isAlive":cardFunctions.baseIsAlive,
  "takeDamage":cardFunctions.basicTakeDamage,
  "onBattleCry":function (playOption, card, controller, state) {
    var boarGuid = util.createGuid();
    var indexOf = controller["inPlay"].indexOf(card);
    var summon = SummonRune.CreateRune(controller.guid, card.cardGuid, boarGuid, exports.BOAR_PATH, indexOf + 1);
    Rune.executeRune(summon, state);
  }
}
//END_OF_CARD_DATA