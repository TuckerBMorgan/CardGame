var entity = require('../entityManager')
//layout of playCardRune
//{
//    "runeType":"PlayCard",
//    "controllerGuid":"xxxxxxxx-xxxx-xxyx-xxxx-xxxxxxxx0xxx"
//    "cardGuid":"xxxxxxxx-xxxx-xxyx-xxxx-xxxxxxxx0xxx"
//}
exports.execute = function (rune, state) {
    console.log(rune.controllerGuid);
     var controller = entity.entities[rune.controllerGuid];
     var index = controller.hand.indexOf(card);
     var card = entity.entities[rune.cardGuid];
     controller.hand.splice(index, 1);
     controller.inPlay.push(card);
}

exports.canSee = function (rune, controller, state) {   
    return rune.controllerGuid == controller.guid;
}