var entities = require('../entityManager')
var cardTags = require('../cards/cardTags')

exports.execute = function (rune, state) {
    //this will need to be a better function later on
    var ent = entities.getEntity(rune.target, state);
    if(ent.type == entities.MINION)
    {
        if(rune.amount < 0)
        {
            //why does this need to be a function
            //I guess BOLF?
            require('../cards/' + ent.set  + "/" + ent.id).takeDamage(ent, rune.amount, entities.getEntity(rune.source, state));
        }
        else
        {
            //I might want this to be a function like the one above, just not sure at the moment really
            ent.currentHealth += rune.amount;
        }
    }
    else if(ent.type == entities.HERO)
    {
        ent.hero.health += rune.amount;
    }
}

exports.CreateCard = function (target, source, amount) {
    var rune = {
        "runeType":"modifyHealth",
        "target":target,
        "source":source,
        "amount":amount
    }

    return rune;
}

exports.canSee = function (rune, controller, state) {
    return true;
}