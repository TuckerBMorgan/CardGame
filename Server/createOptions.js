var entities = require('./entityManager');
var tags = require('./cards/cardTags');
var Controller = require('./runes/NewController');

exports.createOptions = function (controller, state) {
    //The list we return that is all possible options a player can take in the current board state
    var options = [];
    
    //In this case we need to let the client know that all they can do with these cards is mulligan then
    //They are unable to play them
    if(controller.state == Controller.MULLIGAN)
    {
        var noMulligan = {
            "option":"noMulligan"
        }
        options.push(noMulligan);
        for(var i = 0;i<controller.hand;i++)
        {
            var mulliganCard = {
                "option":"mulligan",
                "cardGuid":controller.hand[i]
            }
            options.push(mulliganCard);
        }
        return options;
    }
    
    //You can always end your turn
    var endTurn = {
        "option":"endTurn"
    };
    options.push(endTurn);
    
    var keys = Object.keys(state.controllers);
    var them;
    keys.forEach(function (element) {
        if(element != controller)
        {
            them = state.controllers[element];
        }
    })
    
    
    
    //Can I play any of the cards in my hand in the current board state
    var hand = state.controllers[controller].hand;
    hand.forEach(function (element) {
        var cardFile = require('./cards/' + element.name);
        if(cardFile.canPlay(element, controller, state))
        {
            var option = {
                "option":"playCard",
                "cardGuid":element.cardGuid
            }
            if(element.tags.indexOf[tags.BATTLE_CRY] != -1)
            {
                 //is the battle cry has target types, add options for targets, so we dont have to back up state is the person backs up on playing
            }
            options.push(option);
        }
    })
    
    //Can I attack any of the guys on there board, with the guys on my board
    var thereInPlay = them.inPlay;
    var mineInPlay = me.inPlay;
    var tauntList = [];
    var otherList = [];
    thereInPlay.forEach(function (element) {
        if(element.tags.indexOf(tags.TAUNT) != -1)
        {
            tauntList.push(element.cardGuid);
        }
        else if(element.tags.indexOf(tags.STEALTH) == -1)
        {
            otherList.push(element.cardGuid);
        }
    })
    var useList;
    //We have atleast one taunt, we are unable to attack anyone else
    if(tauntList.length > 0)
    {
        useList = tauntList;
    }
    //just use regular list to build targetsk
    else
    {
        useList = otherList;
    }
    
    mineInPlay.forEach(function (element) {
        useList.forEach(function (innerElement) {
            var attackOtions = {
                "option":"attack",
                "attackGuid":element.cardGuid,
                "defendedGuid":innerElement
            }
            options.push(attackOtions);
        })
    })
    
    
        
    return options;
}