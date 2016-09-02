var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags');
var Rune = require('../../RuneVM');
var DamageRune = require('../../runes/damageRune');
var Options = require('../../createOptions')
var AddEnchatments = require("../../runes/AddEnchantment");

//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cost": 3,
  "baseAttack": 2,
  "baseHealth": 2,
  "set":cardTags.BASIC,
  "id":"shatteredSunCleric",
  "tags":{
      [cardTags.BATTLE_CRY]:true,
      [cardTags.TARGET]:true
  }
}
//END_OF_CARD_DATA

exports.SUN_CLERIC_ATTACK_BUFF_AMOUNT = 1;
exports.SUN_CLERIC_HEALTH_BUFF_AMOUNT = 1;


exports.castEnchantments = function(rune, state)
{
    RuneVM.executeRune(SetHealth.CreateRune(rune["target"]["cardGuid"], exports.SUN_CLERIC_HEALTH_BUFF_AMOUNT), state);
    RuneVM.executeRune(ModifyHealth.CreateRune(rune["target"]["cardGuid"], rune["source"]["cardGuid"], exports.SUN_CLERIC_HEALTH_BUFF_AMOUNT), state);

    RuneVM.executeRune(SetAttack.CreateRune(rune["target"]["cardGuid"], exports.SUN_CLERIC_ATTACK_BUFF_AMOUNT), state);
    RuneVM.executeRune(ModifyAttack.CreateRune(rune["target"]["cardGuid"], rune["source"]["cardGuid"], exports.SUN_CLERIC_ATTACK_BUFF_AMOUNT), state);

}

exports.removeEnchantments = function(card, state)
{ 
    RuneVM.executeRune(SetHealth.CreateRune(rune["target"]["cardGuid"], -exports.SUN_CLERIC_HEALTH_BUFF_AMOUNT), state);
    RuneVM.executeRune(SetAttack.CreateRune(rune["target"]["cardGuid"], -exports.SUN_CLERIC_ATTACK_BUFF_AMOUNT), state);
}

//On Battle cry Novice engineer should deal the playing character a card
exports.onBattleCry = function (playOption, card, controller, state) {
    Rune.executeRune(AddEnchatments.CreateRune(playOption["target"], card["cardGuid"]), state);
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