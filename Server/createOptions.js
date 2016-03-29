var entities = require('./entityManager');



exports.createOptions = function (controller, state) {
    var options = [];
    var endTurn = {
        "option":"endTurn"
    };
    options.push(endTurn);
    
    
    
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
            options.push(option);
        }
    })
    
    var inPlay = state.controllers[controller].inPlay;
    var legalTargets = entities.returnAll();
    var hasTaunt = false;
    legalTargets.some(function(element){
        if(element.tags.contains("Taunt"))
        {
            hasTaunt = true;
            return true;
        }
        return false;
    });
    
    if(hasTaunt)
    {
        legalTargets.forEach(function(element){
            
        })
    }
    
    inPlay.forEach(function(element){
        
    })
    
    
        
    return options;
}