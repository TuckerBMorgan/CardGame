var entity = require('../entityManager');
var util = require('../util');
var heroUtil = require("../heroUtil");

exports.PLAYER_CONTROLLER = "PlayerController"
exports.AI_CONTROLLER = "AiController"
exports.FULL_PLAYER_HEALTH = 30
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
                "health":exports.FULL_PLAYER_HEALTH,
                "guid":rune['guid'],
                "hero":heroUtil.loadHero(rune["hero"]),
                "mana":0,
                "team":teamCount
            }
        teamCount++;
        entity.entities[rune.guid] = state.controllers[rune.guid];
    }
    else
    {
        console.log("Something is trying to create controller with the same guid as an exsiting");
    }
}

exports.canSee = function(rune,controller, state) {
    return true;
}