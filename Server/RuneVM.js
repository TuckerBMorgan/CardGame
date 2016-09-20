var server = require('./server');
var entities = require('./entityManager');
var queue = [];
var count = 0;

var eventsListeners = {};

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

   var eventKeys = state["preEventListeners"][rune.runeType];
   if(eventKeys != null){
    //For each person for wants to listen to this event
        if(!eventKeys.some(function (object) {
            console.log(object);
          return !object[rune.runeType + "Listener"](rune, object, state);
        })){   
            //this means a rune was killed by one of the entities that was listining in
            return;
        }
    }

    var file = require("./runes/" + rune.runeType);
    file.execute(rune, state);
    
    var eventKeys = state["postEventListeners"][rune.runeType];
    if(eventKeys != null){
    //For each person for wants to listen to this event
        if(!eventKeys.some(function (object) {
          return !object[element+ "Listener"](rune, object, state);
        })){   
            //this means a rune was killed by one of the entities that was listining in
            return;
        }
    }

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

exports.addListenerPre = function (object, event, state) {

    if(!(event in state["preEventListeners"]))
    {
        state["preEventListeners"][event] = [];
    }
    
    if(state["preEventListeners"][event].indexOf(object) == -1)
    {
        state["preEventListeners"][event].unshift(object);
    }
}

exports.removeListenerPre = function (object, event) {
    //Lets do this latter
} 

exports.removeListenerPost = function (object, event) {
    //Lets do this latter
}

exports.addListenerPost = function (object, event) {

    if(!(event in state["postEventListeners"]))
    {
        state["postEventListeners"][event] = [];
    }
    
    if(state["postEventListeners"][event].indexOf(object) == -1)
    {
        state["postEventListeners"][event].push(entity);
    }
}