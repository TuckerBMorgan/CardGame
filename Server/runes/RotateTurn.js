var options = require('../createOptions');
var controllerRune = require('./NewController');
var server = require('../server');
var Rune = require('../RuneVM');
var ai = require("../aicontroller");
var control = require('../control');
var tags = require('../cards/cardTags');
var util = require('../util');

exports.execute = function (rune, state) {
    var length = state.OnTurnPlayer;
    
    var nextIndex = (state.OnTurnPlayer + 1) % state.turnOrder.length;
    
    
    
    //Handle the first RotateTurnRun because of setting OnTurnPlayer to -1
    if(length == -1)
    {
        length = 0;
    }
    
    state.turnOrder[length].state = controllerRune.WAITING_FOR_TURN;
    state.turnOrder[length].inPlay.forEach(function (element) {
        element.tags.splice(tags.SUMMONING_SICKNESS); 
    });
    var newManaLevel = state.turnOrder[nextIndex].baseMana + 1;
    
    state.attackedThisTurn = [];
    
    var setBaseMana = {
        "runeType":"SetBaseMana",
        "controllerGuid":state.turnOrder[nextIndex].guid,
        "baseMana":newManaLevel
    }
    
    Rune.executeRune(setBaseMana, state );
    
    var setMana = {
        "runeType":"SetMana",
        "controllerGuid":state.turnOrder[nextIndex].guid,
        "mana":newManaLevel
    }
    state.OnTurnPlayer = nextIndex;
    
    
    Rune.executeRune(setMana, state);
    
    var car = util.dealCard(state.turnOrder[nextIndex].deck);
    console.log(car);
    var dealcard = {
        "runeType":"DealCard",
        "controllerGuid":state.turnOrder[nextIndex].guid,
        "cardGuid":car
    }
    Rune.executeRune(dealcard, state);
}

exports.canSee = function (rune, controller, state) {
    return true;
}