var entities = require('../entityManager');
var Rune = require('../RuneVM');
var SetMana = require('./SetMana');

exports.execute = function (rune, state) {
    
    var ent = entities.getEntity(rune["option"]["source"], state);
    var controller  = entities.getEntity(rune.controllerGuid, state);
    
    require('../cards/' + ent.set + "/" + ent.id).spellText(rune, controller, state);
    
    Rune.executeRune(SetMana.CreateRune(controller.guid, controller.mana - ent.cost, state));
}

exports.CreateRune = function(controllerGuid, cardGuid, option)
{
    var rune = {
        "runeType":"PlaySpell",
        "controllerGuid":controllerGuid,
        "option":option
    }

    return rune;
}

exports.canSee = function(rune, controller, state) {
    return true;
}