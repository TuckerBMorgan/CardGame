var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var spellConts = require('../spellConstants');
var Rune = require('../../RuneVM');
var cardTags = require("../cardTags");
var AddTag = require("../../runes/AddTag");
var ModifyHealth = require('../../runes/ModifyHealth');

exports.card = {
  "type": ent.SPELL,
  "cost": 0,
    //A short note about IDS, THEY CANNOT CHANGE unless all files that use it change as a well, they are the only way to go from an instance of a entity to the file that they use
  "id":"ancestralHealing",
  "set":cardTags.BASIC,
  "tags":[]
}


exports.onGraveyard = cardFunctions.basicOnGraveyard;

//does a spell need this
exports.onPlay = cardFunctions.basicOnPlay;

//Could see very few or none spells needing this
exports.onDeal = cardFunctions.basicOnDeal;

//Does need this
exports.canPlay = cardFunctions.basicCanPlay

//this is the meat of the card
exports.spellText = function (rune, controller, state) {
    
    var addTag = AddTag.CreateRune(rune["option"]["source"], rune["option"]["target"], cardTags.TAUNT);
    var card = ent.getEntity(rune["option"]["target"]);
    var healthRune = ModifyHealth.CreateRune(card.cardGuid, rune["option"]["source"], card.totalHealth - card.currentHealth);

    Rune.executeRune(healthRune, state);
    Rune.executeRune(addTag,state);


}

exports.RotateTurnListener = function(rune, entity, state)
{
    var getAllOnMySide = ent.returnAllAliveAndOnTeam(entity.team, state);


}

exports.generatePlayOptions = function (card, controller, state) {
    if(controller.mana >= card.cost){
        var options = [];
        var playOptions = {
                "option":"PlaySpell",
                "cardGuid":card.cardGuid,
                "targetGuid":-1
            }
        return options;
    }
}