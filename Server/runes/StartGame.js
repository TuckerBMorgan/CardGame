var fs = require('fs'); 
var server = require('../server');


//Sent to all players, after all players have connected and picked there openining hands
//{
// "runeType":"StarGame"
//}

exports.execute = function (rune, state) {}

exports.canSee = function (rune, controller, state) {
    return true;
}