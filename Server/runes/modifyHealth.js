var entities = require('../entityManager')

exports.execute = function (rune, state) {
    //this will need to be a better function later on
    var ent = entities.getEntity(rune.target, state);
    if(rune.amount < 0)
    {
        require('../cards/' + ent.set  + "/" + ent.id).takeDamage(ent, rune.amount, entities.getEntity(rune.source, state));
    }
    else
    {
        //I might want this to be a function like the one above, just not sure at the moment really
        ent.currentHealth += rune.amount;
    }
}

exports.canSee = function (rune, controller, state) {
    return true;
}