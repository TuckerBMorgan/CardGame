var cardFunctions = require('../cardFunctions')
var ent = require('../../entityManager');
var cardTags = require('../cardTags');
var SetAttack = require('../../runes/SetAttack');
var ModifyAttack = require('../../runes/ModifyAttack');
var AddEnchatment = require('../../runes/AddEnchantment');
var RuneVM = require("../../RuneVM");

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
    
  ]
}
//END_OF_CARD_DATA

exports.canPlay = cardFunctions.basicCanPlay

exports.attack = cardFunctions.basicAttack;

exports.canAttack = cardFunctions.basicCanAttack;

exports.GURUBASHI_ATTACK_BUFF = 3;

exports.castEnchantments = function(rune, state)
{
    RuneVM.executeRune(SetAttack.CreateRune(rune["target"]["cardGuid"], exports.GURUBASHI_ATTACK_BUFF), state);
    RuneVM.executeRune(ModifyAttack.CreateRune(rune["target"]["cardGuid"], rune["source"]["cardGuid"], exports.GURUBASHI_ATTACK_BUFF), state);
}

exports.removeEnchatments = function(card, state)
{
    RuneVM.executeRune(SetAttack.CreateRune(card["cardGuid"], -exports.GURUBASHI_ATTACK_BUFF), state);
}

exports.takeDamage = function (card, amount, source, state){
    card.currentHealth += amount;
    if(card["tags"][cardTags.SILENCE] == undefined)
    {
       RuneVM.executeRune(AddEnchatment.CreateRune(card.cardGuid, card.cardGuid), state);
    }
}

exports.isAlive = cardFunctions.baseIsAlive;