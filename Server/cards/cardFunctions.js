var entitites = require('../entityManager');
var rune = require('../RuneVM');
var tags = require('./cardTags');

exports.basicCanPlay = function (card, controller, state) {  
    if(card.cost <= state.controllers[controller].mana)
    {
        return true;
    }
    return false;
}

//Why must evertyhing BREAK EVERYTHING
//maybe can have specials call basicCanAttackAsWell
//but this isnt good, and I dont like it, at allllllll, this has to be better
exports.basicCanAttack = function(card, target, controller, state)
{
    var ent = entitites.getEntity(card);
    
    if(state.attackedThisTurn.indexOf(card) != -1)
    {
        if(ent.tags.indexOf(tags.WINDFURY) != -1)
        {
           var count = 0;
           for(var i = 0;i<state.attackedThisTurn;i++)
           {
               if(card === state.attackedThisTurn[i])
               {
                   count++;
               }
           }
           if(count >= 2)
           {
              return false;
           }
        }
        else
        {
            return false;
        }
    }
    if(ent.tags.indexOf(tags.SUMMONING_SICKNESS) != -1)
    {
        return false;
    }
    if(ent.baseAttack <= 0)
    {
        return false;
    }
    return true;
}

exports.basicAttack = function (card, target, controller, state) {
    var enCard = entitites.getEntity(card);
    var damage = enCard.baseAttack;
    
    var attackRune = {
        "runeType":"Attack",
        "source":card,
        "target":target
    }
    rune.executeRune(attackRune, state);
}

exports.baseTakeDamage  = function (card, amount, source, state){
    var ent = entitites.getEntity(card);
    ent.baseHealth -= amount;
}