var rune = require("../RuneVM");

exports.executeRune = function (rune, state) {
    var modifyHealth = {
        "runeType":"ModifyHealth",
        "source":rune.controllerGuid,
        "target":rune.cardGuid,
        "amount":rune.amount,
        "ai_proto": rune["ai_proto"]
    }
    
    rune.executeRune(modifyHealth, state);
    
}

exports.CreateRune = function (controllerGuid, cardGuid, amount) {
    var rune = {
        "runeType":"heal",
        "controllerGuid":controllerGuid,
        "cardGuid":cardGuid,
        "amount":amount,
        "ai_proto": false
    }
    return rune;
}

exports.canSee = function (rune, controller, state) {
    return true;
} 