exports.PLAYER_CONTROLLER = "PlayerController"
exports.AI_CONTROLLER = "AiController"
exports.FULL_PLAYER_HEALTH = 30

//contents of rune
//"name":"foo"
//"guid":"guid"
//"controllerType":"one of the values above"
exports.execute = function(rune, state)
{
    if(!state.controllers.contains(rune['guid']))
    {
        state.controllers[rune.guid] = {
            "name":rune["name"],
            "type":rune["controllerType"],
            "deck":[],
            "hand":[],
            "inPlay":[],
            "health":exports.FULL_PLAYER_HEALTH
        }
    }
    else
    {
        console.log("Something is trying to create controller with the same guid as an exsiting");
    }
}

exports.canSee = function(rune,controller, state) {
    return true;
}
