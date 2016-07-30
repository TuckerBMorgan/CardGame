var control = require('./control')
var entity = require('./entityManager');
var optionsTypes = require('./createOptions')


/*
*Compares two given cards to determine relative power efficiency
*GREEDILY assumes lower mana = less power so it returns -1
*
*Returns integer associated with strength:
*   -1 = card A <= B
*   +1 = card A > B
*/
var MINION_card_comparator = function(card_A, card_B){
    if(card_A[cost] < card_B[cost]){
        return -1;
    }
    if(card_A[cost] > card_B[cost]){
        return 1;
    }
    else{
        if (card_A[baseAttack] <= card_B[baseAttack]) {
            return -1;
        }
        if(card_A[baseAttack] > card_B[baseAttack]){
            return 1;
        }
    }
}



var hand_Sort = function(rune, state){
    hand = state.controllers[rune.controllerGuid].hand
    Meta_Hand; //function call here to get all GUIDs from the hand and turn them into readable cards
    //sortcall = sort_somehow(Meta_Hand); here 
    //return sortcall;
}


/**
*This raw evaluation metric calculates approximately how many turns 
*   it takes for a player with a given board position to win
*
*
*/
var evaluate_player_position = function(state, player){
    //enemy minions
    //enemy hp

    //my minions
    //my hp

    //enemy taunts
    //my taunts

    // return ((thier_taunt+theirhp)/sum(my_minions_ap))
}


/*
*Negative return indicates Stronger enemy player position
*
*
*
*/
var evaluate_position = function(state){
    var player1 = evaluate_player_position(state, /*player1*/);
    var player2 = evaluate_player_position(state, /*player2*/);

    return player1 - player2;
}

var knapsackMatrix = function(state){
    //get hand
    //get playable cards inhand
    //if playable > 0 
        //2D array of states [maxMana][Cards]
        //for i in Mana
            //for h in cards
                //if h can be played
                    //deepcpy state of [i][h-1]
                    //playcard on this deepcpy
                    //record score and board
                    //if score > score[i][h-1]
                        //store this board as [i][h]
                    //else 
                        //store [i][h-1] as [i][h]
                //else
                    //board at [i-1][h] is stored as [i][h]
    //return the board
}


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


    //Okay we have a set of cards that can be played and a sort based upon 

    
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