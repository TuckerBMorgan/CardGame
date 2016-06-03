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
Determines
'''
def eval_combat(attacker, target):
