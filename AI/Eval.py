'''
Title: Eval.py

Language: Python

Author: John B. Casey <caseyjohnb@gmail.com> <github.com/caseyj>

Description: The purpose of this file is to define the evaluation function
	used by the agent.py file in order to rank and determine the optimal play 
	during a given turn.

'''

'''
Determines if a monster should be played given how strong they are,
	and how many resources are used. Does not take into account
	play combinations, future version will require this addition

Inputs:
Outputs: A long indicating the strength of the card that is played,
	with hopes that by minimizing the score 
'''
def eval_monster_play_empty_board(my_hp, my_ap, resources, cost):
	#how far this card is from the best possible stats
	distance = (((11-my_hp)**2)+((11-my_ap)**2))**(1/2)
	#the usage of resources to how many are available
	cost_to_res = long(cost/resources)
	#return the ratio of the distance to the usage ratio, this should be minimized
	return distance/cost_to_res

'''
Scores a possible instance of combat between an attacking minion and it's target.
	This is put out as a tuple for later analysis.
Input:
	attacker: the object representing the attacking minion
	target: the object representing the target
Outputs: A tuple representing the difference between the attacker and
	target outcomes
'''
def eval_combat(attacker, target):
	#determines attacker survival chance
	att_hp_to_en_ap = target.AP - attacker.HP
	#determines enemy survival chance
	en_hp_to_att_ap = attacker.AP - target.HP
	return att_hp_to_en_ap, en_hp_to_att_ap

'''
Scores the board between the two players, the score provided is in terms of the
	player who runs this algorithm.
Input: 
Output:
'''
def eval_board(board):
	#get the data structure for player 1's minions and then their summed AP and HP
	player1_minions
	p1_minion_str = sum(player1_minions[1:].AP)
	p1_minion_health = sum(player1_minions[1:].HP)
	#get the data structure for player 2's minions and then their summed AP and HP
	player2_minions
	p2_minion_str = sum(player2_minions[1:].AP)
	p2_minion_health = sum(player2_minions[1:].HP)
	#get the data structure for any taunts active for player 1
	p1_taunts
	#get the data structure for any taunts active for player 2
	p2_taunts
	#get the data structure for any weapons active for player 1
	p1_weap
	#get the data structure for any weapons active for player 2
	p2_weap
	#get the likely ammount of mana for both players
	turn
	#Equation here
	return 0#placeholder
