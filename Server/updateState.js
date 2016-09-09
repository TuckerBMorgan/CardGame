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
            if(!minion.isAlive(minion, state.controllers[element], state))
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
    var previousAuras = {};
    var ents = entities.returnAllInPlay(state);
    ents.forEach(function (element) {
        if(element["auras"].length > 0)
        {
            previousAuras[element.cardGuid] = element["auras"];
            element["auras"] = [];
        }
    })
    
    //apply enchamnet
    ents.forEach(function (element) {
        if(element.tags[Tags.AURA] != undefined){
            ents.forEach(function (checkEle) {
                if(element.filterCard(element, checkEle, null, state))
                {
                    checkEle["auras"].push(element.cardGuid);
                }
            })
        }
    })
    
    var currentAuras = {};
    ents.forEach(function (element) {
        if(element["auras"].length > 0)
        {
            currentAuras[element.cardGuid] = element["auras"];
        }
    })
    var oldKeys = Object.keys(previousAuras);
    var newKeys = Object.keys(currentAuras);
    newKeys.forEach(function(element) {
           var auras = previousAuras[element];
           if(auras != undefined)
           {
               var add = [];
               var removes = [];
               var newAuras = currentAuras[element];
               add = newAuras.filter(function (newElement) {
                   if(auras.indexOf(newElement) == -1){
                       return true;
                   }
                   return false;
               })
               
               removes = auras.filter(function (oldElement) {
                   if(newAuras.indexOf(oldElement) == -1)
                   {
                       return true;
                   }
                   return false;
               })

               removes.forEach(function(cardId) {
                   var enchanter = entities.getEntity(cardId, state);
                   enchanter.removeAura(enchanter, entities.getEntity(element, state), null, state);
               });

               add.forEach(function (cardId) {
                   var enchanter = entities.getEntity(cardId, state);
                   enchanter.applyAura(enchanter, entities.getEntity(element, state), null, state);
               })
           }
           else
           {
               //we need to add all of the enchamnets in this case
                var adds = currentAuras[element];
                adds.forEach(function (cardId) {
                   var enchanter = entities.getEntity(cardId, state);
                   enchanter.applyAura(enchanter, entities.getEntity(element, state), null, state);     
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