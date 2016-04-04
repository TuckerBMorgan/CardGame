var options = require('../createOptions');
var controllerRune = require('./NewController');
var server = require('../server');
var Rune = require('../RuneVM');

exports.execute = function (rune, state) {
    var length = state.OnTurnPlayer;
    state.turnOrder[length].state = controllerRune.WAITING_FOR_TURN;
    var nextIndex = (state.OnTurnPlayer + 1) % state.turnOrder.length;
    
    var setMana = {
        "runeType":"SetMana",
        "controllerGuid":state.turnOrder[nextIndex].guid,
        "mana":state.turnOrder[nextIndex].mana + 1
    }
    
    Rune.executeRune(setMana, state);
    
    var characterOptions = options.createOptions(state.turnOrder[nextIndex].guid, state);
    state.OnTurnPlayer++;
    state.turnOrder[nextIndex].options = characterOptions;
    state.turnOrder[nextIndex].state = controllerRune.IN_TURN;
    
    
    
    var optionsPack = {
        "runeType":"optionRune",
        "options":characterOptions
    }
    if(state.turnOrder[nextIndex].type == "PlayerController")
    {
        server.sendMessage(JSON.stringify(optionsPack), state.turnOrder[nextIndex].socket);
    }
}

exports.canSee = function (rune, controller, state) {
    return true;
}