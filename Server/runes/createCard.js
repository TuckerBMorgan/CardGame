var fs = require('fs'); 

//contents of rune
//"guid":"foo"
//"cardId":"cardID"
exports.execute = function (rune, state) {       
    state.controllers[rune.controllerGuid].deck.push(rune);
    
}

exports.canSee = function (rune, controller, state) {
    return false;
}