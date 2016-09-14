var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags');
var SetAttack = require('../../runes/SetAttack');
var ModifyAttack = require('../../runes/ModifyAttack');
var AddEnchantment = require('../../runes/AddEnchantment');
var RuneVM = require("../../RuneVM");


exports.GURUBASHI_ATTACK_BUFF = 3;

//START_OF_CARD_DATA
exports.card = {
  "type": ent.MINION,
  "cost": 5,
  "baseAttack": 2,
  "baseHealth": 7,
  "set":cardTags.BASIC,
  "id":"gurubashiBerserker",
  "tags":{
  },
  "enchantments":[
    
  ],
  "canPlay":cardFunctions.basicCanPlay,
  "attack":cardFunctions.basicAttack,
  "canAttack":cardFunctions.basicCanAttack,
  "isAlive":cardFunctions.baseIsAlive,
  "castEnchantments":function(rune, state){
        RuneVM.executeRune(SetAttack.CreateRune(rune["target"]["cardGuid"], exports.GURUBASHI_ATTACK_BUFF), state);
        RuneVM.executeRune(ModifyAttack.CreateRune(rune["target"]["cardGuid"], rune["source"]["cardGuid"], exports.GURUBASHI_ATTACK_BUFF), state);  
    },
    "removeEnchatments":function(card, state){
        RuneVM.executeRune(SetAttack.CreateRune(card["cardGuid"], -exports.GURUBASHI_ATTACK_BUFF), state);
    },
    "takeDamage":function (card, amount, source, state){
        card.currentHealth += amount;
        if(card["tags"][cardTags.SILENCE] == undefined)
        {
            RuneVM.executeRune(AddEnchantment.CreateRune(card.cardGuid, card.cardGuid), state);
        }
    }   
}
//END_OF_CARD_DATA
