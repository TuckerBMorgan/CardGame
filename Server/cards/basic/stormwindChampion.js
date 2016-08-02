var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags');
var RuneVM = require('../../RuneVM');

//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cost": 0,
  "baseAttack": 6,
  "currentHealth":0,
  "totalHealth":0,
  "baseHealth": 6,
  "set":cardTags.BASIC,
  "id":"stormwindChampion",
  "tags":{
      [cardTags.CHARGE]:true,
      [cardTags.AURA]:true
  },
  "enchantments":[
    
  ]
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

exports.STORMWIND_AURA_TOP_HEALTH_AMOUNT = 1;

exports.applyAura = function (card, otherCard, controller, state) {
    var setHealthRune = {
        "runeType":"SetHealth",
        "cardGuid":otherCard.cardGuid,
        "amount":exports.STORMWIND_AURA_TOP_HEALTH_AMOUNT,
    }
    
    var modifyHealthRune = {
        "runeType":"ModifyHealth",
        "source":card.cardGuid,
        "target":otherCard.cardGuid,
        "amount":exports.STORMWIND_AURA_TOP_HEALTH_AMOUNT = 1
    }
    
    RuneVM.executeRune(setHealthRune, state);
    
    RuneVM.executeRune(modifyHealthRune, state);
}


exports.removeAura = function (card, otherCard, controller, state) {
    
    var setHealthRune = {
        "runeType":"SetHealth",
        "cardGuid":otherCard.cardGuid,
        "amount":-exports.STORMWIND_AURA_TOP_HEALTH_AMOUNT
    }
           
    RuneVM.executeRune(setHealthRune, state);
}