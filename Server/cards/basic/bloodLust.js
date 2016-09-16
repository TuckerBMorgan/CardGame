var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var spellConts = require('../spellConstants');
var Rune = require('../../RuneVM');
var cardTags = require("../cardTags");

var AddEnchantments = require("../../runes/AddEnchantment");
var ModifyAttack = require('../../runes/ModifyAttack');
var SetAttack = require('../../runes/SetAttack');

exports.BLOOD_LUST_ATTACK_BUFF = 3;

exports.card = {
  "type": ent.SPELL,
  "cost": 0,
    //A short note about IDS, THEY CANNOT CHANGE unless all files that use it change as a well, they are the only way to go from an instance of a entity to the file that they use
  "id":"bloodLust",
  "set":cardTags.BASIC,
  "tags":[],
  "onGraveyard":cardFunctions.basicOnGraveyard,
  "onPlay":cardFunctions.basicOnPlay,
  "canPlay":cardFunctions.basicCanPlay,
  "AddEnchantments":function(rune, state){
        Rune.executeRune(SetAttack.CreateRune(rune["target"], exports.BLOOD_LUST_ATTACK_BUFF), state);
        Rune.executeRune(ModifyAttack.CreateRune(rune["target"], rune["source"], exports.BLOOD_LUST_ATTACK_BUFF), state);
  },
  "RemoveEnchantments":function(card, state){
     Rune.executeRune(SetAttack.CreateRune(rune["target"], -exports.BLOOD_LUST_ATTACK_BUFF), state);
  },
  "spellText":function (rune, entity, controller, state) {
      var enchantmentObject = {
          "source":rune["cardGuid"],
          "turnHasPassed":false,
          "stillActive":function(entObject, target){
            if(turnHasPassed)
            {
                return false;
            }
            return !target["tags"].hasOwnProprety(cardTags.SILENCE);
          },
         "RotateTurnListener":function(rune, object, state){
            object.turnHasPassed = false;
          }
      }
      Rune.addListenerPre(enchantmentObject, "RotateTurn", state);
      state["spellEnchantments"][rune["cardGuid"]] = enchantmentObject;
      var allMinionsOnMySide = ent.returnAllAliveAndOnTeam(controller["team"], state)
      allMinionsOnMySide.forEach(function(element){
            Rune.executeRune(AddEnchantments.CreateRune(rune["option"]["target"],rune["playOptions"]["source"]), state);
      })
  },
  "generatePlayOptions":function (card, controller, state) {
        var options =  [];
        if(controller.mana >= card.cost){
                var playOptions = {
                    "option":"PlaySpell",
                    "cardGuid":card.cardGuid,
                    "targetGuid":"-1"
                }
                options.push(playOptions);
            return options;
        }
        return null;
    }
}