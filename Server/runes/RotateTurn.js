var options = require('../createOptions');
var controllerRune = require('./newController');
var server = require('../server');
var Rune = require('../RuneVM');
var ai = require("../aicontroller");
var control = require('../control');
var tags = require('../cards/cardTags');
var util = require('../util');
var DealCard = require('./DealCard')
var SetMana = require('./SetMana');

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
        delete element.tags[tags.SUMMONING_SICKNESS];
    });
    
    var newManaLevel = state.turnOrder[nextIndex].baseMana + 1;
    
    state.attackedThisTurn = [];
    
    var setBaseMana = {
        "runeType":"SetBaseMana",
        "controllerGuid":state.turnOrder[nextIndex].guid,
        "baseMana":newManaLevel
    }
    
    Rune.executeRune(setBaseMana, state );
   
    state.OnTurnPlayer = nextIndex;
    
    Rune.executeRune(SetMana.CreateRune(state["turnOrder"][nextIndex]["guid"], newManaLevel),  state);
    
    var car = util.dealCard(state.turnOrder[nextIndex].deck);
    
    Rune.executeRune(DealCard.CreateRune(state["turnOrder"][nextIndex]["guid"], car), state);
}

exports.CreateRune = function()
{
    return {"runeType":"RotateTurn"};
}

exports.canSee = function (rune, controller, state) {
    return true;
}