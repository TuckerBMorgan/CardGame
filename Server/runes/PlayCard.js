var entity = require('../entityManager')
var Rune = require('../RuneVM')
var server = require('../server');
var cont = require('./NewController');
var tags = require('../cards/cardTags');

exports.execute = function (rune, state) {
    
    console.log(rune);
    var controller = entity.getEntity(rune["controllerGuid"], state);
    var card = entity.getEntity(rune["playOption"]["cardGuid"], state);
    var index = controller["hand"].indexOf(card);
    controller["hand"].splice(index, 1);
    
    //This minion has a battle cry 
    if(card["tags"].hasOwnProperty(tags.BATTLE_CRY))
    {
        card.onBattleCry(rune.playOption, card, controller, state);
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
     card["totalAttack"] = card["baseAttack"];
     card["currentAttack"] = card["baseAttack"];
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

exports.CreateRune = function (controllerGuid, cardGuid, playOption) {
   
   var rune = {
       "runeType":"PlayCard",
       "controllerGuid":controllerGuid,
       "cardGuid":cardGuid,
       "playOption":playOption
   }

   return rune;
}

exports.canSee = function (rune, controller, state) {   
    return true;
}