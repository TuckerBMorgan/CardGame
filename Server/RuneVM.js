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
    console.log(JSON.stringify(rune));
    
   var eventKeys = eventsListeners[rune.runeType];
   if(eventKeys != null){
    //For each person for wants to listen to this event
        if(!eventKeys.some(function (entity) {
            var ent = entities.getEntity(entity);
            if(!ent[element + "Listener"](rune, entity, state))
            {
                return true;
            }
            return false;
        }))
        {   
            return;
            //this means a rune was killed by one of the entities that was listining in
        }
}   
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

exports.addListenerPre = function (entity, event) {
    
    if(!(event in eventsListeners))
    {
        eventsListeners[event] = [];
    }
    
    if(eventsListeners[event].indexOf(entity) == -1)
    {
        eventsListeners[event].unshift(entity);
    }
        
}

exports.removeListenerPre = function (entity, event) {
    //Lets do this latter
} 

exports.removeListenerPost = function (entity, event) {
    //Lets do this latter
}

exports.addListenerPost = function (entity, event) {

    if(!(event in eventsListeners))
    {
        eventsListeners[event] = [];
    }
    
    if(eventsListeners[event].indexOf(entity) == -1)
    {
        eventsListeners[event].push(entity);
    }
}