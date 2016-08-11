var entity = require('../entityManager')
var Rune = require('../RuneVM')
var server = require('../server');
var cont = require('./NewController');
var tags = require('../cards/cardTags');

exports.execute = function (rune, state) {
    
    console.log(rune["controllerGuid"]);
    var controller = entity.getEntity(rune["controllerGuid"], state);
    var card = entity.getEntity(rune["cardGuid"], state);
    var index = controller["hand"].indexOf(card);
    controller["hand"].splice(index, 1);
    
    //This minion has a battle cry 
    if(card["tags"].hasOwnProperty(tags.BATTLE_CRY))
    {
        require('../cards/' + card["set"] + "/" + card["id"]).onBattleCry(card, controller, state);
    }
    
    controller["inPlay"].push(card);
    
    card["tags"][tags.SUMMONING_SICKNESS] = true;
     
     var setMana = {
      "runeType":"SetMana",
      "controllerGuid":rune["controllerGuid"],
      "mana":controller["mana"] - card["cost"]
     }
     
     card["totalHealth"] = card["baseHealth"];
     card["currentHealth"] = card["baseHealth"];
     card["team"] = controller["team"];
     card["state"] = "InPlay";
     
     var keys = Object.keys(state["controllers"]);
     keys.forEach(function (element) {
         if(!(rune["cardGuid"] in state["controllers"][element]["seenCards"]))
         {
             if(state["controllers"][element]["type"] == cont.PLAYER_CONTROLLER)
             {
                server.sendMessage(JSON.stringify(card), state["controllers"][element]["socket"]);
             }
         }
     })
     
     Rune.executeRune(setMana, state);
}

exports.CreateRune = function (controllerGuid, cardGuid) {
   
   var rune = {
       "runeType":"PlayCard",
       "controllerGuid":controllerGuid,
       "cardGuid":cardGuid
   }

   return rune;
}

exports.canSee = function (rune, controller, state) {   
    return true;
}