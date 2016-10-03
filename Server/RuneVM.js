var server = require('./server');
var entities = require('./entityManager');
var queue = [];
var count = 0;

var eventsListeners = {};

exports.executeRune = function (rune, state) {
    //add the rune to the state list
    state["runes"].push(rune);
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
        eventKeys.forEach(function (object) {
          object[rune.runeType + "Listener"](rune, object, state);
        })}
    

    var file = require("./runes/" + rune.runeType);
    file.execute(rune, state);
    
    var eventKeys = state["postEventListeners"][rune.runeType];
    if(eventKeys != null){
    //For each person for wants to listen to this event
        eventKeys.forEach(function (object) {
          object[element+ "Listener"](rune, object, state);
        })
    }

    if(queue.length > 0)
    {
        count++;
        procesRune(queue.shift(), state);
        count--;
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