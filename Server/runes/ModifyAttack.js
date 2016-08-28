var entities = require('../entityManager')
var cardTags = require('../cards/cardTags')

exports.execute = function (rune, state) {
    //this will need to be a better function later one
    
    var ent = entities.getEntity(rune.target, state);
 
    //leaving this statement for now, becuase I want to reemeber to go back and get the dam thing working
    if(ent.type == entities.MINION)
    {
        ent["currentAttack"] += rune["amount"];
    }
}

exports.CreateCard = function (target, source, amount) {
    var rune = {
        "runeType":"ModifyAttack",
        "target":target,
        "source":source,
        "amount":amount
    }

    return rune;
}

exports.canSee = function (rune, controller, state) {
    return true;
}