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
        
        state.attackedThisTurn.push(rune.source);
        Rune.executeRune(damageRune, state);
        
}

exports.canSee = function (rune, controller, state) {
    return true;
}