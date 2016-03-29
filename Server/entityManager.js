var entities = {};

var sortableEntites = [];

exports.MINION = 0;
exports.HERO = 1;   

exports.addEntity = function (entity, entityGuid,entityCateogry) {
    exports.entities[entityGuid] = entity;
    sortableEntites.push(entity);    
}

exports.removeEntity = function (entity, entityGuid) {
    exports.entities[entityGuid] = null;
    var index = sortableEntites.indexOf(entity);
    sortableEntites.splice(index, 1);
}


exports.getEntity = function (entityGuid) {
    return entities[entityGuid];
}

exports.returnAllOfType = function (entityCateogry) {
    var returnables = [];
    sortableEntites.forEach(function (element) {
        if(element.entityType == entityCateogry)
        {
            returnables.push(element);
        }
    })
    return returnables;
}

exports.returnAllOfSeveralTypes = function (entityCateogry) {
    var returnables = [];
    sortableEntites.forEach(function (element) {
        if(entityCateogry.contains(element.entityType)){
            returnables.push(element);
        }
    })
    return returnables;
}