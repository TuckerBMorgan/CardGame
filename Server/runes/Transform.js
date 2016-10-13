var entities = require('../entityManager');
var summon = require('./SummonMinion');
var Rune = require('../RuneVM')


exports.execute = function(rune, state) {
    var index = -1;
    var target = entities.getEntity(rune["targetGuid"], state);
    var targetController = entities.getControllerFromTeam(target["team"]);
    var index = targetController["inPlay"].indexof(target);
    var transformedGuy = targetController["inPlay"].splice(index, 1)[0];
    

    var sum = summon.CreateRune(targetController, rune["sourceGuid"], rune["newGuid"], rune["id"], index);
    Rune.executeRune(sum, state);

}

exports.CreateRune = function(sourceGuid, targetGuid, newGuid, id)
{
    var rune = {
        "runeType":"Transform",
        "sourceGuid":sourceGuid,
        "targetGuid":targetGuid,
        "newGuid":newGuid,
        "id":id
    }

    return rune;
}

exports.canSee = function (params) {
    return true;
}