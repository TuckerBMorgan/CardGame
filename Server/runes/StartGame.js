var fs = require('fs'); 
var server = require('../server');
var Rune = require('../RuneVM')

//Sent to all players, after all players have connected and picked there openining hands
//{
// "runeType":"StarGame"
//}

exports.execute = function (rune, state) {
    state.OnTurnPlayer = -1;
    var rotateTurn = {
        "runeType":"RotateTurn",
        "previousGuid":"00-00-00"
    }
    
    Rune.executeRune(rotateTurn, state);
}

exports.CreateRune = function()
{
    var rune = {
        "runeType":"StarGame"
    }
    return rune;
}

exports.canSee = function (rune, controller, state) {
    return true;
}