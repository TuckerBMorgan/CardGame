var entity = require('../entityManager');

exports.execute = function (rune, state) {
    var controller = state.controllers[rune.controller];
    var ent = entity.getEntity(rune.cardGuid);
    
    var file = require('../cards/'  + ent.set + "/" + ent.id);
    file.onGraveyard(ent, controller, state);
            
    var index = controller.inPlay.indexOf(ent);
    controller.graveyard.push(controller.inPlay.splice(index, 1)[0]);
}

exports.canSee = function (rune, controller, state) {
    return true;
}