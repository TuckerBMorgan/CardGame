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

/*
*An easy to utilize prototype for a hand card all it contains are GUID and mana
*
*
*

var hand_Card_Prototype ={
	guid = GUID,
	mana = 0
};
*/

/*
*Returns true if the card is taunting
*
*Inputs:
	card->The card currently being checked
*Outputs:
	True if the card is taunting
	False if the card is not taunting
*/
var checkTaunt = function(card){
	return card["tags"][cardTags.TAUNT];
}

/*
*Returns true if the card is silenced
*
*Inputs:
	card->The card currently being checked
*Outputs:
	True if the card is silenced
	False if the card is not silenced
*/
var checkSilence = function(card){
	return card["tags"][cardTags.SILENCE];
}

/*
*Returns an array of all of the actively taunting cards in a controller
*
*Inputs:
	controller->the controller which we are checking for active taunts
*Outputs:
	an array of card objects which are currently actively taunting the field
*/
var checkActiveTaunts = function(controller){
	//open array
	var activeTaunts = [];
	//lets store the location we are pulling from
	var inPlayers = controller["inPlay"];
	//iterate through the cards
	for(var i = 0; i<inPlayers.length; i++){
		//keep the current card closeby
		var currentCard = inPlayers[i];
		//add the current card if its not silenced and not taunting 
		if(checkSilence(currentCard)==false && checkTaunt(currentCard)==true){
			activeTaunts.push(currentCard);
		}
	}
	//return whatever is in the array
	return activeTaunts;
}

/*
*Returns the integer strength of a set of cards in play
*
*Inputs:
	cardSet->the set of cards which we are checking for AP
*Outputs:
	an integer indicating the sum AP on inplay cards
*/
var getActiveAP = function(cardSet){
	//getAP
    AP = 0;
    for(var i = 0; i<cardSet.length; i++){
        AP+=cardSet[i]["totalAttack"];
    }
	//return whatever is in the array
	return AP;
}

/*
*Returns the integer hit points of a set of cards in play
*
*Inputs:
	cardSet->the set of cards which we are checking for AP
*Outputs:
	an integer indicating the sum HP on inplay cards
*/
var getActiveHP = function(cardSet){
	//getAP
    HP = 0;
    for(var i = 0; i<cardSet.length; i++){
        HP+=cardSet[i]["currentHealth"];
    }
	//return whatever is in the array
	return HP;
}


/*
*An easy to utilize prototype creation function
*Inputs:
	guid-> the ID of the card we want to prototype
*Outputs:
	the prototype 
*
*/
var makeHandProto = function(guid){
	//load the card into local memory
	var card = util.loadCard(guid);
	//take the guid and cost of the card and those are the two features of the prototype
	proto = {
		 "guid":guid,
		 "mana":card["cost"]
		};
	//return this object
	return proto;
}

/*
*easily creates a useable "proto-hand" which will be used to determine
*	which cards should be played on a particular turn
*
*Inputs:
	controller->a controller object with hand data
*Outputs:
	the proto-hand sorted by mana-costim
*/
var protoHand = function(controller){
	//initialize a new array
	var hand_set = [];
	//loop over each card in the hand
	for(var i = 0; i <= controller["hand"].length; i++){
		//create a new proto-card and add it to our "hand"
		hand_set.push(makeHandProto(controller["hand"][i]));
	}
	//sorts the list by mana cost
	hand_set.sort(function(alpha, beta){return alpha["mana"] - beta["mana"]});
	//give us back the sorted protohand
	return hand_set;
}


/**
*Creates a deep Copy of a card so we can test some stuff with it before making a big move
*
*Inputs:
	card: a single card that is in play or otherwise
Outputs:
	a deep copy of that card with all fields copied.
*/
var card_Copy = function(card){
	//grab each of the keys/elements for a card object
	returning_card = Object.keys(card);
	//iterate through the keys
	card.foreach(function(element){
		//push the value of the key from the source to the key of the target
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
	//initialize an array 
	var newGroup = [];
	//iterate through all cards of a set
	for(var i = 0; i<=cards.length; i++){
		//take the deep copy of cards[i] and push it into the array
		newGroup.push(card_Copy(cards[i]));
	}
	return newGroup;
}

/**
*Returns a deep copy of the CARDS property in the most recent
*	version of the state object (as of 9/16/2016)
*
*INPUTS:
	card_set: the object set of card variables 
*
*
*/
var card_object_superCopy = function(card_set){
	//create the new object set
	var new_card_set = {};
	//get the keys for the object
	var key_set = Object.keys(card_set);
	//iterate through the keys
	for(var i = 0; i< key_set.length; i++){
		//set the new object key with a copy of the card at that key location
		new_card_set[key_set[i]] = Object.assign({}, card_set[key_set[i]]);
	}
	//return the copy of the cards
	return new_card_set;
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
    NC["deck"] = controller["deck"];
    //I'll deep copy this since we can use this as a means to test strength
    var mHand = [];
    for(var i = 0; i<=controller["hand"].length; i++){
    	//just push the IDs
    	mHand.push(controller["hand"][i]);
    }
    NC["hand"] = mHand
    //just call the card copy function
    NC["inPlay"] = card_Group_Copy(controller["inPlay"]);
    //go through each grave and push the ID to grave[]
    var grave = [];
    for(var i = 0; i<controller["graveyard"].length; i++){
    	//just push the IDs
    	grave.push(controller["graveyard"][i]);
    }

    //set of GUIDs that are dead
    NC["graveyard"] = grave;
    //set of booleans mapped to their GUIDs
    NC["seenCards"] = card_Copy(controller["seenCards"]);


    //anything I can easily copy shallow like IDs do it here
    NC["hero"] = card_Copy(controller.hero);
    NC["name"] = controller["name"];
    NC["type"] = controller["type"];
    NC["guid"] = controller["guid"];
    NC["mana"] = controller["mana"];
    NC["team"] = controller["team"];
    NC["state"] = controller["state"];
    NC["baseMana"] = controller["baseMana"];
    //give us what we want
    return NC;

}

/**
*Creates a deep copy of a state object, this is really really complicated
*
*Inputs:
	state: the state we wish to see copied so we can manipulate it
*Outputs:
	A deep copy of the state in need of copying
*/
var copy_state = function(state){
	var new_state = {};
	var new_controllers = {};
	var new_entities = {};
	var new_connections = [];
	var new_controllers_by_ip = {};
	var new_cards = {};
	var new_attackedThisTurn = [];
	//easy
	new_state["playersReady"] = state["playersReady"];

	//create the new controllers
	//get the old controllers
	var controller_set = Object.keys(state["controllers"]);
	//iterate through the keys
	controller_set.foreach(function(element){
		//push the deep copy of the key's value from the source to the key of the target
		new_controllers[element] = deep_Copy_Controller(controller_set[element]);
		
		//add this to the entity list
		new_entities[new_controllers[element]["guid"]] = new_controllers[element];
		
		//iterate through the inplay cards and add them to the entity list
		for(var i = 0; i<new_controllers[element]; i++){
			new_entities[new_controllers[element]["cardGuid"]] = new_controllers[element]["inPlay"][i];
		}

		

	})
	//set the new state's controllers
	new_state["controllers"] = new_controllers;
	//iterate through the entirety of the entity super object and deep copy anything 
		//non existent in the recieving entity list
	original_guid_list = Object.keys(state["entities"]);
	//iterate through the keys
	state["entities"].foreach(function(element){
		//if the key already exists in the entity list SKIP!
		if(element in new_entities){
			continue;
		}
		//otherwise we have to generate a new card for it! 
		else{
			new_entities[element] = card_Copy(state["entities"][element]);
		}
	}
	new_state["entities"] = new_entities;
	new_state["cards"] = card_object_superCopy(state["cards"]);



	return new_state;
}

/**
*Turns two large JSON objects into strings and then compares
*
*Inputs:
	va->the first JSON object we wish to compare with
	vb->the second JSON object we wish to compare with
*Output:
	a boolean indicating whether the objects are equivalent.
*/
function compare_copies(va, vb){
	va_string = JSON.stringify(va);
	vb_string = JSON.stringify(vb);
	return ((va_string.localeCompare(vb_string)) == 0);
}

