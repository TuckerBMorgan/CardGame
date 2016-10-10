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
  "cost": 5,
    //A short note about IDS, THEY CANNOT CHANGE unless all files that use it change as a well, they are the only way to go from an instance of a entity to the file that they use
  "id":"bloodLust",
  "set":cardTags.BASIC,
  "tags":[],
  "onGraveyard":cardFunctions.basicOnGraveyard,
  "onPlay":cardFunctions.basicOnPlay,
  "canPlay":cardFunctions.basicCanPlay,
  "AddEnchantments":function(rune, state){
        var targetEnt = ent.getEntity(rune["target"], state);
        
        Rune.executeRune(SetAttack.CreateRune(rune["target"], targetEnt["totalAttack"] + exports.BLOOD_LUST_ATTACK_BUFF), state);
        Rune.executeRune(ModifyAttack.CreateRune(rune["target"], rune["source"], exports.BLOOD_LUST_ATTACK_BUFF), state);
  },
  "RemoveEnchantments":function(card, state){
     console.log(card);
     Rune.executeRune(SetAttack.CreateRune(card["cardGuid"], card["totalAttack"] - exports.BLOOD_LUST_ATTACK_BUFF), state);
  },
  "spellText":function (rune, entity, controller, state) {
      var enchantmentObject = {
          "source":rune["cardGuid"],
          "turnHasPassed":false,
          "stillActive":function(entObject, target){
            if(entObject.turnHasPassed)
            {
                return false;
            }
            return !target["tags"].hasOwnProperty(cardTags.SILENCE);
          },
         "RotateTurnListener":function(rune, object, state){
            object.turnHasPassed = true;
            return false;
          },
          "AddEnchantment":exports.card.AddEnchantments,
          "RemoveEnchantment":exports.card.RemoveEnchantments
      }
      Rune.addListenerPre(enchantmentObject, "RotateTurn", state);
      state["spellEnchantments"][rune["option"]["cardGuid"]] = enchantmentObject;
      
      var allMinionsOnMySide = ent.returnAllAliveAndOnTeam(controller["team"], state)

      allMinionsOnMySide.forEach(function(element){
            //this is just super jank because doing something to avoid controllers
            if(element > 2)
            {
                Rune.executeRune(AddEnchantments.CreateRune(element,rune["option"]["cardGuid"]), state);
            }
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