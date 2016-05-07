var entity = require('../entityManager')
var Rune = require('../RuneVM')
var server = require('../server');
var cont = require('./NewController');
var tags = require('../cards/cardTags');


//layout of playCardRune
//{
//    "runeType":"PlayCard",
//    "controllerGuid":"xxxxxxxx-xxxx-xxyx-xxxx-xxxxxxxx0xxx"
//    "cardGuid":"xxxxxxxx-xxxx-xxyx-xxxx-xxxxxxxx0xxx"
//}
exports.execute = function (rune, state) {
    
    console.log(rune.controllerGuid);
    var controller = entity.getEntity(rune.controllerGuid);
    var card = entity.getEntity(rune.cardGuid);
    var index = controller.hand.indexOf(card);
    controller.hand.splice(index, 1);
    
    //This minion has a battle cry 
    if(card.tags.indexOf(tags.BATTLE_CRY) != -1)
    {
        require('../cards/' + card.set + "/" + card.id).onBattleCry(card, controller, state);
    }
    
    controller.inPlay.push(card);
     
    card.tags.push(tags.SUMMONING_SICKNESS);
     
     
     var setMana = {
      "runeType":"SetMana",
      "controllerGuid":rune.controllerGuid,
      "mana":controller.mana - card.cost
     }
     
     
     var keys = Object.keys(state.controllers);
     keys.forEach(function (element) {
         if(!(rune.cardGuid in state.controllers[element].seenCards))
         {
             if(state.controllers[element].type == cont.PLAYER_CONTROLLER)
             {
                server.sendMessage(JSON.stringify(card), state.controllers[element].socket);
             }
         }
     })
     
     Rune.executeRune(setMana, state);
}

exports.canSee = function (rune, controller, state) {   
    return true;
}