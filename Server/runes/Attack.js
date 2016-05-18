var entities = require('../entityManager');
var Rune = require('../RuneVM')



exports.execute = function (rune, state) {
        var ent = entities.getEntity(rune.source);
        
        var damageRune = {
            "runeType":"DamageRune",
            "source":rune.source,
            "target":rune.target,
            "amount":ent.baseAttack
        }
        var def = entities.getEntity(rune.target);
        
        var damageMe = {
            "runeType":"DamageRune",
            "source":rune.target,
            "target":rune.source,
            "amount":def.baseAttack    
        }
        
        state.attackedThisTurn.push(rune.source);
        Rune.executeRune(damageRune, state);
        Rune.executeRune(damageMe, state);
        
}

exports.canSee = function (rune, controller, state) {
    return true;
}