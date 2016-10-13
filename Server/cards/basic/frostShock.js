var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var spellConts = require('../spellConstants');
var Rune = require('../../RuneVM');
var cardTags = require("../cardTags");
var AddTag = require("../../runes/AddTag");
var ModifyHealth = require('../../runes/ModifyHealth');
var DamageRune = require('../../runes/DamageRune');

exports.FROST_SHOCK_DAMAGE_AMOUNT = 1;

exports.card = {
  "type": ent.SPELL,
  "cost": 0,
    //A short note about IDS, THEY CANNOT CHANGE unless all files that use it change as a well, they are the only way to go from an instance of a entity to the file that they use
  "id":"frostShock",
  "set":cardTags.BASIC,
  "tags":[],
  "onGraveyard":cardFunctions.basicOnGraveyard,
  "onPlay":cardFunctions.basicOnPlay,
  "canPlay":cardFunctions.basicCanPlay,
  "spellText":function (rune, controller, state) {
        var addTag = AddTag.CreateRune(rune["option"]["source"], rune["option"]["target"], cardTags.FROZEN);
        var card = ent.getEntity(rune["option"]["target"]);
        Rune.executeRune(DamageRune.CreateRune(rune["option"]["cardGuid"], rune["option"]["targetGuid"], exports.FROST_SHOCK_DAMAGE_AMOUNT), state);    
        Rune.executeRune(addTag,state);
    },
    "generatePlayOptions":function (card, controller, state) {
        if(controller.mana >= card.cost){
            var options = [];
            var targets = ent.returnAllAliveAndOnOtherTeam(card.team, state);
            targets.forEach(function(element){
                var playOptions = {
                    "option":"PlaySpell",
                    "cardGuid":card.cardGuid,
                    "targetGuid":element.cardGuid
                }
                options.push(playOptions);
            });
            return options;
        }
    }
}
