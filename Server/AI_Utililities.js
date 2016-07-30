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
*
*/
var card_Copy = function(card){
	returning_card = Object.keys(card);
	card.foreach(function(element){
		returning_card[element] = card[element];
	})

	return returning_card;
}

/***
*Creates a deep copy of an entire controller(player) so we can test some stuff with it
*
*
*
*
*/
var deep_Copy_Controller = function(controller){
    var NC = Object.keys(controller);
    //this cant be deep copied, wait maybe it should, or we do some shallow-ish copy on it?
    deck = controller[deck];
    hand = 
}