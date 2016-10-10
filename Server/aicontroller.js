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
    //hand sorted by mana cost
    var proto_hand = controller["hand"].sort(function(a,b){return a["cost"]-b["cost"]});
    //how big my hand is
    var hand_size = proto_hand.length; 
    //initialize a 2D array
    var super_array = array(controller.mana+1);
    
    //adds an array of size (hand size) + 1
    for(var i = 0; i<hand_size+1; i++){
        super_array.push(array(hand_size+1));
     }
    //check if we have a hand even existing, if we do then we can keep going
    if(hand_size > 0){ 
        for (var i = 0; i<=hand_size; i++){
            for(var h = 0; h<controller.mana; h++){
                if(i < 1){
                    super_array[h][i] = {
                        "currentState" : ai_utilities.copy_state(state),
                        "score" : evaluate_player_position(state, controller)
                    };                
                }
                else{
                    var current_card = proto_hand[i];
                    if(current_card["cost"]>=h){
                        //deepcpy state of [i][h-1]
                        //modify if possible
                        //deepcpy state of [i-1][h]
                        //playcard on this deepcpy
                        //record score and board
                        //if score > score[i][h-1]
                            //store this board as [i][h]
                        //else 
                            //store [i][h-1] as [i][h]}
                    }
                    else{
                        super_array[h][i] = super_array[i-1][h]
                    }
                }
            }
        }
    }
    //return the 2D array
    return super_array
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
