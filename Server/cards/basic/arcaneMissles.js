var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var spellConts = require('../spellConstants')
var Rune = require('../../RuneVM')

exports.ARCANCE_MISSLE_DAMAGE_AMOUNT = 1;

exports.card = {
  "type": ent.SPELL,
  "cost": 1,
    //A short note about IDS, THEY CANNOT CHANGE unless all files that use it change as a well, they are the only way to go from an instance of a entity to the file that they use
  "id":"arcaneMissles",
  "set":"basic",
  "tags":[],
  "onGraveyard":cardFunctions.basicOnGraveyard,
  "onPlay":cardFunctions.basicOnPlay,
  "canPlay":cardFunctions.basicCanPlay,
  "spellText":function (rune, card, controller, state) {
    
        var enemyInPlay = ent.getEnemyMinions(controller, state);
        var enemyController = ent.getOtherController(controller, state);

        console.log(enemyController.toString());

        if(enemyInPlay == null)
            return;
   
        var targets = [];
        
        enemyInPlay.forEach(function(element){
            targets.push(element.cardGuid);
        })
        targets.push(enemyController.guid);

        for(var i = 0;i<3;i++)
        {
            var index =  Math.floor(Math.random( ) * targets.length);
            
       
            var dmg = {
                "runeType":"DamageRune",
                "source":card.cardGuid,
                "target":targets[index],
                "amount":exports.ARCANCE_MISSLE_DAMAGE_AMOUNT
            }
            Rune.executeRune(dmg);
   
        }
    },
    "generatePlayOptions":function (card, controller, state) {
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
}
