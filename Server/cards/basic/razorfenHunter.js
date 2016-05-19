var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags');
var Rune = require('../../RuneVM');
var util = require('../../util');

//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cost": 3,
  "baseAttack": 2,
  "baseHealth": 3,
  "set":cardTags.BASIC,
  "id":"razorfenHunter",
  "tags":{
      [cardTags.BATTLE_CRY]:true
  }
}
//END_OF_CARD_DATA

exports.BOAR_PATH = "basic/boar";

//On Battle cry Novice engineer should deal the playing character a card
exports.onBattleCry = function (card, controller, state) {
    var boarGuid = util.createGuid();
    
    var summon = {
        "runeType":"SummonMinion",
        "controllerGuid":controller.guid,
        "sourceCardGuid":card.cardGuid,
        "cardGuid":boarGuid,
        "cardId":exports.BOAR_PATH
    }
    Rune.executeRune(summon, state);
}

exports.canPlay = cardFunctions.basicCanPlay

exports.attack = cardFunctions.basicAttack;

exports.canAttack = cardFunctions.basicCanAttack;

exports.takeDamage = cardFunctions.baseTakeDamage;

exports.isAlive = cardFunctions.baseIsAlive;