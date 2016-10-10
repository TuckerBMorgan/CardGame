var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags');

var ModifyAttack = require('../../runes/ModifyAttack');

var SetAttack = require('../../runes/SetAttack');

exports.FLAMETONGUE_TOTEM_DAMAGE_BUFF = 2;

//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cost": 0,
  "baseAttack": 0,
  "currentHealth":0,
  "totalHealth":0,
  "baseHealth": 3,
  "set":cardTags.BASIC,
  "id":"flametongueTotem",
  "tags" : {
    [cardTags.TOTEM]:true,
    [cardTags.AURA]:true
  },
  "canPlay":cardFunctions.basicCanPlay,
  "attack":cardFunctions.basicAttack,
  "canAttack":cardFunctions.basicCanAttack,
  "takeDamage":cardFunctions.basicTakeDamage,
  "isAlive":cardFunctions.baseIsAlive,
  "filterCard":function(card, otherCard, controller, state){

      //get the posistion on the board of the possible card and the totem
      var cardIndex = controller["inPlay"].indexOf(card);
      var otherCardIndex = controller["inPlay"].indexOf(otherCard);

      //if they are next to each other buff it
      if(Math.abs(cardIndex - otherCardIndex) == 1)
      {
          return true;
      }

      return false;
      
  },
  "applyAura":function(card, otherCard, controller, state){
        RuneVM.executeRune(SetAttack.CreateRune(otherCard.cardGuid, card["totalAttack"] + exports.FLAMETONGUE_TOTEM_DAMAGE_BUFF), state);
        RuneVM.executeRune(ModifyAttack.CreateRune(otherCard.cardGuid, card.cardGuid, exports.FLAMETONGUE_TOTEM_DAMAGE_BUFF), state);
  },
  "removeAura":function(card, otherCard, controller, state){
      RuneVM.executeRune(SetAttack.CreateRune(otherCard.cardGuid, card["totalAttack"] - exports.FLAMETONGUE_TOTEM_DAMAGE_BUFF), state);
  }
}
//END_OF_CARD_DATA