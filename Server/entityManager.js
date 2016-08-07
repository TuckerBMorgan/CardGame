var entities = {};

var sortableEntites = [];

exports.MINION = 0;
exports.SPELL = 1;
exports.HERO = 2;   

exports.addEntity = function (entity, entityGuid) {
    entities[entityGuid] = entity;
    sortableEntites.push(entity);   
 }

exports.removeEntity = function (entity, entityGuid) {
    entities[entityGuid] = null;
    var index = sortableEntites.indexOf(entity);
    sortableEntites.splice(index, 1);
}


exports.getEntity = function (entityGuid) {
    return entities[entityGuid];
}

exports.returnAllOfType = function (entityCategory) {
    var returnables = [];
    sortableEntites.forEach(function (element) {
        if(element.entityType == entityCategory)
        {
            returnables.push(element);
        }
    })
    return returnables;
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

exports.returnAllOfSeveralTypes = function (entityCategory) {
    var returnables = [];
    sortableEntites.forEach(function (element) {
        if(entityCategory.contains(element.entityType)){
            returnables.push(element);
        }
    })
    return returnables;
}

exports.returnAll = function(){
    return sortableEntites;
}

exports.returnAllInPlay =  function (){
    var returnables = [];
    sortableEntites.forEach(function (element) {
        if(element.state == "InPlay"){
            returnables.push(element);
        }
    })
    return returnables;
}