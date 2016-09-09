
var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var rune = require('../../RuneVM');
var cardTags = require('../cardTags')

//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cost": 1,
  "baseAttack": 1,
  "currentHealth":0,
  "totalHealth":0,
  "baseHealth": 1,
  "set":cardTags.BASIC,
  "id":"noviceEngineer",
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
    
    var deck = controller.deck;
    if(deck.length <= 0)
    {
        return null;   
    }
    var index = Math.floor(Math.random() * deck.length);
    
    var dealCard = {
        "runeType":"DealCard",
        "controllerGuid":controller.guid,
        "cardGuid":deck[index].cardGuid
    }
    rune.executeRune(dealCard, state);}
}
//END_OF_CARD_DATA