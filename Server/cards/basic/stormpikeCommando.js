var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags');
var Rune = require('../../RuneVM');
var DamageRune = require('../../runes/damageRune');
var Options = require('../../createOptions')

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
    
  ]
}
//END_OF_CARD_DATA

exports.STORMPIKE_COMMANDO_DAMAGE_AMOUNT = 2;

//On Battle cry Novice engineer should deal the playing character a card
exports.onBattleCry = function (playOption, card, controller, state) {
    Rune.executeRune(DamageRune.CreateRune(card["cardGuid"], playOption["target"], exports.STORMPIKE_COMMANDO_DAMAGE_AMOUNT, state));
}

exports.generateOptions = function(card, controller, state)
{
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

exports.canPlay = cardFunctions.basicCanPlay

exports.attack = cardFunctions.basicAttack;

exports.canAttack = cardFunctions.basicCanAttack;

exports.takeDamage = cardFunctions.baseTakeDamage;

exports.isAlive = cardFunctions.baseIsAlive;