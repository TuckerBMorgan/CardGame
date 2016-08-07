var entity = require('../entityManager');
var cardTags = require('../cards/cardTags');

exports.execute = function (rune, state) {
    var controller = state.controllers[rune.controller];
    var ent = entity.getEntity(rune.cardGuid, state);
    
    if(ent.tags.hasOwnProperty(cardTags.DEATH_RATTLE))
    {
        var file = require('../cards/'  + ent.set + "/" + ent.id);
        file.onGraveyard(ent, controller, state);
    }       
    var index = controller.inPlay.indexOf(ent);
    controller.graveyard.push(controller.inPlay.splice(index, 1)[0]);
    ent.state = "Dead";
}

exports.canSee = function (rune, controller, state) {
    return true;
}