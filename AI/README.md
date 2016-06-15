README.md

AI systems

The following files in this directory are responsible for running the AI 
	copy of the game as well as creating the learning and decision model.

Board.py
	Description: The purpose of this file is to define the functions used to access
	the current board state and return data relevant to items on the board. Including
	the basic objects which comprise a card set and functions needed to use their 
	actions.

	Objects and their functions:
		Card() with features kind, EFFECT, and COST:
			get_kind()<-returns what type of card it is
			get_EFFECT()<-returns the effect the card has on the board
			get_COST()<-returns the cost of playing the card from the hand
			use_card()<-utilizes the effect the card has and manipulates the board
		Spell(effect, cost) inherits from Card() with kind = 's'
		Targettable() inherits from Card() with additional features AP and HP:
			get_AP()<-returns the card's AP
			get_HP()<-returns the card's HP
			take_damage(damage)<-sets the card's HP as a result of combat and returns it's AP
			check_if_dead()<-returns a boolean indicating if the Card is considered dead, True if dead, false if not
		Minion(ap, hp, pwr, cost) inherits from Targettable() with kind = 'm' and features SLEEP and TURN_COUNT:
			get_Turn_Count()<-returns the number of turns the minion has been in play
			get_Sleep()<-returns whether or not the minion is sleeping, True if sleeping, and cannot attack, false if otherwise
			turn_plus_plus()<-increments the turn counter, if the minion has been on the field atleast 1 turn it may attack
		Weapon(ap, hp, use, effect, cost) inherits from Targettable() with kind = 'w' with feature USE:
			get_Use()<-returns how many uses a weapon has before breaking
			use_weapon()<-subtracts 1 from the use integer on the weapon and returns the weapon AP
		HERO(PWR) inherits from Targettable() with type 'h' with feature WEAPON:
			get_AP()<-overrided for Hero use. Checks if there is a weapon, returns that AP, otherwise, returns 0
			fight()<-calls Weapon()'s use_weapon and returns it's return value
		Board(EnemyHero, MyHero, Enemy_minions, My_minions, My_hand, Mana_Max, My_Mana_Now, Enemy_Mana_Now) with features accessed by:
			get_My_Enemy_Hero()<-returns the enemy hero object and it's data
			get_My_Enemy_Minions()<-returns the list of enemy minions
			get_My_Hero()<-returns my hero object
			get_My_Minions()<-returns the list of my minions
			get_My_Hand()<-returns the list of Card()'s in my hand
			get_My_Targets()<-returns all my cards which can be targetted in combat
			get_My_Enemy_Targets()<-returns all of the enemy cards which can be targetted in combat
			play_card(Card)<-uses a card in my hand and plays it's effects to modify the board whilst removing it from my hand
			check_loss()<-Returns 1 = I win; -1 = YOU win; 0 = Game in Progress
			minion_combat(Minion_1,Minion_2)<-conducts combat between two minions, Minion_1 is the friendly minion, Minion_2 is the enemy minion
			hero_combat(Hero, Minion, Hero_att<-returns true if combat worked, returns false if the Hero cannot attack
