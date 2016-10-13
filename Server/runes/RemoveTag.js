var entities = require('../entityManager');
var Rune = require('../RuneVM')

exports.execute = function (rune, state) {
     var ent = entities.getEnemyMinions(rune["targetGuid"]);
     delete ent.tags[rune.tag];
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