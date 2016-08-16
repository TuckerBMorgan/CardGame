var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags');
var Rune = require('../../RuneVM');
var util = require('../../util');

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
    
  ]
}
//END_OF_CARD_DATA

exports.MURLOC_SCOUT_PATH = "basic/murlocScout";

//On Battle cry Novice engineer should deal the playing character a card
exports.onBattleCry = function (playOption, card, controller, state) {
    var murlocGuid = util.createGuid();
    
    var summon = {
        "runeType":"SummonMinion",
        "controllerGuid":controller.guid,
        "sourceCardGuid":card.cardGuid,
        "cardGuid":murlocGuid,
        "cardId":exports.MURLOC_SCOUT_PATH
    }
    Rune.executeRune(summon, state);
}

exports.canPlay = cardFunctions.basicCanPlay

exports.attack = cardFunctions.basicAttack;

exports.canAttack = cardFunctions.basicCanAttack;

exports.takeDamage = cardFunctions.baseTakeDamage;

exports.isAlive = cardFunctions.baseIsAlive;