var entities = require('../entityManager')
var cardTags = require('../cards/cardTags')

exports.execute = function (rune, state) {
    //this will need to be a better function later one
    var ent = entities.getEntity(rune.target, state);
    var castingCard = entities.getEntity(rune.source, state);

    var entObject = state["spellEnchantments"][rune.source];
    entObject.AddEnchantment(rune, state);

    console.log("\n\n" + rune.target + "\n\n");

    ent["enchantments"].push(rune.source);
}

exports.CreateRune = function (target, source) {
    var rune = {
        "runeType":"AddEnchantment",
        "target":target,
        "source":source
    }
    return rune;
}

exports.canSee = function (rune, controller, state) {
    return true;
}