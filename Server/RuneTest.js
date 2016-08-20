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
	//iterate through the first map keys and set each entry to 0 in the super
	GUID_DICT_A.keys().forEach(function(entry){
		//if we have already seen it ignore, otherwise:
		if(!superDictionary.has(entry)){
			superDictionary.set(entry, 0);
		}
	});
	//iterate through the second map keys and set each entry to 0 in the super
	GUID_DICT_B.keys().forEach(function(entry){
		//if we have already seen it ignore, otherwise:
		if(!superDictionary.has(entry)){
				superDictionary.set(entry, 0);
		}
	});
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
	allKeys.forEach(function(entry){
		//get the absolute value  of the difference between the counts from each superDictionary
		var difference = abs(superDictionary_One.get(entry) - superDictionary_Two.get(entry));
		//if it equals 1 we will set the GUID_found to the GUID
		if(difference==1){
			GUID_found = entry;
		};
	});
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