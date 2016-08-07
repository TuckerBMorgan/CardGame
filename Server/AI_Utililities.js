/**
*Title: AI_Utilities.js
*Author: John B. Casey <caseyjohnb@gmail.com><github.com/caseyj>
*Description: Utility functions utlitized mainly by the AI system such
*	As Deep Copy operations for a single card
*
*
*
*
*
*
*
*/


/**
*Creates a deep Copy of a card so we can test some stuff with it before making a big move
*
*Inputs:
	card: a single card that is in play or otherwise
Outputs:
	a deep copy of that card with all fields copied.
*/
var card_Copy = function(card){
	returning_card = Object.keys(card);
	card.foreach(function(element){
		returning_card[element] = card[element];
	})

	return returning_card;
}

/**
*Creates a deep copy of a set of cards, usually for inPlay cards
*Inputs:
	cards: an array of several cards
*Output:
	an array of deep copied cards
*/
var card_Group_Copy = function(cards){
	newGroup = [];
	for(var i = 0; i<=cards.length(); i++){
		newGroup.push(card_Copy(cards[i]));
	}
	return newGroup;
}


/***
*Creates a deep copy of an entire controller(player) so we can test some stuff with it
*
*Inputs:
	controller: a controller which requires deep copy
*Outputs:
	The deep copy of a controller.
*
*/
var deep_Copy_Controller = function(controller){
    var NC = Object.keys(controller);
    //this cant be deep copied, wait maybe it should, or we do some shallow-ish copy on it?
    NC.deck = controller[deck];
    //I'll deep copy this since we can use this as a means to test strength
    mHand = [];
    for(var i = 0; i<=controller[hand].length(); i++){
    	//just push the IDs
    	mHand.push(controller[hand][i]);
    }
    NC.hand = mHand
    //just call the card copy function
    NC.inPlay = card_Group_Copy(controller[inPlay]);
    //go through each grave and push the ID to grave[]
    grave = [];
    for(var i = 0; i<controller.graveyard.length(); i++){
    	//just push the IDs
    	grave.push(controller.graveyard[i]);
    }

    NC.graveyard = grave
    NC.seenCards = card_Copy(controller.seenCards);


    //anything I can easily copy shallow like IDs do it here
    NC.hero = card_Copy(controller.hero);
    NC.name = controller.name;
    NC.type = controller.type;
    NC.guid = controller.guid;
    NC.mana = controller.mana;
    NC.team = controller.team;
    NC.state = controller.state;
    NC.baseMana = controller.baseMana;
    //give us what we want
    return NC;

}