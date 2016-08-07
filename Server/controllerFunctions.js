var server = require('./server');
var entities = require('./entityManager');

exports.onPlayCard = function (rune, controller, state) {
  
    var cont = state.controllers[state];
    
    if(!(rune.cardGuid in cont.seenCards))
    {
        rune.seenCards[rune.cardGuid] = true;
        var socket = cont.socket;
        var card = entities.getEntity(rune.cardGuid, state);
        server.sendMessage(JSON.parse(card), socket);
    }
}