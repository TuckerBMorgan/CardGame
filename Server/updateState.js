var entities = require('./entityManager');

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
            var file = require('./cards' + minion.id);
            if(!file.isAlive(minion, state.controllers[element], state))
            {
                redo = true;
                file.onGraveyard(minion, state.controllers[element], state);
                deads.push(index);
            }
        })
        var removedCount = 0;
        deads.forEach(function (ind) {
            state.controllers[element].graveyard.push(inPlayMinions.splice(ind - removedCount, 1)[0]);
            removedCount++;
        })
    })
    
    //if anyone died we have to do this whole thing again, and again, again
    if(redo == true)
    {
        exports.updateState(state);
    }
}