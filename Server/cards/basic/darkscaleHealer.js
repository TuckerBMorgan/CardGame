var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags');
var Rune = require('../../RuneVM');


exports.DARK_SCALE_HEAL_AMOUNT = 2;

//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cost": 5,
  "baseAttack": 4,
  "currentHealth":0,
  "totalHealth":0,
  "baseHealth": 5,
  "set":cardTags.BASIC,
  "id":"darkscaleHealer",
  "tags":{
      [cardTags.MURLOC]:true,
      [cardTags.BATTLE_CRY]:true
  },
  "enchantments":[
    
  ]
  ,
  "canPlay":cardFunctions.basicCanPlay,
  "attack":cardFunctions.basicAttack,
  "canAttack":cardFunctions.canAttack,
  "takeDamage":cardFunctions.takeDamage,
  "isAlive":cardFunctions.baseIsAlive,
  "onBattleCry":function (playOption, card, controller, state) {
    var inPlayOthers = controller.inPlay;
    var HealRunes = [];

    for(var i = 0;i<inPlayOthers.length;i++)
    {
        if(card.cardGuid == inPlayOthers[i].cardGuid)
        continue;

        var heal = {
            "runeType":"Heal",
            "source":card.cardGuid,
            "target":inPlayOthers[i].cardGuid,
            "amount":exports.DARK_SCALE_HEAL_AMOUNT
        }

        HealRunes.push(heal);
    }

    HealRunes.forEach(function (runes) {
        Rune.executeRune(runes, state);
    })}
}
//END_OF_CARD_DATA
