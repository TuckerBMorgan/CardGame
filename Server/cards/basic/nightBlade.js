
var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags')
var damageRune = require('../../runes/damageRune');
var rune = require("../../RuneVM");

exports.NIGHT_BLADE_DAMAGE_AMOUNT = 3;

//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cost": 5,
  "baseAttack": 4,
  "baseHealth": 4,
  "set":cardTags.BASIC,
  "id":"nightBlade",
  "tags":{
      [cardTags.BATTLE_CRY]:true
  },
  "enchantments":[
    
  ],
  "canPlay":cardFunctions.basicCanPlay,
  "attack":cardFunctions.basicAttack,
  "canAttack":cardFunctions.canAttack,
  "isAlive":cardFunctions.baseIsAlive,
  "takeDamage":cardFunctions.takeDamage,
  "onBattleCry":function (playOption, card, controller, state) {

    var controllers = state["controllers"];
    var other = "";
    var keys = Object.keys(controllers);
    keys.forEach(function(element){
        if(element != controller.guid)
        {
            other = element;
        }
    })

    rune.executeRune(damageRune.CreateRune(card.cardGuid, other, exports.NIGHT_BLADE_DAMAGE_AMOUNT), state);},
}
//END_OF_CARD_DATA