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
		pass
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
		self.Weapon = None

	def get_AP(self):
		if self.Weapon != None:
			return self.Weapon.get_AP()
		else:
			return self.AP


'''
Defines the whole AI copy of the current game in play
'''
class Board():

	def __init__(self, EnemyHero, MyHero, Enemy_minions, My_minions, My_hand, Mana_Max, My_Mana_Now, Enemy_Mana_Now):
		self.ENEMY_HERO = EnemyHero
		self.MY_HERO = MyHero
		self.ENEMY_MINIONS =Enemy_minions
		self.MY_MINIONS = My_minions
		self.MY_HAND = My_hand
		self.MANA_MAX = Mana_Max
		self.MY_MANA_NOW = My_Mana_Now
		self.ENEMY_MANA_NOW = Enemy_Mana_Now

	'''
	returns the enemy hero object
	'''
	def get_My_Enemy_Hero(self):
		return self.ENEMY_HERO

	'''
	returns the list of enemy minions
	'''
	def get_My_Enemy_Minions(self):
		return self.ENEMY_MINIONS

	'''
	returns the object regarding my hero
	'''
	def get_My_Hero(self):
		return self.MY_HERO

	'''
	returns the list of my minions
	'''
	def get_My_Minions(self):
		return self.MY_MINIONS

	'''
	returns the list of cards in my hand
	'''
	def get_My_Hand(self):
		return self.MY_HAND

	'''
	a void function defining what happens when a card is played from hand to field
	'''
	def play_card(self, Card):
		if Card.get_kind() == 'm':
			#add the minion to the field
			self.MY_MINIONS.append(Card)
		elif Card.get_kind() == 's':
			pass
		elif Card.get_kind() == 'w':
			#give the hero a weapon
			self.MY_HERO.Weapon = Card
		#remove the card from the hand
		self.MY_HAND.remove(Card)
		#use the card effect
		Card.use_card()



