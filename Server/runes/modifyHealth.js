var entities = require('../entityManager')
var cardTags = require('../cards/cardTags')

exports.execute = function (rune, state) {
    //this will need to be a better function later one
    
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
            if(en.currentHealth + rune.amount <= ent.totalhealth)
            {
                ent.currentHealth += rune.amount;
            }
            else if(en.currentHealth + rune.amount > ent.totalhealth)
            {
                ent.currentHealth = ent.totalhealth;
            }
        }
    }
    else if(ent.type == entities.HERO)
    {
        ent.hero.health += rune.amount;
    }
}

exports.CreateRune = function (target, source, amount) {
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