var entities = require('../entityManager');
var Rune = require('../RuneVM')



exports.execute = function (rune, state) {
     var ent = entities.getEnemyMinions(rune["targetGuid"]);
     ent.tags[rune.tag] = true;
}

exports.CreateRune = function (sourceGuid, targetGuid, tag)
{
    var rune = {
        "runeType":"AddTag",
        "source":sourceGuid,
        "target":targetGuid,
        "tag":tag,
        "ai_proto": false
    }
    return rune;
}

exports.canSee = function (rune, controller, state) {
    return true;
}