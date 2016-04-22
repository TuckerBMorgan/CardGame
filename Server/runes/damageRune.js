var Rune = require('../RuneVM');

exports.execute = function (rune, state) {
    var modifyHealth = {
        "runeType":"ModifyHealth",
        "source":rune.source,
        "target":rune.target,
        "amount":rune.amount
    }
    
    Rune.executeRune(modifyHealth, state);
}

exports.canSee = function (rune, controller, state) {
    return true;
}