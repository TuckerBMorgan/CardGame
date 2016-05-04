var entities = require('../entityManager');

exports.execute = function (rune, state) {
    var ent = entities.getEntity(rune.cardGuid);
    var controller  = entities.getEntity(rune.controllerGuid);
    
    
    
    require('../cards/' + ent.id).spellText(rune, ent, controller, state);
}

execute.canSee = function(rune, controller, state) {
    return true;
}