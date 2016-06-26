var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags');
var Rune = require('../../RuneVM');


//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cost": 5,
  "baseAttack": 4,
  "currenthHealth":0,
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
}
//END_OF_CARD_DATA

exports.DARK_SCALE_HEAL_AMOUNT = 2;

//On Battle cry Novice engineer should deal the playing character a card
exports.onBattleCry = function (card, controller, state) {
    
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
    })
}

exports.canPlay = cardFunctions.basicCanPlay

exports.attack = cardFunctions.basicAttack;

exports.canAttack = cardFunctions.basicCanAttack;

exports.takeDamage = cardFunctions.baseTakeDamage;

exports.isAlive = cardFunctions.baseIsAlive;