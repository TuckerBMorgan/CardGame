exports.execute = function (rune, state) {
    var controller = state.controllers[rune.controllerGuid];
    controller.baseMana = rune.baseMana;
}

exports.canSee = function (rune, controller, state) {
    return true;
}