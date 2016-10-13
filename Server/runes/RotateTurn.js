var options = require('../createOptions');
var controllerRune = require('./NewController');
var server = require('../server');
var Rune = require('../RuneVM');
var ai = require("../aicontroller");
var control = require('../control');
var tags = require('../cards/cardTags');
var util = require('../util');
var DealCard = require('./DealCard');
var SetMana = require('./SetMana');
var RemoveTag = require('./RemoveTag');

exports.execute = function (rune, state) {
    var length = state.OnTurnPlayer;
    
    var nextIndex = (state.OnTurnPlayer + 1) % state.turnOrder.length;
    
    
    
    //Handle the first RotateTurnRun because of setting OnTurnPlayer to -1
    if(length == -1)
    {
        length = 0;
    }

    //remove frozen tags from cards
    var frozen = state["turnOrder"][length].inPlay.filter(function(element){
        return element["tags"][tags.FROZEN] != undefined;
    })

    var frozen = state["turnOrder"][length].inPlay.filter(function(element){
        return element["tags"][tags.SUMMONING_SICKNESS] != undefined;
    })

    frozen = frozen.filter(function(element){
        var passed = true;
        state["attackedThisTurn"].forEach(function(innerElement){
            if(element["cardGuid"] == innerElement)
            {
                passed = false;
            }
        })
        return passed;
    })

    var removeFrozen = [];
    frozen.forEach(function(element){
        removeFrozen.push(RemoveTag.CreateRune("-1", element["cardGuid"], tags.FROZEN));
    })

    removeFrozen.forEach(function(element){
        Rune.executeRune(element, state);
    })
    //end of remove frozen tags     


    //Remove SUMMONING_SICKNESS from cards that have it
    var removeTagsRunes = [];

    state.turnOrder[length].inPlay.forEach(function (element) {
        removeTagsRunes.push(RemoveTag.CreateRune("-1", element.cardGuid, tags.SUMMONING_SICKNESS));
    });
    
    removeTagsRunes.forEach(function(element){
        Rune.executeRune(element, state);
    })
    //end of SUMMONING_SICKNESS tags

    state.turnOrder[length].state = controllerRune.WAITING_FOR_TURN;

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