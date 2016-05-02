exports.execute = function (rune, state) {
    var controller = state.controllers[rune.controller];
    
    controller.inPlay.some(function (element, index) {
        if(element.cardGuid == rune.cardGuid)
        {
            controller.splice(index, 1);
            return true;
        }
        return false;
    })
}

exports.canSee = function (rune, controller, state) {
    return true;
}