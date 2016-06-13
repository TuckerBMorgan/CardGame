'''
Title: Board.py

Language: Python

Author: John B. Casey <caseyjohnb@gmail.com> <github.com/caseyj>

Description: The purpose of this file is to define the functions used to access
	the current board state and return data relevant to items on the board.

'''

'''
Defines a general NULL Card that could be in hand/in play
'''
class CARD():
	def __init__(self):
		self.kind = None
		self.EFFECT = None
		self.COST = 0

	'''
	m->minion
	s->spell
	w->weapon
	h->hero
	'''
	def get_kind(self):
		return self.kind
	
	'''
	Returns the effect of a given card
	'''
	def get_EFFECT(self):
		return self.EFFECT

	'''
	Returns the cost of a given card
	'''
	def get_COST(self):
		return self.COST

	'''
	defines any immediate use behaviors
	'''
	def use_card(self):
		return None

'''
Defines behaviors and features of cards whom can be targetted
'''
class Targetable(CARD):
	def __init__(self):
		self.HP = 0
		self.AP = 0

	'''
	returns a card's current AP
	'''
	def get_AP(self):
		return self.AP

	'''
	Returns a card's current HP
	'''
	def get_HP(self):
		return self.HP

	'''
	defines card behavior during combat
		returns damage done to attacking card
	'''
	def take_damage(self, damage):
		self.HP-=damage
		return self.get_AP


'''
Defines minion cards and their functions
'''
class Minion(Targetable):

	def __init__(self, ap, hp, pwr, cost):
		self.kind = 'm'
		self.AP = ap
		self.HP = HP
		self.EFFECT = pwr
		self.COST = cost
	

'''
defines the object and functions necessary to initialize and utilize spell cards
'''
class Spell(CARD):
	
	def __init__(self, effect, cost):
		self.kind = 's'
		self.EFFECT = effect
		self.COST = cost

'''
Defines the object and functions necessary to initialize and utilize weapon cards
'''
class Weapon(Targetable):

	def __init__(self, ap, use,effect, cost):
		self.kind = 'w'
		self.AP = ap
		self.USE = use
		self.EFFECT = effect
		self.COST = COST

	'''
	returns the number of uses on a weapon
	'''
	def get_USE(self):
		return self.USE

	'''
	Defines card behavior when the weapon is used
	'''
	def use_weapon(self):
		self.USE -=1
		return self.get_AP()

'''
Defines functions and objects associated with heroes
'''
class HERO(Targetable):
	def __init__(self, PWR):
		self.kind = 'h'
		self.HP = 30
		self.EFFECT = PWR

