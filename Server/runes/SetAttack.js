var entities = require('../entityManager');


exports.execute = function(rune, state) {
        var card = entities.getEntity(rune["cardGuid"], state);
        var amount = rune["amount"];
        card["totalAttack"] = amount;
}

exports.CreateRune = function(targetGuid, amount)
{
    var rune = {
        "runeType":"SetAttack",
        "cardGuid":targetGuid,
        "amount":amount
    }
    
    return rune;
}

exports.canSee = function (params) {
    return true;
}