var entities = require('../entityManager')

exports.execute = function (rune, state) {
    //this will need to be a better function later on
    var ent = entities.getEntity(rune.target);
    
    require('../cards/' + ent.set  + "/" + ent.id).takeDamage(ent, rune.amount, entities.getEntity(rune.source));
}

exports.canSee = function (rune, controller, state) {
    return true;
}