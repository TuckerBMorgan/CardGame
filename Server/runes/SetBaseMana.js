exports.execute = function (rune, state) {
    var controller = state.controllers[rune.controllerGuid];
    controller.baseMana = rune.baseMana;
}

exports.CreateRune = function(controllerGuid, baseMana)
{
    var rune = {
        "runeType":"SetBaseMana",
        "controllerGuid":controllerGuid,
        "baseMana":baseMana
    }
    return rune;
}

exports.canSee = function (rune, controller, state) {
    return true;
}