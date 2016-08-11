var Rune = require('../RuneVM');

exports.execute = function (rune, state) {
    var modifyHealth = {
        "runeType":"ModifyHealth",
        "source":rune.source,
        "target":rune.target,
        //we flip this around because we deal a positive amount of damage, which is a negative change in health
        "amount":(rune.amount * -1)
    }
    Rune.executeRune(modifyHealth, state);
}

exports.CreateRune = function (sourceGuid, targetGuid, amount) {
    
    var rune = {
        "runeType":"damageRune",
        "source":sourceGuid,
        "target":targetGuid,
        "amount":amount
    }
    
    return rune;
}

exports.canSee = function (rune, controller, state) {
    return true;
}