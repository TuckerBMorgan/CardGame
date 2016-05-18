var rune = require("../RuneVM");

exports.executeRune = function (rune, state) {
    var modifyHealth = {
        "runeType":"ModifyHealth",
        "source":rune.controllerGuid,
        "target":rune.cardGuid,
        "amount":rune.amount
    }
    
    rune.executeRune(modifyHealth, state);
    
}

exports.canSee = function (rune, controller, state) {
    return true;
}