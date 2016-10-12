var control = require('./control')
var entity = require('./entityManager');
var optionsTypes = require('./createOptions')
var playCard = require('./runes/PlayCard')
var ai_utilities = require('./AI_Utililities')


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


/**
*This raw evaluation metric calculates approximately how many turns 
*   it takes for a player with a given board position to win
*   Simple crappy heuristic for now.
*
*/
var evaluate_player_position = function(state, player){
    //enemy minions
    var enemy_minions = entity.getEnemyMinions(player, state);
    //my minions
    var my_minions = entity.returnAllAliveAndOnTeam(player["team"], state);
    //hero HP's
    var enemy_hp = entity.getOtherController(player, state)["hero"]["health"];
    var my_hp = player["hero"]["health"];
    //get taunting minions HP
    var enemy_taunt_hp = 0;
    var enemy_taunters = ai_utilities.checkActiveTaunts(entity.getOtherController(player, state));
    var my_taunt_hp = 0;
    var my_taunters = ai_utilities.checkActiveTaunts(player)
    //get AP of both sides
    var enemy_AP = 0;
    var my_AP = 0;
    //do the loops for AP and taunts
    //enemy AP first
    for(var i = 0; i<enemy_minions.length; i++){
        enemy_AP+=enemy_minions[i]["currentAttack"];
    }
    //friendly AP now
    for(var i = 0; i<my_minions.length; i++){
        my_AP+=my_minions[i]["currentAttack"];
    }
    //now get the taunts, enemies first
    for(var i = 0; i<enemy_taunters.length; i++){
        enemy_taunt_hp+=enemy_taunters[i]["currentHealth"];
    }
    //now for friendly taunt HP
    for(var i = 0; i<my_taunters.length; i++){
        my_taunt_hp+=my_taunters[i]["currentHealth"];
    }

    //do some math
    //their score
    var enemy_score = (my_taunt_hp+my_hp)/(enemy_AP);
    //friendly score
    var my_score = (enemy_taunt_hp+enemy_hp)/(my_AP);
    return my_score - enemy_score;
}

var knapsackMatrix = function(state, controller){
    var controller_guid = controller["guid"];
    if(controller["hand"].length > 0){ 
        //hand sorted by mana cost
        var proto_hand = controller["hand"].sort(function(a,b){return a["cost"]-b["cost"]});
        var max_hand_index = 0;
        for(var i = 0; i<proto_hand.length; i++){
            if(proto_hand[max_hand_index] <= controller["mana"]){
                max_hand_index++;
            }else{
                break;
            }
        }
        //how big my hand is
        var hand_size = max_hand_index; 
        if(hand_size > 0 ){
            //initialize a 2D array
            var super_array = array(hand_size);
            
            //adds an array of size mana  + 1
            for(var i = 0; i<hand_size; i++){
                super_array.push(array(controller["mana"]+1));
             }
             var default_score = evaluate_player_position(state, controller)
            //loop through the 2D array we made
            //first via the hand size which allows looping through the sorted hand
            //  only upto the highest index we can actually play this turn
            for (var i = 0; i<=hand_size; i++){
                //loop through each spot of mana we can
                for(var h = 0; h<=controller.mana; h++){
                    //if we are looking at the first row then these are just the default score and input state
                    if(i < 1){
                        super_array[i][h] = {
                            "currentState" : state,
                            "score" : default_score
                        };                
                    }
                    //otherwise...
                    else{
                        //lets take a look at the only card we really care about
                        var current_card = proto_hand[i-1];
                        //if its less than the ammount of mana we are allowed to play with right now
                        if(current_card["cost"]>=h){
                            var scorecard_above = super_array[i-1][h];
                            var copy_diagonal_left_state = ai_utilities.copy_state(super_array[i-1][h-current_card["cost"]]["currentState"]);
                            //play current card onto copy; 
                            //      Not sure how I want to do this yet, few moving parts using runes but that would be the best way, 
                            //      need to disconnect the connection thing so that this can prototype possible boards
                            var score_diagonal_play = evaluate_player_position(entity.getEntity(controller_guid, copy_diagonal_left_state), copy_diagonal_left_state);
                            //if the earlier score is better than playing the card then we keep it
                            if (scorecard_above["score"] > score_diagonal_play){
                                super_array[i][h] = super_array[i-1][h];
                            }
                            //otherwise we play the card and keep going
                            else{
                                super_array[i][h] = {
                                    "currentState" : copy_diagonal_left_state,
                                    "score" : score_diagonal_play
                                };
                            }
                        }
                        //otherwise...
                        else{
                            super_array[i][h] = super_array[i-1][h]
                        }
                    }
                }
            }
            return super_array
        }
    }
    //return the 2D array
    return false
}


exports.calculateMove = function(controller, options, state) {
  
    //the ai wants to play cards first, so get all playCard options
    var playCard = options.filter(function (element) {
         return (element["option"] == optionsTypes.PLAY_CARD_TYPE);
    })
    
    
    
    var cards = [];
    playCard.forEach(function(element){
        cards.push(entity.getEntity(element.cardGuid, state));
    })
    
    var canPlay = cards.filter(function (element) {
       return element.cost <= mana;
    })  
   
    var mana = controller.mana;
    if(controller.mana == 0 || controller.hand.length == 0)
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
