var entities = require('../entityManager');
var Rune = require('../RuneVM')



exports.execute = function (rune, state) {
     var ent = entities.getEntity(rune["target"], state);
     ent.tags[rune.tag] = true;
}

exports.CreateRune = function (sourceGuid, targetGuid, tag)
{
    var rune = {
        "runeType":"AddTag",
        "source":sourceGuid,
        "target":targetGuid,
        "tag":tag
    }
    return rune;
}

exports.canSee = function (rune, controller, state) {
    return true;
}