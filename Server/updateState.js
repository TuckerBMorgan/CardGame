var entities = require('./entityManager');
var Rune = require('./RuneVM');
var Tags = require("./cards/cardTags");

exports.updateState = function(state)
{   
    
    
    
    //Check for dead heroes
    var keys = Object.keys(state.controllers);
    
    keys.forEach(function (element) {
        if(state.controllers[element].hero.health <=0)
        {
            //this person dead, we dont quite end, we still check everyone else incase of a tie
        }
    })
    
    var redo = false;
    //Check for dead minions
    keys.forEach(function (element) {
        var inPlayMinions = state.controllers[element].inPlay;
        var deads = [];
        inPlayMinions.forEach(function (minion, index) {
            var file = require('./cards/'+ minion.set + "/" + minion.id);
            if(!file.isAlive(minion, state.controllers[element], state))
            {
                redo = true;
                var killMin = {
                    "runeType":"KillMinion",
                    "controller":element,
                    "cardGuid":minion.cardGuid
                }
                
                deads.push(killMin);
            }
        })
        
        deads.forEach(function (element) {
            Rune.executeRune(element, state);
        })
    })
    
    //This is done is this way     
    //save off current enchamnets
    //remove current enchamnets
    var previousEnchamnets = {};
    var ents = entities.returnAllInPlay(state);
    ents.forEach(function (element) {
        if(element["enchantments"].length > 0)
        {
            previousEnchamnets[element.cardGuid] = element.enchaments;
            element.enchaments = [];
        }
    })
    
    //apply enchamnet
    ents.forEach(function (element) {
        if(element.tags[Tags.AURA] != undefined){
            var file = require("./cards/" + element.set + "/" + element.id);
            ents.forEach(function (checkEle) {
                if(file.filterCard(element, checkEle, null, state))
                {
                    checkEle["enchantments"].push(element.cardGuid);
                }
            })
        }
    })
    
    var currentEnchamnets = {};
    ents.forEach(function (element) {
        if(element["enchantments"].length > 0)
        {
            currentEnchamnets[element.cardGuid] = element["enchantments"];
        }
    })
    var oldKeys = Object.keys(previousEnchamnets);
    var newKeys = Object.keys(currentEnchamnets);
    newKeys.forEach(function(element) {
           var enchaments = previousEnchamnets[element];
           if(enchaments != undefined)
           {
               var add = [];
               var removes = [];
               var newEnchants = currentEnchamnets[element];
               add = newEnchants.filter(function (newElement) {
                   if(enchaments.indexOf(newElement) == -1){
                       return true;
                   }
                   return false;
               })
               
               removes = enchaments.filter(function (oldElement) {
                   if(newEnchants.indexOf(oldElement) == -1)
                   {
                       return true;
                   }
                   return false;
               })

               removes.forEach(function(cardId) {
                   var enchanter = entities.getEntity(cardId, state);
                   var card = require('./cards/' + enchanter.set + "/" + enchanter.id);
                   card.removeAura(enchanter, entities.getEntity(element, state), null, state);
               });

               add.forEach(function (cardId) {
                   var enchanter = entities.getEntity(cardId, state);
                   var card = require('./cards/' + enchanter.set + "/" + enchanter.id);
                   card.applyAura(enchanter, entities.getEntity(element, state), null, state);
               })
           }
           else
           {
               //we need to add all of the enchamnets in this case
                var adds = currentEnchamnets[element];
                adds.forEach(function (cardId) {
                   var enchanter = entities.getEntity(cardId, state);
                   var card = require('./cards/' + enchanter.set + "/" + enchanter.id);
                   card.applyAura(enchanter, entities.getEntity(element, state), null, state);     
                })
           }
    });

    //check against previous list of enchamnets
    //do removes for ones that are no longer there
    //do adds for new ones
    //if there are any adds of removes we must do a redo
    
    
    
    //if anyone died we have to do this whole thing again, and again, again
    if(redo == true)
    {
        exports.updateState(state);
    }
}