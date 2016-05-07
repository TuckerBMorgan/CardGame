var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var spellConts = require('../spellConstants')
var Rune = require('../../RuneVM')

exports.ARCANCE_MISSLE_DAMAGE_AMOUNT = 1;

exports.card = {
  "type": ent.SPELL,
  "cardName": "testspell",
  "desc": "desc",
  "art": "test",
  "cost": 1,
    //A short note about IDS, THEY CANNOT CHANGE unless all files that use it change as a well, they are the only way to go from an instance of a entity to the file that they use
  "id":"testspell",
  "set":"test",
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
exports.spellText = function (rune, card, controller, state) {
    
    var enemyInPlay = ent.getEnemyMinions(controller, state);

    if(enemyInPlay == null)
        return;
   
    var targets = [];
    
    for(var i = 0;i<Math.min(3, enemyInPlay.length);i++)
    {
       var index =  Math.floor(Math.random( ) * enemyInPlay.length);
       if(enemyInPlay[index].baseHealth <= 0)
       {
            continue;     
       }
       
        var dmg = {
            "runeType":"DamageRune",
            "source":card.cardGuid,
            "target":enemyInPlay[index].cardGuid,
            "amount":exports.ARCANCE_MISSLE_DAMAGE_AMOUNT
        }
        Rune.executeRune(dmg);
   
    }
}

exports.generatePlayOptions = function (card, controller, state) {
    if(controller.mana >= card.cost){
        var options = [];
        var playOptions = {
            "option":"PlaySpell",
            "cardGuid":card.cardGuid,
            "targetGuid":spellConts.NO_TARGET.toString()
        }
        options.push(playOptions);
        return options;
    }
}