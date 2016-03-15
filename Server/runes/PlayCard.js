var server = require('../server');

exports.execute = function (rune, state) {
     var controller = state.controllers[rune.controllerGuid];
     
}

exports.canSee = function (rune, controller, state) {
    return rune.controllerGuid == controller.guid;
}