var entities = require('../entityManager');
var Rune = require('../RuneVM');
var SetMana = require('./SetMana');

exports.execute = function (rune, state) {

}

exports.CreateRune = function()
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