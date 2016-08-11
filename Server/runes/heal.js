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

exports.CreateCard = function (controllerGuid, cardGuid, amount) {
    var rune = {
        "runeType":"heal",
        "controllerGuid":controllerGuid,
        "cardGuid":cardGuid,
        "amount":amount
    }
    return rune;
}

exports.canSee = function (rune, controller, state) {
    return true;
} 