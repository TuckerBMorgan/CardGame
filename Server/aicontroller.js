var control = require('./control')
var entity = require('./entityManager');
var optionsTypes = require('./createOptions')

exports.calculateMove = function(controller, options, state) {
    
    //the ai wants to play cards first, so get all playCard options
    var playCard = options.filter(function (element) {
         return (element["option"] == optionsTypes.PLAY_CARD_TYPE);
    })
    
    
    
    var cards = [];
    playCard.forEach(function(element){
        cards.push(entity.getEntity(element.cardGuid));
    })
    
    var canPlay = cards.filter(function (element) {
       return element.cost <= mana;
    })  
   
    var mana = controller.mana;
    if(controller.mana == 0)
    {
        return 0;
    }
    
    var playOrder = canPlay.sort(function (a, b) {
        var playCostA = a.baseHealth + a.baseAttack;
        if(a.cost > 0)
        {
            playCostA/=a.cost;
        }
        var playCostB = b.baseHealth + b.baseAttack;
        if(b.cost > 0)
        {
            playCostB /= b.cost;
        }
        if(playCostA > playCostB)
            return 1;
        if(playCostB < playCostA)
            return -1;
         return 0;
    })
    
    var playOption = playOrder[0];
    
    return 1;
}



exports.evaluateMulligan = function (controller, state) {
    var shouldMul = [];
    controller.hand.forEach(function (element, index) {
      if(element.cost > 3){
          shouldMul.push[index];
        }  
    })
    control.executeMulligan(shouldMul, controller, state);
}

exports.processRune = function (rune, state) {
    
}

function dealCard(rune, state){
    
}

function  createCard(rune, state) {
    
}

function  playCard(rune, state) {
    
}

exports.setupAi = function (state) {
    
    state.ai.hands = [];
    state.ai.deck = [];
    state.ai.playArea = [];
    state.ai.otherPlayArea = [];
    
}