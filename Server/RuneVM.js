var server = require('./server');

exports.executeRune = function (rune, state) {
    var file = require("./" + rune.runeType);
    file.execute(rune, state);
    
   var keys = Object.keys(state.controllers);
   keys.forEach(function (elements) {
      if(file.canSee(state.controllers[elements], state))
      {
          server.sendMessage(JSON.stringify(rune), state);          
      } 
   })
}