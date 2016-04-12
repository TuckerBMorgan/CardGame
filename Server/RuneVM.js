var server = require('./server');
var queue = [];
var count = 0;
exports.executeRune = function (rune, state) {
    
    if(count > 0)
    {
        queue.push(rune);
    }
    else
    {
        count++;
        procesRune(rune, state);
        count--;
    }   
}

function procesRune(rune, state) {
    console.log(JSON.stringify(rune));
    var file = require("./runes/" + rune.runeType);
    file.execute(rune, state);
        
    var keys = Object.keys(state.controllers);
    keys.forEach(function (elements) {
        if(file.canSee(state.controllers[elements], state))
        {
            if(state.controllers[elements].type == "PlayerController")
            {
                    server.sendMessage(JSON.stringify(rune), state.controllers[elements].socket);         
            } 
        } 
    })
    
    if(queue.length > 0)
    {
        count++;
        procesRune(queue.shift(), state);
        count--;
    }
}