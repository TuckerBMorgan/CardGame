var entities = require('../entityManager')
var cardTags = require('../cards/cardTags')

exports.execute = function (rune, state) {
    //this will need to be a better function later one
    var ent = entities.getEntity(rune.target, state);

    ent["enchatments"].forEach(function(element){
        var sourceEnt = entities.getEntity(element, state);
        sourceEnt.removeEnchatments(ent, state);
    });

}

exports.CreateRune = function (target, source) {
    var rune = {
        "runeType":"silence",
        "target":target,
        "source":source
    }
    return rune;
}

exports.canSee = function (rune, controller, state) {
    return true;
}