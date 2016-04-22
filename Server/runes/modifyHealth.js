var entities = require('../entityManager')

exports.execute = function (rune, state) {
    //this will need to be a better function later on
    var ent = entities.getEntity(rune.source);
    require('../cards/' + ent.id).takeDamage(rune.source, rune.amount, rune.source);
    
}

exports.canSee = function (rune, controller, state) {
    return true;
}