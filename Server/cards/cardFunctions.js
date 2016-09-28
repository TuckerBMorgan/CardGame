var entitites = require('../entityManager');
var rune = require('../RuneVM');
var tags = require('./cardTags');



//these three are used for any card that needs to listen into events, and remove those effects, as in basicOnGraveyard
//For many cards they will do nothing
exports.basicOnDeal = function (card, controller, state) {
    //does nothing
}

exports.basicOnPlay = function (card, controller, state) {
    //nothing   
}

exports.basicOnGraveyard = function (card, controller, state) {
    //nothing
}

exports.basicCanPlay = function (card, controller, state) {  
    if(card.cost <= controller.mana)
    {
        return true;
    }
    return false;
}

exports.baseIsAlive = function (card, controller, state) {
    return card.currentHealth > 0;
}

//Why must evertyhing BREAK EVERYTHING
//maybe can have specials call basicCanAttackAsWell
//but this isnt good, and I dont like it, at allllllll, this has to be better
exports.basicCanAttack = function(card, target, controller, state)
{
    console.log("SDF------------");
    if(state.attackedThisTurn.indexOf(card.cardGuid) != -1)
    {
        if(card.tags.hasOwnProperty(tags.WINDFURY))
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
    if(card.tags.hasOwnProperty(tags.SUMMONING_SICKNESS))
    {
        console.log("SDF_0");
        return false;
    }
    if(card.baseAttack <= 0)
    {
        console.log("SDF");
        return false;
    }
    return true;
}

exports.basicAttack = function (card, target, controller, state) {
    
    var attackRune = {
        "runeType":"Attack",
        "source":card.cardGuid,
        "target":target
    }
    rune.executeRune(attackRune, state);
}

exports.baseTakeDamage  = function (card, amount, source, state){
    card.currentHealth += amount;
}