var entity = require('../entityManager')
var Rune = require('../RuneVM')
var server = require('../server');
var cont = require('./NewController');
var tags = require('../cards/cardTags');
var util = require('../util');

//layout of summionMinionRune
//{
//    "runeType":"SummonMinion",
//    "controllerGuid":"guid"
//    "sourceCardGuid":"guid",
//    "cardGuid":"guid"
//    "cardId":"set/cardID"
//}

exports.execute = function (rune, state) {
    
   var controller = entity.getEntity(rune["controllerGuid"], state);
    
   var sourceCard = entity.getEntity(rune["controllerGuid"], state);
   
   //TODO: turn these three lines into a single function call, would just make the process
   //a little more unified 
   var card = util.loadCard(rune["cardId"]);
   card.cardGuid = rune["cardGuid"];  
   card.controllerGuid = controller["guid"];
   
   //adds the card to the inPlay list in the source controller
   controller.inPlay.push(card);
     
   card.tags[tags.SUMMONING_SICKNESS] = true;
   
   //maybe this as well?
   var useCard = {
       "runeType":"CreateCard",
   }

   //populates the useCard rune with elements of the found card
   var cardKeys = Object.keys(card);
   cardKeys.forEach(function (element) {
       useCard[element] = card[element];
   })
   
   //not totally happy with this, but just cannot think of a better way of this
   useCard["totalHealth"] = useCard["baseHealth"];
   useCard["currentHealth"] = useCard["baseHealth"];
   useCard["totalAttack"] = useCard["baseAttack"];
   useCard["currentAtack"] = useCard["baseAttack"];

   
   useCard["team"] = controller["team"];
   useCard["state"] = "InPlay";

   var keys = Object.keys(state.controllers);
   
   keys.forEach(function (element) {
        if(!(rune["cardGuid"] in state.controllers[element].seenCards))
        {
            if(state.controllers[element].type == cont.PLAYER_CONTROLLER)
            {
                server.sendMessage(JSON.stringify(useCard), state.controllers[element].socket);
            }
        }
   })
}

exports.CreateRune = function(controllerGuid, cardGuid, cardId, fieldIndex)
{
    var rune = {
        "runeType":"SummonMinion",
        "controllerGuid":controllerGuid,
        "cardGuid":cardGuid,
        "cardId":cardId,
        "index":fieldIndex
    }
    return rune;
}

exports.canSee = function (rune, controller, state) {   
    return true;
}