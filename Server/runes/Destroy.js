var entities = require('../entityManager');
var summon = require('./SummonMinion');
var Rune = require('../RuneVM')


exports.execute = function(rune, state) {
    var target = entities.getEntity(rune["targetGuid"]);
    target.state = "MarkForDestroy";
}

exports.CreateRune = function(sourceGuid, targetGuid, newGuid, id)
{
    var rune = {
        "runeType":"Transform",
        "sourceGuid":sourceGuid,
        "targetGuid":targetGuid,
        "ai_proto":false
    }

    return rune;
}

exports.canSee = function (params) {
    return true;
}