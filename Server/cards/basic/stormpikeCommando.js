var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags');
var Rune = require('../../RuneVM');
var DamageRune = require('../../runes/damageRune');
var Options = require('../../createOptions')


exports.STORMPIKE_COMMANDO_DAMAGE_AMOUNT = 2;

//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cost": 5,
  "baseAttack": 4,
  "baseHealth": 2,
  "set":cardTags.BASIC,
  "id":"stormpikeCommando",
  "tags":{
      [cardTags.BATTLE_CRY]:true,
      [cardTags.TARGET]:true
  },
  "enchantments":[
    
  ],
  "canPlay":cardFunctions.basicCanPlay,
  "attack":cardFunctions.basicAttack,
  "canAttack":cardFunctions.canAttack,
  "isAlive":cardFunctions.baseIsAlive,
  "takeDamage":cardFunctions.takeDamage,
  "onBattleCry":function (playOption, card, controller, state) {
        Rune.executeRune(DamageRune.CreateRune(card["cardGuid"], playOption["target"], exports.STORMPIKE_COMMANDO_DAMAGE_AMOUNT, state));
    },
  "generateOptions":function(card, controller, state){
        var options = [];

        var targets = ent.returnAllAlive(state);
        var eneCont = ent.getOtherController(controller, state);


        targets.forEach(function(element){
            var playOption = {
                "option":Options.PLAY_CARD_TYPE,
                "cardGuid":card.cardGuid,
                "target":element.cardGuid
            }
            options.push(playOption);
        })

        if(eneCont.hero.health < eneCont.hero.baseHealth)
        {
            var playOption = {
                "option":Options.PLAY_CARD_TYPE,
                "cardGuid":card.cardGuid,
                "target":eneCont.guid
            }
            options.push(playOption);
        }

        if(controller.hero.health < controller.hero.baseHealth)
        {
            var playOption = {
                        "option":Options.PLAY_CARD_TYPE,
                        "cardGuid":card.cardGuid,
                        "target":controller.guid
                }
                options.push(playOption);
        }

        return options;
    }

}
//END_OF_CARD_DATA
