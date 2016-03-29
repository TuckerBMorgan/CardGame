var entity = require('../entityManager')

exports.hero = {
    "name":"test",
    "health":30,
    "mana": 0,
    "type":1,
    "power":{
        "targetType":entity.HERO,
        "cost":2    
    }
    
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
        if(target != hero)
        {
                exports.usePower(hero, target, state);
                return true;
        }
    }
    return false;
}

exports.usePower = function (hero, target, state) {
//This needs to be a rune
//    target.health -= exports.attackPower;
}

exports.needMoreTargetInfo = function () {
    return false;
}
//This is a for if an ability that self targets, IE, Hunter, Warlock, Paladin, Shaman
exports.getTarget = function (controller, state) {
    var keys = Object.keys(state.controller);
}