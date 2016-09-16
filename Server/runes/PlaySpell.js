var entities = require('../entityManager');
var Rune = require('../RuneVM');
var SetMana = require('./SetMana');

exports.execute = function (rune, state) {
    
    var ent = entities.getEntity(rune["option"]["cardGuid"], state);
    var controller  = entities.getEntity(rune.controllerGuid, state);
    
    ent.spellText(rune, ent, controller, state);
    
    Rune.executeRune(SetMana.CreateRune(controller.guid, controller.mana - ent.cost, state), state);
}

exports.CreateRune = function(controllerGuid, cardGuid, option)
{
    var rune = {
        "runeType":"PlaySpell",
        "controllerGuid":controllerGuid,
        "cardGuid":cardGuid,
        "option":option
    }

    return rune;
}

exports.canSee = function(rune, controller, state) {
    return true;
}