var cardFunctions = require('./cardFunctions')
var ent = require('../entityManager');
var spellConts = require('./spellConstants')
var rune = require('../RuneVM');

exports.ARCANCE_MISSLE_DAMAGE_AMOUNT = 1;

exports.card = {
  "type": ent.SPELL,
  "cardName": "testspell",
  "desc": "desc",
  "art": "test",
  "cost": 1,
    //A short note about IDS, THEY CANNOT CHANGE unless all files that use it change as a well, they are the only way to go from an instance of a entity to the file that they use
  "id":"testspell",
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
    var targets = [];
    
    for(var i = 0;i<3;i++)
    {
       var index =  Math.floor(Math.random(0, enemyInPlay.length));
       targets.push(enemyInPlay[index]);
    }
    
    targets.forEach(function (element) {
        var dmg = {
            "runeType":"damageRune",
            "source":card.cardGuid,
            "target":element.cardGuid,
            "amount":exports.ARCANCE_MISSLE_DAMAGE_AMOUNT
        }
        rune.executeRune(dmg, state);
    })
}

exports.generatePlayOptions = function (card, controller, state) {
    if(controller.mana >= card.cost){
        var options = [];
        var playOptions = {
            "option":"playSpell",
            "cardGuid":card.cardGuid,
            "targetGuid":spellConts.NO_TARGET
        }
        options.push(playOptions);
        return options;
    }
}