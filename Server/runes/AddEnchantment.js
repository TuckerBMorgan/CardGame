var entities = require('../entityManager')
var cardTags = require('../cards/cardTags')

exports.execute = function (rune, state) {
    //this will need to be a better function later one
    var ent = entities.getEntity(rune.target, state);
    var castingCard = entities.getEntity(rune.source, state);

    require("../cards/" + castingCard.set + "/" + castingCard.id).castEnchantment(rune, state);
    ent["enchantments"].push(rune.source);
}

exports.CreateRune = function (target, source) {
    var rune = {
        "runeType":"AddEnchatment",
        "target":target,
        "source":source
    }
    return rune;
}

exports.canSee = function (rune, controller, state) {
    return true;
}