var entities = require('../entityManager');


exports.execute = function(rune, state) {
        var card = entities.getEntity(rune["cardGuid"], state);
        var amount = rune["amount"];
        card["totalAttack"] += amount;
}

exports.CreateCard = function(cardGuid, amount)
{
    var rune = {
        "runeType":"SetAttack",
        "cardGuid":cardGuid,
        "amount":amount
    }
    
    return rune;
}

exports.canSee = function (params) {
    return true;
} 