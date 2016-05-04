var entities = require('./entityManager');
var Rune = require('./RuneVM');

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
            var file = require('./cards/' + minion.id);
            if(!file.isAlive(minion, state.controllers[element], state))
            {
                console.log("the health of this dead minion is " + minion.baseHealth);
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
    
    //if anyone died we have to do this whole thing again, and again, again
    if(redo == true)
    {
        exports.updateState(state);
    }
}