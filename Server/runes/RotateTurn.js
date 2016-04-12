var options = require('../createOptions');
var controllerRune = require('./NewController');
var server = require('../server');
var Rune = require('../RuneVM');
var ai = require("../aicontroller");
var control = require('../control');

exports.execute = function (rune, state) {
    var length = state.OnTurnPlayer;
    var nextIndex = (state.OnTurnPlayer + 1) % state.turnOrder.length;
    
    //Handle the first RotateTurnRun because of setting OnTurnPlayer to -1
    if(length == -1)
    {
        length = 0;
    }
    state.turnOrder[length].state = controllerRune.WAITING_FOR_TURN;
    var setBaseMana = {
        "runeType":"SetBaseMana",
        "controllerGuid":state.turnOrder[nextIndex].guid,
        "baseMana":state.turnOrder[nextIndex].baseMana + 1
    }
    
    Rune.executeRune(setBaseMana, state);
    
    var setMana = {
        "runeType":"SetMana",
        "controllerGuid":state.turnOrder[nextIndex].guid,
        "mana":state.turnOrder[nextIndex].baseMana
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
    else
    {
       var index =  ai.calculateMove(state.turnOrder[nextIndex], characterOptions, state);
       console.log(index);
       control.executeOptions(index, state.turnOrder[nextIndex], state);
    }
}

exports.canSee = function (rune, controller, state) {
    return true;
}