var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags');
var Rune = require('../../RuneVM');
var DamageRune = require('../../runes/DamageRune');
var Options = require('../../createOptions')
var AddEnchantments = require("../../runes/AddEnchantment");
var RuneVM = require("../../RuneVM");

var ModifyAttack = require('../../runes/ModifyAttack');
var ModifyHealth = require('../../runes/ModifyHealth');

var SetHealth = require('../../runes/SetHealth');
var SetAttack = require('../../runes/SetAttack');


exports.SUN_CLERIC_ATTACK_BUFF_AMOUNT = 1;
exports.SUN_CLERIC_HEALTH_BUFF_AMOUNT = 1;

//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cost": 0,
  "baseAttack": 2,
  "baseHealth": 2,
  "set":cardTags.BASIC,
  "id":"shatteredSunCleric",
  "tags":{
      [cardTags.BATTLE_CRY]:true,
      [cardTags.TARGET]:true
  },
  "canPlay":cardFunctions.basicCanPlay,
  "attack":cardFunctions.basicAttack,
  "canAttack":cardFunctions.basicCanAttack,
  "isAlive":cardFunctions.baseIsAlive,
  "takeDamage":cardFunctions.basicTakeDamage,
  "AddEnchantments":function(rune, state){
        RuneVM.executeRune(SetHealth.CreateRune(rune["target"], exports.SUN_CLERIC_HEALTH_BUFF_AMOUNT), state);
        RuneVM.executeRune(ModifyHealth.CreateRune(rune["target"], rune["source"], exports.SUN_CLERIC_HEALTH_BUFF_AMOUNT), state);

        RuneVM.executeRune(SetAttack.CreateRune(rune["target"], exports.SUN_CLERIC_ATTACK_BUFF_AMOUNT), state);
        RuneVM.executeRune(ModifyAttack.CreateRune(rune["target"], rune["source"], exports.SUN_CLERIC_ATTACK_BUFF_AMOUNT), state);
    },
    "removeEnchantments":function(card, state){ 
        RuneVM.executeRune(SetHealth.CreateRune(card["cardGuid"], -exports.SUN_CLERIC_HEALTH_BUFF_AMOUNT), state);
        RuneVM.executeRune(SetAttack.CreateRune(card["cardGuid"], -exports.SUN_CLERIC_ATTACK_BUFF_AMOUNT), state);
    },  
    "onBattleCry":function (playOption, card, controller, state) {

        var enchatmentObject = {
            "source":card["cardGuid"],
            "target":playOption["target"],
            "stillActive":function(entObject, target){
                console.log(target);
                if(target["tags"].hasOwnProperty(cardTags.SILENCE) != -1)
                {
                    return false;
                }
                return true;
            },
            "RemoveEnchantment":exports.card.removeEnchantments,
            "AddEnchantment":exports.card.AddEnchantments
        }
        state["spellEnchantments"][card["cardGuid"]] = enchatmentObject;
        Rune.executeRune(AddEnchantments.CreateRune(playOption["target"], card["cardGuid"]), state);
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