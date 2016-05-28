var entity = require('../entityManager')
var heroUtil = require("../heroUtil");

exports.hero = {
    "name":"Hunter",
    "health":heroUtil.BASE_HERO_HEALTH,
    "mana": 0,
    "type":entity.HERO,
    "power":{
        "targetType":entity.HERO,
        "cost":2    
    },
    //A short note about IDS, THEY CANNOT CHANGE unless all files that use it change as a well, they are the only way to go from an instance of a entity to the file that they use
    "id":"hunter"
}

exports.attackPower = 2;

exports.canUse = function (heroController, targetController, state) {
    var hero = state.controllers[heroController].hero;
    var target = state.controllers[targetController].hero;
    
    if(hero.mana >= hero.power.cost)
    {
        return true;
    }
    return false;
}

exports.validatePowerTarget = function (hero, target, state) {
    if(target.type == entity.HERO)
    {
        return true;
    }
    return false;
}

exports.usePower = function (hero, target, state) {
    
}

exports.needMoreTargetInfo = function () {
    return false;
}
//This is a for if an ability that self targets, IE, Hunter, Warlock, Paladin, Shaman
exports.getTarget = function (controller, state) {
    var keys = Object.keys(state.controller);
}