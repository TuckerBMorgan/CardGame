exports.execute = function(rune, state)
{
    var controller = state.controllers[rune.controllerGuid];
    controller.mana = rune.mana;
}

exports.CreateRune = function(controllerGuid, mana)
{
    var rune = {
        "runeType":"SetMana",
        "controllerGuid":controllerGuid,
        "mana":mana
    }
    
    return rune;
}

exports.canSee = function(rune, controller, state)
{
    return true;
}