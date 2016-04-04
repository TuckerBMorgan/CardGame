

exports.execute = function(rune, state)
{
    var controller = state.controllers[rune.controllerGuid];
    controller.mana = rune.mana; 
}

exports.canSee = function(rune, controller, state)
{
    return true;
}