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
def eval_monster_play_empty_board(Minion, Board):
	#how far this card is from the best possible stats
	distance = (((11-Minion.get_HP())**2)+((11-Minion.get_AP())**2))**(1/2)
	#the usage of resources to how many are available
	cost_to_res = long(Minion.get_Cost()/Board.get_My_Mana())
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
def eval_survivability(attacker, target):
	#determines attacker survival chance
	att_hp_to_en_ap = target.get_AP() - attacker.get_HP()
	#determines enemy survival chance
	en_hp_to_att_ap = attacker.get_AP() - target.get_HP()
	return att_hp_to_en_ap, en_hp_to_att_ap

'''
Defines an evaluation of board positions for the AI player
	This value should be minimized every turn!
'''
def my_threat(board):
	#get how much I can possibly do damage with 
	active_ap = sum(Minion.get_AP() for Minion in board.get_My_ATTACKERS())
	#check if taunts are active, if not it will be true!
	is_taunt = board.check_attackable_enemy()
	if is_taunt:
		#how many turns can I finish my opponent in with my current set up
		return long(board.get_My_Enemy_Hero().get_HP()/active_ap)
	else:
		enemy_min_survival = sum(Minion.get_HP() for Minion in board.get_My_Enemy_Targets())
		#how many turns I can finish an opponent in given 
		return long(board.get_My_Enemy_Hero().get_HP()/(active_ap - enemy_min_survival))

'''
Defines an evaluation of board positions for the AI player
	This value should be maximized every turn!
'''
def enemy_threat(board):
	#get how much I can possibly do damage with 
	active_ap = sum(Minion.get_AP() for Minion in board.get_My_Minions())
	#check if taunts are active, if not it will be true!
	is_taunt = board.check_attackable_hero()
	if is_taunt:
		#how many turns can I finish my opponent in with my current set up
		return long(board.get_My_Hero().get_HP()/active_ap)
	else:
		enemy_min_survival = sum(Minion.get_HP() for Minion in board.get_My_Targets())
		#how many turns I can finish an opponent in given 
		return long(board.get_My_Hero().get_HP()/(active_ap - enemy_min_survival))




'''
Defines a function in which battle order occurs and which minions do battle to the enemy
'''
def pairs(board):
	pass

'''
Scores the board between the two players, the score provided is in terms of the
	player who runs this algorithm.
Input: 
	board: The current board and it's states
Output:
	An absolute valued score for each player on a given move/turn/play
'''
def eval_board(board):
	enemy = enemy_threat(board)
	me = my_threat(board)
	pass
'''
An easy way to rank and select board actions
'''
class Evaluation():
	def __init__(self, board, moves):
		BOARD = board
		score = eval_board(board)
		instruction_Set = moves

'''
Implements a knapsack solution to choose which cards will get played from the hand this turn
Inputs:
	board: The current board and it's states
Output:
	the list of cards which will be played this turn, this includes spells, not just minions
'''
def knapsack_hand(board):
	size_Hand = len(board.get_My_Hand())
	My_knapsack = [[0]*board.get_My_Mana() for _ in range(size_Hand)]


	return [0][0]