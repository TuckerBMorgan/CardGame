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
  "id":"dragonlingMechanic",
  "tags":{
      [cardTags.BATTLE_CRY]:true
  },
  "enchantments":[
    
  ]
}
//END_OF_CARD_DATA

exports.MECHANIC_DRAGONLING_PATH = "basic/mechanicalDragonling";

//On Battle cry Novice engineer should deal the playing character a card
exports.onBattleCry = function (card, controller, state) {
    var dragonGuid = util.createGuid();
    
    var summon = {
        "runeType":"SummonMinion",
        "controllerGuid":controller.guid,
        "sourceCardGuid":card.cardGuid,
        "cardGuid":dragonGuid,
        "cardId":exports.MECHANIC_DRAGONLING_PATH
    }
    Rune.executeRune(summon, state);
}

exports.canPlay = cardFunctions.basicCanPlay

exports.attack = cardFunctions.basicAttack;

exports.canAttack = cardFunctions.basicCanAttack;

exports.takeDamage = cardFunctions.baseTakeDamage;

exports.isAlive = cardFunctions.baseIsAlive;