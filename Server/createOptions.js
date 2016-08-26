var entities = require('./entityManager');
var tags = require('./cards/cardTags');
var Controller = require('./runes/NewController');

exports.PLAY_CARD_TYPE = "PlayCard";
exports.ATTACK_TYPE = "Attack";
exports.END_TURN = "EndTurn";
exports.PLAY_SPELL = "PlaySpell";

exports.createOptions = function (controller, state) {
    //The list we return that is all possible options a player can take in the current board state
    var options = [];
    
    //In this case we need to let the client know that all they can do with these cards is mulligan then
    //They are unable to play them
    if(state.controllers[controller] == Controller.MULLIGAN)
    {
        
        //Still not sure if this the best way of doing things
        var noMulligan = {
            "option":"noMulligan"
        }
        options.push(noMulligan);
        var mulligan = {
            "option":"mulligan"
        }
        options.push(mulligan);
        return options;
    }
    
    //You can always end your turn
    var endTurn = {
        "option":exports.END_TURN
    };
    options.push(endTurn);
    
    var keys = Object.keys(state.controllers);
    var them;
    var me;
    keys.forEach(function (element) {
    
        if(element != controller)
        {
            them = state.controllers[element];
        }
        else
        {
            me = state.controllers[element];
        }
    })
    
    
    //Can I play any of the cards in my hand in the current board state
    var hand = state.controllers[controller].hand;
    hand.forEach(function (element) {
        var cardFile = require('./cards/'  + element.set + "/" + element.id);
        if(element.type == entities.MINION)
        {
            //least at the moment we have simple playcard options for minions
            if(cardFile.canPlay(element, state.controllers[controller], state))
            {
                if(element["tags"][tags.TARGET] == undefined)
                {
                    
                    var option = {
                        "option":exports.PLAY_CARD_TYPE,
                        "cardGuid":element.cardGuid,
                        "target":"-1"
                    }
                    options.push(option);
                }
                else
                {
                    var battleCryTargetOptions = cardFile.generateOptions(element, state.controllers[controller], state);
                    battleCryTargetOptions.forEach(function(optionElement){
                        options.push(optionElement);
                    })
                }
            }
        }
        //Spells are a little more complicated becuase they have to target, or not and as such they create their own play options
        else
        {
            if(cardFile.canPlay(element, state.controllers[controller], state))
            {
                var opsArray = require('./cards/'  + element.set + "/" + element.id).generatePlayOptions(element, state.controllers[controller], state);
                opsArray.forEach(function (element) {
                    options.push(element);
                })
            }
        }
    })
    
    //Can I attack any of the guys on there board, with the guys on my board
    var thereInPlay = them.inPlay;
    var mineInPlay = me.inPlay;
    
    var tauntList = [];
    var otherList = [];
    
    thereInPlay.forEach(function (element) {
        if(element.tags.hasOwnProperty(tags.TAUNT))
        {
            tauntList.push(element.cardGuid);
        }
        else if(element.tags.hasOwnProperty(tags.STEALTH))
        {
            otherList.push(element.cardGuid);
        }
    })
    var useLis = [];
    //We have atleast one taunt, we are unable to attack anyone else
    if(tauntList.length > 0)
    {
        useList = tauntList;
    }
    //just use regular list to build targets
    else
    {
        useList = otherList;
        var controller = entities.getOtherController(me, state);
       // useList.push(controller.guid);
    }
    
    mineInPlay.forEach(function (element) {
        useList.forEach(function (innerElement) {
            var file = require("./cards/" + element.set + "/" + element.id);
            if(file.canAttack(element, innerElement, controller, state))
            {
                var attackOtions = {
                    "option":exports.ATTACK_TYPE,
                    "attackGuid":element.cardGuid,
                    "defenderGuid":innerElement
                }
                options.push(attackOtions);
            }
        })
    })
    return options;
}