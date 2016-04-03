var control = require('./control')
exports.calculateMove = function(state) {
    
    
           
}



exports.evaluateMulligan = function (controller, state) {
    var shouldMul = [];
    controller.hand.forEach(function (element, index) {
      if(element.cost > 3){
          shouldMul.push[index];
        }  
    })
    var mul = {
        "type":"mulligan",
        "index":shouldMul
    }
    var socket = {
        "remoteAddress":"00-00-00"
    }
    
    //a full hack to get this to work, need a much better system 
    control.routing(JSON.stringify(mul), socket);
    
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