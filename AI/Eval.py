'''
Title: Eval.py

Language: Python

Author: John B. Casey <caseyjohnb@gmail.com> <github.com/caseyj>

Description: The purpose of this file is to define the evaluation function
	used by the agent.py file in order to rank and determine the optimal play 
	during a given turn.

'''

'''
IMPORTS LIST:

Board.py (In this file set)

'''
import Board.py




'''
Determines if a monster should be played given how strong they are,
	and how many resources are used. Does not take into account
	play combinations, future version will require this addition
Inputs:
Outputs: A long indicating the strength of the card that is played,
	with hopes that by minimizing the score 
'''
def eval_monster_play_empty_board(Minion, resources):
	#how far this card is from the best possible stats
	distance = (((11-Minion.get_HP())**2)+((11-Minion.get_AP())**2))**(1/2)
	#the usage of resources to how many are available
	cost_to_res = long(Minion.get_Cost()/resources)
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
	att_hp_to_en_ap = target.get_AP() - attacker.get_HP()
	#determines enemy survival chance
	en_hp_to_att_ap = attacker.get_AP() - target.get_HP()
	return att_hp_to_en_ap, en_hp_to_att_ap

'''
Scores the board between the two players, the score provided is in terms of the
	player who runs this algorithm.
Input: 
	board: The current board and it's states
Output:
	An absolute valued score for each player on a given move/turn/play
'''
def eval_board(board):
	#get the data structure for player 1's minions and then their summed AP and HP
	player1_minions
	p1_minion_str = sum(player1_minions[:].AP)
	p1_minion_health = sum(player1_minions[:].HP)
	#get the data structure for player 2's minions and then their summed AP and HP
	player2_minions
	p2_minion_str = sum(player2_minions[:].AP)
	p2_minion_health = sum(player2_minions[:].HP)
	#get the data structure for any taunts active for player 1
	p1_taunts
	p1_taunt_hp = sum(p1_taunts[:].HP)
	#get the data structure for any taunts active for player 2
	p2_taunts
	#get the data structure for any weapons active for player 1
	p1_weap
	#get the data structure for any weapons active for player 2
	p2_weap
	#get the likely ammount of mana for both players
	turn
	#get the HP remaining for each player
	p1_HP
	p2_HP
	
	#Equation here
	return 0#placeholder

'''
Implements a knapsack solution to choose which cards will get played from the hand this turn
Inputs:
	board: The current board and it's states
Output:
	the list of cards which will be played this turn, this includes spells, not just minions
'''
def knapsack_hand(board, my_resources):
	return [0][0]