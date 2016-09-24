var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags');
var RuneVM = require('../../RuneVM');

var ModifyAttack = require('../../runes/ModifyAttack');
var ModifyHealth = require('../../runes/ModifyHealth');

var SetHealth = require('../../runes/SetHealth');
var SetAttack = require('../../runes/SetAttack');

exports.STORMWIND_AURA_HEALTH_BUFF_AMOUNT = 1;

exports.STORMWIND_AURA_ATTACK_BUFF_AMOUNT = 1;

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
  },
  "canPlay":cardFunctions.basicCanPlay,
  "attack":cardFunctions.basicAttack,
  "canAttack":cardFunctions.basicCanAttack,
  "isAlive":cardFunctions.baseIsAlive,
  "takeDamage":cardFunctions.basicTakeDamage,
  "filterCard":function (card, otherCard, controller, state) {
        if(card.team == otherCard.team && card.cardGuid != otherCard.cardGuid)
        {
            return true;
        }
        return false;
    },
    "applyAura":function (card, otherCard, controller, state) {
        RuneVM.executeRune(SetHealth.CreateRune(otherCard.cardGuid, card["totalHealth"] + exports.STORMWIND_AURA_HEALTH_BUFF_AMOUNT), state);
        RuneVM.executeRune(ModifyHealth.CreateRune(otherCard.cardGuid, card.cardGuid, exports.STORMWIND_AURA_HEALTH_BUFF_AMOUNT), state);

        RuneVM.executeRune(SetAttack.CreateRune(otherCard.cardGuid, card["totalAttack"] + exports.STORMWIND_AURA_ATTACK_BUFF_AMOUNT), state);
        RuneVM.executeRune(ModifyAttack.CreateRune(otherCard.cardGuid, card.cardGuid, exports.STORMWIND_AURA_ATTACK_BUFF_AMOUNT), state);
    },
    "removeAura":function (card, otherCard, controller, state) {
        RuneVM.executeRune(SetHealth.CreateRune(otherCard.cardGuid, card["totalHealth"] - exports.STORMWIND_AURA_HEALTH_BUFF_AMOUNT), state);
        RuneVM.executeRune(SetAttack.CreateRune(otherCard.cardGuid, card["totalAttack"] - exports.STORMWIND_AURA_ATTACK_BUFF_AMOUNT), state);
    }
}
//END_OF_CARD_DATA