var entities = {};

var sortableEntites = [];

exports.MINION = 0;
exports.SPELL = 1;
exports.HERO = 2;   

exports.addEntity = function (entity, entityGuid, state) {
    state["entities"][entityGuid] = entity;
}

exports.removeEntity = function (entity, entityGuid, state) {
    state["entities"][entityGuid] = null;
}

exports.getEntity = function (entityGuid, state) {
    return state["entities"][entityGuid];
}

exports.returnAllOfType = function (entityCategory, state) {
    var returnables = [];
    state["entities"].forEach(function (element) {
        if(element.entityType == entityCategory)
        {
            returnables.push(element);
        }
    })
    return returnables;
}

exports.returnAllAlive = function(state)
{
    var returnables = [];

    var keys = Object.keys(state["entities"]);

    keys.forEach(function(element)
    {
        if(state["entities"][element]["state"] == "InPlay")
        {
            returnables.push(state["entities"][element]);
        }
    })
    
    keys = Object.keys(state["controllers"]);

    keys.forEach(function(element)
    {
       // returnables.push(state["controllers"][element]);
    })

    return returnables;
}

exports.returnAllAliveAndOnTeam = function(team, state)
{
    var returnables = [];
    
    var keys = Object.keys(state["entities"]);

    keys.forEach(function(element)
    {
        if(state["entities"][element]["team"] == team)
        {
            if(state["entities"][element][state] != "InPlay")
            {
                returnables.push(element);
            }
        }
    })
    return returnables;
}

exports.getOtherController = function(controller, state)
{
    var keys = Object.keys(state.controllers);
    var returnCont = null;
    keys.forEach(function(element)
    {
        if(returnCont != null)
            return;
        
        if(state["controllers"][element].guid != controller.guid)
        {
            returnCont = state["controllers"][element];
        }
    })

    return returnCont;
}

exports.getEnemyMinions = function (controller, state) {
    var keys = Object.keys(state.controllers);
    var returns = null;
    keys.forEach(function (element) {
        if(element != controller.guid)
        {
            returns = state.controllers[element].inPlay;
        }
    })
    return returns;
}

exports.returnAllOfSeveralTypes = function (entityCategory, state) {
    var returnables = [];
    state["entities"].forEach(function (element) {
        if(entityCategory.contains(element.entityType)){
            returnables.push(element);
        }
    })
    return returnables;
}

exports.returnAll = function(state){
    return sortableEntites;
}

exports.returnAllInPlay =  function (state){
    var returnables = [];

    var keys = Object.keys(state["entities"]);

    keys.forEach(function (element) {
        if(state["entities"][element].state == "InPlay"){
            returnables.push(state["entities"][element]);
        }
    })
    return returnables;
}