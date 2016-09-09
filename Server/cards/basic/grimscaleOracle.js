var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags');
var RuneVM = require('../../RuneVM');

var ModifyAttack = require('../../runes/ModifyAttack');
var SetAttack = require('../../runes/SetAttack');

exports.RAID_LEADER_ATTACK_BUFF_AMOUNT = 1;

//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cost": 1,
  "baseAttack": 1,
  "baseHealth": 1,
  "set":cardTags.BASIC,
  "id":"grimscaleOracle",
  "tags":{
      [cardTags.AURA]:true,
      [cardTags.MURLOC]:true
  },
  "canPlay":cardFunctions.basicCanPlay,
  "attack":cardFunctions.basicAttack,
  "canAttack":cardFunctions.canAttack,
  "takeDamage":cardFunctions.takeDamage,
  "isAlive":cardFunctions.baseIsAlive,
  "filterCard":function (card, otherCard, controller, state) {
    if(card.cardGuid != otherCard.cardGuid && card.tags[cardTags.MURLOC] != undefined)
    {
        return true;
    }
    return false;},
    "applyAura":function (card, otherCard, controller, state) {
        RuneVM.executeRune(SetAttack.CreateRune(otherCard.cardGuid, exports.RAID_LEADER_ATTACK_BUFF_AMOUNT), state);
        RuneVM.executeRune(ModifyAttack.CreateRune(otherCard.cardGuid, card.cardGuid, exports.RAID_LEADER_ATTACK_BUFF_AMOUNT), state);
    },
    "removeAura":function (card, otherCard, controller, state) {
        RuneVM.executeRune(SetAttack.CreateRune(otherCard.cardGuid, -exports.STORMWIND_AURA_ATTACK_BUFF_AMOUNT), state);
    }
}
//END_OF_CARD_DATA