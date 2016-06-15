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
	Checks if a targettable card has HP <= 0
		Returns True = Dead or False = not quite dead
	'''
	def check_if_dead(self):
		if self.get_HP() <= 0:
			return True
		else:
			return False

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
		self.SLEEP = True
		self.TURN_COUNT = 0

	'''
	Returns the number of turns a minion has been on the field
	'''
	def get_Turn_Count(self):
		return self.TURN_COUNT


	'''
	Returns whether or not the minion is sleeping
	'''
	def get_Sleep(self):
		return self.SLEEP

	'''
	Void function which defines turn transition minion behavior
		if a minion was asleep at the beginning of the turn it is no 
		longer in this condition
	'''
	def turn_plus_plus(self):
		self.TURN_COUNT +=1
		if self.TURN_COUNT > 0:
			self.SLEEP = False
	

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
		self.COST = cost

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

	def fight(self):
		fi = self.Weapon.use_weapon()
		return fi

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
		self.MY_TARGETS = list(self.MY_HERO)
		self.ENEMY_TARGETS = list(self.ENEMY_HERO)

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
	Returns all cards which can be targetted by an enemy player
	'''
	def get_My_Targets(self):
		return self.MY_TARGETS

	'''
	Returns all cards which can be targetted by me
	'''
	def get_My_Enemy_Targets(self):
		return self.ENEMY_TARGETS

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

	'''
	Returns an integer indicating whether or not the game has ended.
		The lose condition is a hero's health dropping to 0
		Returns 1 = I win; -1 = YOU win; 0 = Game in Progress
	'''
	def check_loss(self):
		if self.get_My_Hero().check_if_dead() is True:
			return -1
		elif self.get_My_Enemy_Hero().check_if_dead() is True:
			return 1
		return 0

	'''
	Function defines behaviors for when two minions engage in combat 
		with eachother
		Minion_1 will always be the friendly player
		Minion_2 will always be the enemy
	'''
	def minion_combat(self, Minion_1, Minion_2, M_1_post, M_2_post):
		#get the amount of DMG each minion will do
		Minion_1_DMG = Minion_1.get_AP()
		Minion_2_DMG = Minion_2.get_AP()

		#each minion takes damage
		Minion_1.take_damage(Minion_2_DMG)
		Minion_2.take_damage(Minion_1_DMG)

		#check if anyone is dead?
		Minion_1_alive = Minion_1.check_if_dead()
		Minion_2_alive = Minion_2.check_if_dead()

		#remove deaddies from board
		if not Minion_1_alive :
			self.get_My_Minions().remove(Minion_1)
			self.get_My_Targets().remove(Minion_1)
		if not Minion_2_alive :
			self.get_My_Enemy_Minions().remove(Minion_2)
			self.get_My_Enemy_Targets().remove(Minion_2)
		return True

	'''
	Function defines behaviors for when a minion and hero engage in combat 
		with eachother. 
		False indicates the Hero cannot engage in combat
	'''
	def hero_combat(self, Hero, Minion):
		Hero_DMG = Hero.get_AP()
		if Hero_DMG == 0:
			return False
		else:
			Minion_DMG = Minion.get_AP()

			Hero.take_damage(Minion_DMG)
			Minion.take_damage(Hero.fight())

			#check if win
			Win = self.check_loss()
			if Win == 0 and Minion.get_kind() is 'm':
				#if we still fighting and the enemy minion is dead remove it from the board
				if Minion.check_if_dead():
					self.get_My_Enemy_Minions().remove(Minion)
					self.get_My_Enemy_Targets().remove(Minion)
	#if we successfully went through combat return true just so we know
	return True
