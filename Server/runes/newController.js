var entity = require('../entityManager');

exports.PLAYER_CONTROLLER = "PlayerController"
exports.AI_CONTROLLER = "AiController"
exports.FULL_PLAYER_HEALTH = 30
//{
//  "runeType":"NewController"
//  "name":"name"
//  "controllerType"://A Controller Type, from above
//  "guid":"guid"
//}
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
            "guid":rune['guid']
        }
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