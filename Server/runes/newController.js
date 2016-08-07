var entity = require('../entityManager');
var util = require('../util');
var heroUtil = require("../heroUtil");

exports.PLAYER_CONTROLLER = "PlayerController"
exports.AI_CONTROLLER = "AiController"

//States the controller(ie: player) can be in
exports.MULLIGAN = "Mulligan";
exports.WAITING_FOR_START = "WaitingForStart";
exports.WAITING_FOR_TURN = "WaitingForTurn";
exports.IN_TURN  = "IN_TURN";

//{
//  "runeType":"NewController"
//  "name":"name"
//  "controllerType"://A Controller Type, from above
//  "guid":"guid"
//}
var teamCount = 0;
exports.execute = function(rune, state)
{   
    if(state.controllers[rune['guid']] == null)
    {
            state.controllers[rune.guid] = {
                "name":rune["name"],
                "type":rune["controllerType"],
                "deck":[],
                "hand":[],
                "inPlay":[],
                "graveyard":[],
                "guid":rune['guid'],
                "hero":heroUtil.loadHero(rune["hero"]),
                "mana":0,
                "baseMana":0,
                "team":teamCount,
                "state":exports.WAITING_FOR_START,
                "seenCards":{}
            }
        teamCount++;
        entity.addEntity(state.controllers[rune.guid], rune.guid, state);
    }
    else
    {
        console.log("Something is trying to create controller with the same guid as an exsiting");
    }
}

exports.canSee = function(rune,controller, state) {
    return true;
}