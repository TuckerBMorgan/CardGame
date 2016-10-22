var entity = require('../entityManager');
var cardTags = require('../cards/cardTags');

exports.execute = function (rune, state) {
    var controller = state.controllers[rune.controller];
    var ent = entity.getEntity(rune.cardGuid, state);
    
    if(ent.tags.hasOwnProperty(cardTags.DEATH_RATTLE))
    {
        ent.onGraveyard(ent, controller, state);
    }       
    var index = controller.inPlay.indexOf(ent);
    controller.graveyard.push(controller.inPlay.splice(index, 1)[0]);
    ent.state = "Dead";
}

exports.CreateRune = function (controller, cardGuid) {
    var rune = {
        "runeType":"killMinion",
        "controller":controller,
        "cardGuid":cardGuid
    }
    return rune;
}

exports.canSee = function (rune, controller, state) {
    return true;
}