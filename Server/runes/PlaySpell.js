var entities = require('../entityManager');
var Rune = require('../RuneVM');

exports.execute = function (rune, state) {
    
    var ent = entities.getEntity(rune.cardGuid, state);
    var controller  = entities.getEntity(rune.controllerGuid, state);
    
    require('../cards/' + ent.set + "/" + ent.id).spellText(rune, ent, controller, state);
    
    var setMana = {
        "runeType":"SetMana",
        "controllerGuid":controller.guid,
        "mana":controller.mana - ent.cost
    }
    
     Rune.executeRune(setMana, state);   
    
}

exports.canSee = function(rune, controller, state) {
    return true;
}