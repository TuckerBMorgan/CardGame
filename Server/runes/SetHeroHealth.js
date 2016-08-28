var entities = require('../entityManager');


exports.execute = function(rune, state) {
       var controller = entities.getEntity(rune.heroGuid, state);
       controller.hero.health = rune.health;
}

exports.CreateCard = function(heroGuid, health)
{
    var rune = {
        "runeType":"SetHeroHealth",
        "heroGuid":heroGuid,
        "health":health
    }
    
    return rune;
}

exports.canSee = function (params) {
    return true;
} 

