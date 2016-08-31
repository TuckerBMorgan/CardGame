var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags');
var RuneVM = require('../../RuneVM');

var ModifyAttack = require('../../runes/ModifyAttack');
var ModifyHealth = require('../../runes/ModifyHealth');

var SetHealth = require('../../runes/SetHealth');
var SetAttack = require('../../runes/SetAttack');

//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cost": 0,
  "baseAttack": 6,
  "baseHealth": 6,
  "set":cardTags.BASIC,
  "id":"stormwindChampion",
  "tags":{
      [cardTags.AURA]:true
  }
}
//END_OF_CARD_DATA

exports.canPlay = cardFunctions.basicCanPlay

exports.attack = cardFunctions.basicAttack;

exports.canAttack = cardFunctions.basicCanAttack;

exports.takeDamage = cardFunctions.baseTakeDamage;

exports.isAlive = cardFunctions.baseIsAlive;

exports.filterCard = function (card, otherCard, controller, state) {
    if(card.team == otherCard.team && card.cardGuid != otherCard.cardGuid)
    {
        return true;
    }
    return false;
}


exports.STORMWIND_AURA_HEALTH_BUFF_AMOUNT = 1;

exports.STORMWIND_AURA_ATTACK_BUFF_AMOUNT = 1;

exports.applyAura = function (card, otherCard, controller, state) {

    RuneVM.executeRune(SetHealth.CreateRune(otherCard.cardGuid, exports.STORMWIND_AURA_HEALTH_BUFF_AMOUNT), state);
    RuneVM.executeRune(ModifyHealth.CreateRune(otherCard.cardGuid, card.cardGuid, exports.STORMWIND_AURA_HEALTH_BUFF_AMOUNT), state);

    RuneVM.executeRune(SetAttack.CreateRune(otherCard.cardGuid, exports.STORMWIND_AURA_ATTACK_BUFF_AMOUNT), state);
    RuneVM.executeRune(ModifyAttack.CreateRune(otherCard.cardGuid, card.cardGuid, exports.STORMWIND_AURA_ATTACK_BUFF_AMOUNT), state);

}

exports.removeAura = function (card, otherCard, controller, state) {
    RuneVM.executeRune(SetHealth.CreateRune(otherCard.cardGuid, -exports.STORMWIND_AURA_HEALTH_BUFF_AMOUNT), state);
    RuneVM.executeRune(SetAttack.CreateRune(otherCard.cardGuid, -exports.STORMWIND_AURA_ATTACK_BUFF_AMOUNT), state);
}