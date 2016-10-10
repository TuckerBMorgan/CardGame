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

var entities = require('./entityManager')
var cardTags = require('./cards/cardTags')

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
*Creates a deep copy of a set of cards in an array, also adds them to the entity list
*Inputs:
	cards: an array of several cards
*Output:
	an array of deep copied cards
*/
var card_Group_Copy = function(cards, state){
	//initialize an array 
	var newGroup = [];
	//iterate through all cards of a set
	for(var i = 0; i<=cards.length; i++){
		//take the deep copy of cards[i] and push it into the array
		var nc = card_Copy(cards[i]);
		newGroup.push(nc);
		entities.addEntity(nc, nc["guid"], state);
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
var deep_Copy_Controller = function(controller, state){
    var NC = Object.keys(controller);
    //this cant be deep copied, wait maybe it should, or we do some shallow-ish copy on it?
    NC["deck"] = card_Group_Copy(controller["deck"], state); 

    NC["hand"] = card_Group_Copy(controller["hand"], state);
    //just call the card copy function
    NC["inPlay"] = card_Group_Copy(controller["inPlay"], state);
    //go through each grave and push the ID to grave[]
    NC["graveyard"] = card_Group_Copy(controller["graveyard"], state);
    //must be reworked maybe add an argument to the card copy/groupcopy
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
	var ns_state = {
	    "controllers":{},//by guid look up of all controllers
	    "entities":{},//guid look up for all cards and controllers
	    "connections":[],
	    "controllersByIP":{},
	    "cards":{},//copies of each distinct card used
	    "playersReady":0,
	    "attackedThisTurn":[],//an array of the GUIDs that have gotten into combat this turn
	    "spellEnchantments":{},
	    "preEventListeners":{},
	    "postEventListeners":{},
	    "runes":[]//every rune that is run is tracked here
	}

	//easy
	ns_state["playersReady"] = state["playersReady"];

	//create the new controllers
	//get the old controllers
	var controller_set = Object.keys(state["controllers"]);
	var controllers_ip = Object.keys(state["controllersByIP"]);
	//iterate through the keys
	controller_ip.foreach(function(element){
		//grab the current controller's guid
		var guid = state["controllersByIP"][element]["guid"];
		//create the deep copy
		var controller_DC = deep_Copy_Controller(state["controllersByIP"][element], ns_state);
		//add the deep copy to the controller by IP list
		ns_state["controllersByIP"][element] = controller_DC;
		//add the deep copy to the controller list
		ns_state["controllers"][guid] = controller_DC
		//add this to the entity list
		entity.addEntity( ns_state["controllers"][guid], guid, ns_state); 
	});
	//deep copy the cards
	ns_state["cards"] = card_object_superCopy(state["cards"]);
	//these are integers which do not change
	ns_state["playersReady"] = state["playersReady"];
	for(var i = 0; i<state["attackedThisTurn"].length; i++){
		ns_state["attackedThisTurn"].push(state["attackedThisTurn"][i]);
	}
	//add the connections to the new state
	for(var i = 0; i<state["connections"].length; i++){
		ns_state["connections"].push(state["connections"][i]);
	}
	
	var pre_event_keys = Object.keys(state["preEventListeners"]);
	pre_event_keys.foreach(function(element){
		var listeners = [];
		for(var i = 0; i<= state["preEventListeners"][element]; i++){
			listeners.append(Object.assign({}, state["preEventListeners"][element][i]));
		}
		ns_state["preEventListeners"][element] = listeners;
	});
	var pre_event_keys = Object.keys(state["postEventListeners"]);
	post_event_keys.foreach(function(element){
		var listeners = [];
		for(var i = 0; i<= state["postEventListeners"][element]; i++){
			listeners.append(Object.assign({}, state["postEventListeners"][element][i]));
		}
		ns_state["postEventListeners"][element] = listeners;
	});

	//ignore runes for now
	return new_state;
}

/**
*Takes in a state object and creates a new object populated by completely 
	replaying and executing every rune executed on the existing state
*
*
*
*/
var copy_state_by_replay = function(state){
	//empty state
	var new_State = {
		"controllers":{},//by guid look up of all controllers
	    "entities":{},//guid look up for all cards and controllers
	    "connections":[],
	    "controllersByIP":{},
	    "cards":{},//copies of each distinct card used
	    "playersReady":0,
	    "attackedThisTurn":[],//an array of the GUIDs that have gotten into combat this turn
	    "spellEnchantments":{},
	    "preEventListeners":{},
	    "postEventListeners":{},
	    "runes":[]
	}

	//grab the only things that we cannot grab from running the runes
	for(var i = 0; i<state["connections"]; i++){

	}

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

