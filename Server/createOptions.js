var entities = require('./entityManager');



exports.createOptions = function (controller, state) {
    var options = [];
    var endTurn = {
        "option":"endTurn"
    };
    options.push(endTurn);
    
   var 
    
    
    var hand = state.controllers[controller].hand;
    hand.forEach(function (element) {
        var cardFile = require('./cards/' + element.name);
        if(cardFile.canPlay(element, controller, state))
        {
            var option = {
                "options":"playCard",
                "cardGuid":element.cardGuid
            }
            if(element.tags["battleCry"])
            {
                 //is the battle cry has target types, add options for targets, so we dont have to back up state is the person backs up on playing
            }
        }
    })
    
    
        
    return options;
}