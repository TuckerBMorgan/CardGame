var entities = require('../entityManager');
var Rune = require('../RuneVM');
var SetMana = require('./SetMana');

exports.execute = function (rune, state) {
    
    var ent = entities.getEntity(rune.cardGuid, state);
    var controller  = entities.getEntity(rune.controllerGuid, state);
    
    require('../cards/' + ent.set + "/" + ent.id).spellText(rune, ent, controller, state);
    
     Rune.executeRune(SetMana.CreateRune(controllerGuid.guid, controller.mana - ent.cost, state));   
    
}

exports.canSee = function(rune, controller, state) {
    return true;
}