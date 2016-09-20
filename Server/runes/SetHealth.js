var entities = require('../entityManager');


exports.execute = function(rune, state) {
        var card = entities.getEntity(rune["cardGuid"], state);
        var amount = rune["amount"];
        card["totalHealth"] = amount;
        if(card["currentHealth"] > card["totalHealth"])
        {
            card["currentHealth"] = card["totalHealth"];
        }
}

exports.CreateRune = function(cardGuid, amount)
{
    var rune = {
        "runeType":"SetHealth",
        "cardGuid":cardGuid,
        "amount":amount
    }
    
    return rune;
}

exports.canSee = function (params) {
    return true;
}