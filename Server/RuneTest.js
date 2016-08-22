/**
*Title: RuneTest.js
*
*Authors: John B. Casey <github.com/caseyj><caseyjohnb@gmail.com>
		  Tucker B. Morgan <><>
*
*Description: Test suite functions for making sure runes work.
*
*
*/

/**
*Creates an "empty" dictionary based upon whether or not a GUID appears 
*	We set that GUID's value to 0, another function counts
*
*Inputs: 
	GUIDs->array of GUIDs in a segment of play 
*Outputs:
	a Javascript MAP from <Integer GUID, Integer Count> where counts are 0
*/
var GUID_Dictionary = function(GUIDs){
	//creates a new map which will act like a dictionary
	var dict = new Map();
	//loop through the GUIDs in this set
	for(var i = 0; i<GUIDs.length; i++){
		//skip if we have seen it
		if(dict.has(GUIDs[i])){
			continue;
		}
		//if we havent already set this GUID
		else{
			dict.set(GUIDs[i], 0);
		}
	}
	return dict
}

/**
*Takes in a map and returns the keys of the map
*
*Inputs:
	Map which holds the keys we which to lift
*Outputs:
	An array of keys from the Map that we can actually use
*/
var grab_keyRing = function(mapps){
	//keys we wish to return
	var keyset = [];
	//the iterator we are concerned with
	var KeyIterator = mapps.keys();
	//iterate until null
	var curVal = KeyIterator.next();
	var done = curVal.done;
	while(!done){
		//add the key to the keyset
		keyset.push(curVal.value);
		//increment and now check if we are done incrementing
		curVal = KeyIterator.next();
		done = curVal.done;
	}
	return keyset;
}

/**
*creates a superDictionary of the keys from both dictionaries
	superDictionary is initialized with 0 as all key values 
*
*Inputs:
	GUID_DICT_A->The dictionary produced from location A
	GUID_DICT_B->The dictionary produced from location B
*Outputs:
	A Javascript MAP from <Integer GUID, Integer Count> where counts are 0
*/
var GUID_Keyshare = function(GUID_DICT_A, GUID_DICT_B){
	//initialize the big dictionary we wish to produce
	var superDictionary = new Map();
	var keyset_A = grab_keyRing(GUID_DICT_A);
	var keyset_B = grab_keyRing(GUID_DICT_B);
	//iterate through the first map keys and set each entry to 0 in the super
	for(var i = 0; i<keyset_A.length; i++){
		//if we have already seen it ignore, otherwise:
		if(!superDictionary.has(keyset_A[i])){
			superDictionary.set(keyset_A[i], 0);
		}
	};
	//iterate through the second map keys and set each entry to 0 in the super
	for(var i = 0; i<keyset_B.length; i++){
		//if we have already seen it ignore, otherwise:
		if(!superDictionary.has(keyset_B[i])){
				superDictionary.set(keyset_B[i], 0);
		}
	};
	//return it
	return superDictionary;
}

/**
*Counts instances of a GUID in a MAP. Preferably this is the
	SuperDictionary we defined in the last function
*
*Inputs:
	GUIDs->An integer array of GUIDs in an area of play
	GUID_Super_Dict->a mapping between GUID and occurrances of GUID, init to 0
*Outputs:
	a modified GUID_Super_Dict with counts for each occurrance of a GUID
		From the GUIDs input 
*
*/
var GUID_Count = function(GUIDs, GUID_Super_Dict){
	//iterate through all GUIDs in a GUID set
	for(var i = 0; i<GUIDs.length; i++){
		//increment each GUID value in the dict by 1
		GUID_Super_Dict.set(GUIDs[i], (GUID_Super_Dict.get(GUIDs[i]) + 1));
	}
	//return the changed super dict
	return GUID_Super_Dict;
}

/**
*Takes in two sets of GUIDs from the same field for comparison, 
	if the comparison shows there is a difference in GUID counts
	between the two sets, the function returns the GUID.
	If no difference is found -1 is returned
*
*Inputs:
	GUID_setA->The GUIDs from a single set
	GUID_setB->The GUIDs from a second set
*Outputs:
	Either a GUID shared by both sets and is in difference of abs(1)
		OR -1 indicating no difference in either set
*/
var GUID_Compare = function(GUID_setA, GUID_setB){
	//init how we will track a found GUID difference with -1
	var GUID_found = -1;
	//initialize a superdictionary for each of the GUID sets
	var superDictionary_One = GUID_Count(
		GUID_setA,
		GUID_Keyshare(
			GUID_Dictionary(GUID_setA),
			GUID_Dictionary(GUID_setB)
		)
	);
	var superDictionary_Two = GUID_Count(
		GUID_setB,
		GUID_Keyshare(
			GUID_Dictionary(GUID_setA),
			GUID_Dictionary(GUID_setB)
		)
	);

	//now that thats done
	//get all GUIDs and iterate through
	allKeys = GUID_Keyshare(GUID_Dictionary(GUID_setA), GUID_Dictionary(GUID_setB)).keys();
	
	for(var i = 0; i<allKeys.length; i++){
		//get the absolute value  of the difference between the counts from each superDictionary
		var difference = abs(superDictionary_One.get(allKeys[i]) - superDictionary_Two.get(allKeys[i]));
		//if it equals 1 we will set the GUID_found to the GUID
		if(difference==1){
			GUID_found = entry;
		};
	};
	return GUID_found;
}

/**
*Proves using ~MATH~(I know its magic too!) that a card has moved from Area 1 to
	area 2. This is done with if A = B and B=C then A=C logic
*
*Inputs:
	Card_Area_1_Before->a set of GUIDs from the before of a card movement in set 1(transmitting set)
	Card_Area_1_After->a set of GUIDS from the after of a card movement in set 1(transmitting set)
	Card_Area_2_Before->a set of GUIDs from the before of a card movement in set 2(recieving set)
	Card_Area_2_After->a set of GUIDs from the after of a card movement in set 2(recieving set)
*Outputs:
	True->the GUID or lack of GUID is present in both and will either be GUID==GUID or -1==-1
	FALSE->There was no movement between these sets/an error has occurred
*/
var Card_Movement_Proof= function(Card_Area_1_Before,Card_Area_1_After, Card_Area_2_Before, Card_Area_2_After){
	var card_Area_1_Movement = GUID_Compare(Card_Area_1_Before, Card_Area_1_After);
	var Card_Area_2_Movement = GUID_Compare(Card_Area_2_Before, Card_Area_2_After);
	return card_Area_1_Movement == Card_Area_2_Movement;
}

/**
*Takes a controller and returns an integer array of card GUIDs in the grave
*
*Inputs:
	A valid controller which we can pull a list of GUIDs in the grave
*Output:
	An integer array of GUIDs in the graveyard
*/
var get_grave_GUIDs = function(controller){
	return controller.graveyard; 
}

/**
*Takes a controller and returns an integer array of card GUIDs in the hand
*
*Inputs:
	A valid controller which we can pull a list of GUIDs in the hand
*Output:
	An integer array of GUIDs in the hand
*/
var get_hand_GUIDs = function(controller){
	return controller.hand;
}

/**
*Takes a controller and returns an integer array of card GUIDs in the field
*
*Inputs:
	A valid controller which we can pull a list of GUIDs in the field
*Output:
	An integer array of GUIDs in the field
*/
var get_field_GUIDs = function(controller){
	return controller.inPlay;
}


/**
*Function which returns true if card movement functions work
*
*/
var card_Move_Test = function(){
	var cg1b = [1111,2222,3333,4444];
	var cg1b2 = [2222,3333,4444];
	var cg2b = [0,1];
	var cg2b2 = [0,1,1111];
	var cg12b = [0,1,1111,2222,3333,4444];


	//test that our GUID Dictionary works
	var cg1b_dict_keys = GUID_Dictionary(cg1b);
	var cg2b_dict_keys = GUID_Dictionary(cg2b);
	var keys = [];
	var keyset = cg1b_dict_keys.keys();

	console.log(GUID_Keyshare(cg1b_dict_keys, cg2b_dict_keys));
	console.log(grab_keyRing(GUID_Keyshare(cg1b_dict_keys, cg2b_dict_keys)).sort(), cg12b);
	console.log(GUID_Compare(cg1b, cg2b));
	console.log(Card_Movement_Proof(cg1b,cg1b2, cg2b, cg2b2));
	return (Card_Movement_Proof(cg1b,cg1b2, cg2b, cg2b2))
}

card_Move_Test();

/**
*Boolean returns true if damage between minions has correctly been accounted for
*
*Inputs:
	Minion1_Before->the first minion to enter combat, before action
	Minion1_After->the first minion to enter combat, after action
	Minion2_Before->the second minion to enter combat, before action
	Minion2_After->the second minion to enter combat, after action
*Outputs:
	Boolean indicating that card combat has occurred correctly
*
*/
var testDamage = function(){

}

