var fs = require('fs'); 
var server = require('../server');
var Rune = require('../RuneVm')

//Sent to all players, after all players have connected and picked there openining hands
//{
// "runeType":"StarGame"
//}

exports.execute = function (rune, state) {
    var rotateTurn = {
        "runeType":"RotateTurn"
    }
    Rune.executeRune(rune, state);
}

exports.canSee = function (rune, controller, state) {
    return true;
}