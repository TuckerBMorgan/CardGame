var entity = require('../entityManager')
var Rune = require('../RuneVM')

//layout of playCardRune
//{
//    "runeType":"PlayCard",
//    "controllerGuid":"xxxxxxxx-xxxx-xxyx-xxxx-xxxxxxxx0xxx"
//    "cardGuid":"xxxxxxxx-xxxx-xxyx-xxxx-xxxxxxxx0xxx"
//}
exports.execute = function (rune, state) {
    console.log(rune.controllerGuid);
     var controller = entity.getEntity(rune.controllerGuid);
     var index = controller.hand.indexOf(card);
     var card = entity.getEntity(rune.cardGuid);
     controller.hand.splice(index, 1);
     controller.inPlay.push(card);
     var setMana = {
      "runeType":"SetMana",
      "controllerGuid":rune.controllerGuid,
      "mana":controller.mana - card.cost
     }
     Rune.executeRune(setMana, state);
}

exports.canSee = function (rune, controller, state) {   
    return true;
}