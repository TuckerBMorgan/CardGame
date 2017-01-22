using UnityEngine;
using System;
using System.Collections;
using System.Collections.Generic;

//Simple box we are using to define the play area


public class Box
{
    private float top;
    private float bottom;
    private float left;
    private float right;


    public Box(float top, float bottom, float left, float right)
    {
        this.top = top;
        this.bottom = bottom;
        this.left = left;
        this.right = right;
    }

    public bool Contains(Vector3 pos)
    {

        if(pos.x >=left && pos.x <= right && pos.y <= top && pos.y >= bottom)
        {
            return true;
        }

        return false;
    }
}

public class PlayArea : MonoBehaviour
{
    
    public static string CARD_AVATAR_PREFAB_LOCATION = "CardAvatar";

    private Dictionary<string, List<CardAvatar>> playFields;
    private Dictionary<string, List<CardAvatar>> playHands;
    private string homeGuid;
    public string HomeGuid { get { return homeGuid; } }
    private string awayGuid;
    public string AwayGuid { get { return awayGuid; } }
    private Box box;
    private bool gameStarted;

    public static PlayArea Singelton;

    public int MulliganCount { get; private set; }
    private List<int> indexes;

	public int GetPossibleCardIndex(CardAvatar placingCard)
	{
		if (playFields [homeGuid].Count == 0) 
		{
			return 0;
		}

		List<CardAvatar> checkCards = playFields [homeGuid];

		for (int i = 0; i < checkCards.Count; i++) 
		{
			if (checkCards [i].transform.position.x > placingCard.transform.position.x) 
			{
				return i;
			}
		}
		return checkCards.Count;
	}


    public void Setup()
    {

        gameStarted = false;   
        Singelton = this;

        RuneManager.Singelton.AddListener(typeof(DealCard), DealRune);
        RuneManager.Singelton.AddListener(typeof(PlayCard), PlayRune);
        RuneManager.Singelton.AddListener(typeof(DamageRune), DamageRuneCall);
        RuneManager.Singelton.AddListener(typeof(NewController), NewControllerRune);
        
        RuneManager.Singelton.AddListener(typeof(ShuffleCard), ShuffleCardRune);
        RuneManager.Singelton.AddListener(typeof(StartGame), StarGameRune);
        RuneManager.Singelton.AddListener(typeof(Attack), AttackRune);
        RuneManager.Singelton.AddListener(typeof(PlaySpell), PlaySpellRune);
        RuneManager.Singelton.AddListener(typeof(SummonMinion), SummonMinionRune);

   ///     RuneManager.Singelton.AddListener(typeof(ModifyHealth), ModifyHealthRune);

        indexes = new List<int>();
        box = new Box(4, -1.5f, -6, 6);

    }

    private static float epsilon = .1f;
    public void AddCardToHand(CardAvatar cardAvatar, string controllerGuid, Action action)//Will need optional paramater for origin
    {
        float yPos = 0;
        if (controllerGuid == homeGuid)
        {
            yPos = -2.0f;
            if(!gameStarted)
            {
                yPos = 0.0f;
            }
        }
        else if (controllerGuid == awayGuid)
        {
            yPos = 4.0f;
            if(!gameStarted)
            {
                yPos = 5.0f;
            }
        }
        if (playHands.ContainsKey(controllerGuid))
        {
            playHands[controllerGuid].Add(cardAvatar);

            float width = 1.3f;
            float halfWidth = width + epsilon;
            float startPoint = playHands[controllerGuid].Count * halfWidth;
            for (int i = 0; i < playHands[controllerGuid].Count; i++)
            {
                playHands[controllerGuid][i].GetComponent<CardAvatar>().SetDestination(new Vector3(-startPoint + (halfWidth * i), yPos, -3));//, action);
            }
        }
        action();
    }

    public void RemoveCardFromHand(CardAvatar cardAvatar, string controllerGuid, TypeOfRemoveFromHand typeOfRemoveFromHand)
    {
        float yPos = 0;
        if (controllerGuid == homeGuid)
        {
            yPos = -2.0f;
        }
        else if (controllerGuid == awayGuid)
        {
            yPos = 4.0f;
        }

        if (playHands.ContainsKey(controllerGuid))
        {
            playHands[controllerGuid].Remove(cardAvatar);
            float width = 1.3f;
            float halfWidth = width + epsilon;
            float startPoint = playHands[controllerGuid].Count * halfWidth;

            for (int i = 0; i < playHands[controllerGuid].Count; i++)
            {
                playHands[controllerGuid][i].GetComponent<CardAvatar>().SetDestination(new Vector3(-startPoint + (halfWidth * i), yPos, -3));
            }

            switch (typeOfRemoveFromHand)
            {
                case TypeOfRemoveFromHand.INTO_PLAY:
                    //A non case, this gets handeled by the AddCardToPlay function which will move it then
                    break;
            }
        }
    }

	public void AddCardToPlayArea(CardAvatar cardAvatar, string controllerGuid, OriginOfCard originOfCard, int index)
    {
        float yPos = 0;
        if (controllerGuid == homeGuid)
        {
            yPos = -0.0f;
        }
        else if (controllerGuid == awayGuid)
        {
            yPos = 2.0f;
        }
        
        if (playFields.ContainsKey(controllerGuid))
        {
            cardAvatar.cardAvatarState = CardAvatarState.inPlay;
            float width = 1.3f;
            float halfWidth = width + epsilon;
            float startPoint = playFields[controllerGuid].Count * halfWidth;
                    
            switch (originOfCard)
            {
                case OriginOfCard.HAND:
                    RemoveCardFromHand(cardAvatar, controllerGuid, TypeOfRemoveFromHand.INTO_PLAY);
					
					playFields[controllerGuid].Insert(index, cardAvatar);
                    for (int i = 0; i < playFields[controllerGuid].Count; i++)
                    {
                        playFields[controllerGuid][i].SetDestination(new Vector3(-startPoint + (halfWidth * i), yPos, -3));
                    }

                     break;

                case OriginOfCard.SUMMON:
					playFields[controllerGuid].Insert(index, cardAvatar);
                    for (int i = 0; i < playFields[controllerGuid].Count; i++)
                    {
                        playFields[controllerGuid][i].SetDestination(new Vector3(-startPoint + (halfWidth * i), yPos, -3));
                    }
                    break;
            }
        }
    }


    public bool InPlayArea(Vector3 pos)
    {
        return box.Contains(pos);
    }

    public void OnCardAvatarClickedForMulligan(int index)
    {
        if(indexes.Contains(index))
        {
            indexes.Remove(index);
            MulliganCount--;
            return;
        }

        indexes.Add(index);
        MulliganCount++;
        
    }

    public void OnMulliganButtonClick()
    {
        string str = "{\"message_type\":\"mulligan\",\n";
        str += "\"index\":[";
        for(int i = 0;i<indexes.Count;i++)
        {
            if(i != 0)
            {
                str += ",";
            }
            str += indexes[i].ToString();
        }

        str += "]}";

        Client.Singelton.SendNewMessage(str);
        OptionsManager.Singleton.FlushOptions();
    }

    public bool GetGameStart()
    {
        
        return gameStarted;
    }


    //Rune hooks for the play area
    public void DealRune(Rune rune, Action action)
    {

        DealCard dc = rune as DealCard; 
        Controller player = EntityManager.Singelton.GetEntity(dc.controller_uid) as Controller;
        if (player == null)
        {
            Debug.Log("Could not find controller in EntityManager, bad Guid");
            action();
            return;
        }

        Card card = EntityManager.Singelton.GetEntity(dc.card_uid) as Card;
        if (card == null)
        {
            Debug.Log("Could not find card in EntityManager, bad Guid " + dc.card_uid);
            action();
            return;
        }
        float yPos = 0;
        if (dc.controller_uid == homeGuid)
        {
            yPos = -2.0f;
        }
        else if (dc.controller_uid == awayGuid)
        {
            yPos = 4.0f;
        }

        GameObject go = Resources.Load<GameObject>(CARD_AVATAR_PREFAB_LOCATION);
        go = GameObject.Instantiate(go);

		go.name = card.GetName() + " " + dc.card_uid;
        if(String.IsNullOrEmpty(card.GetName()))
        {
            go.name = "UnknowCard";
        }
        go.transform.position = new Vector3(6, yPos, -3);
        
        
        string useGuid = Guid.NewGuid().ToString();


        if (card.GetCardType() == CardType.unknown)
        {
            go.GetComponent<CardAvatar>().SetupBlankCard(useGuid, player.GetGuid());
        }
        else
        {
            go.GetComponent<CardAvatar>().Setup(card, useGuid, player.GetGuid());
        }
        card.SetCardAvatar(go.GetComponent<CardAvatar>());
        go.GetComponent<CardAvatar>().SetControllerGuid(dc.controller_uid);

        EntityManager.Singelton.AddEntity(useGuid, go.GetComponent<CardAvatar>());
        AddCardToHand(go.GetComponent<CardAvatar>(), dc.controller_uid, action);
    }

    public void PlayRune(Rune rune, Action action)
    {
        PlayCard pc = rune as PlayCard;

        Controller player = EntityManager.Singelton.GetEntity(pc.controllerGuid) as Controller;
        if (player == null)
        {
            Debug.Log("Could not find controller in EntityManager, bad Guid");
            action();
            return;
        }

        Card card = EntityManager.Singelton.GetEntity(pc.cardGuid) as Card;
        if (card == null)
        {
            Debug.Log("Could not find card in EntityManager, bad Guid");
            action();
            return;
        }
        RemoveCardFromHand(card.GetCardAvatar(), player.GetGuid(), pc.typeOfRemoveFromHand);
		AddCardToPlayArea(card.GetCardAvatar(), player.GetGuid(), pc.originOfCard, pc.index);
        action();
        action = null;
    }

    public void SummonMinionRune(Rune rune, Action action)
    {
    /*
        SummonMinion sm = rune as SummonMinion;
        Controller player = EntityManager.Singelton.GetEntity(sm.controllerGuid) as Controller;

        Card card = EntityManager.Singelton.GetEntity(sm.card_uid) as Card;

        float yPos = 0;
        if (sm.controllerGuid == homeGuid)
        {
            yPos = -2.0f;
        }
        else if (sm.controllerGuid == awayGuid)
        {
            yPos = 4.0f;
        }

        GameObject go = Resources.Load<GameObject>(CARD_AVATAR_PREFAB_LOCATION);
        go = GameObject.Instantiate(go);


        go.transform.position = new Vector3(6, yPos, -3);
        
        go.name = card.GetName();

        string useGuid = Guid.NewGuid().ToString();

        if (card.GetCardType() == CardType.unknown)
        {
            go.GetComponent<CardAvatar>().SetupBlankCard(useGuid, player.GetGuid());
        }
        else
        {
            go.GetComponent<CardAvatar>().Setup(card, useGuid, player.GetGuid());
        }
        card.SetCardAvatar(go.GetComponent<CardAvatar>());
        go.GetComponent<CardAvatar>().SetControllerGuid(sm.controllerGuid);

        EntityManager.Singelton.AddEntity(useGuid, go.GetComponent<CardAvatar>());
		AddCardToPlayArea(card.GetCardAvatar(), player.GetGuid(), OriginOfCard.SUMMON, sm.fieldIndex);
        */
        action();
        action = null;
    }

    public void ShuffleCardRune(Rune rune, Action action)
    {
        ShuffleCard sc = rune as ShuffleCard;
        if (sc == null)
        {
            Debug.Log("Bad rune");
            return;
        }


        Controller player = EntityManager.Singelton.GetEntity(sc.controller_uid) as Controller;
        if (player == null)
        {
            Debug.Log("Could not find controller in EntityManager, bad Guid");
            action();
            return;
        }

        Card card = EntityManager.Singelton.GetEntity(sc.card_uid) as Card;
        if (card == null)
        {
            Debug.Log("Could not find card in EntityManager, bad Guid");
            action();
            return;
        }
        RemoveCardFromHand(card.GetCardAvatar(), player.GetGuid(), TypeOfRemoveFromHand.DISCARDED);
        card.GetCardAvatar().DeckIt();
        action();
    }

    public void DamageRuneCall(Rune rune, Action action)
    {
        DamageRune dr = rune as DamageRune;

        if (dr.targetType == TargetType.minion)
        {
          //Not sure why I have this, I think it might have been because of reasons  
          
        }
        else if (dr.targetType == TargetType.player)
        {
            //once we have player avatars in do this
        }
        action();
        action = null;
    }

    public void NewControllerRune(Rune rune, Action action)
    {
        NewController nc = rune as NewController;

        if (playHands == null)
        {
            playFields = new Dictionary<string, List<CardAvatar>>();
            playHands = new Dictionary<string, List<CardAvatar>>();
        }
        if (nc.isMe)
        {
            this.homeGuid = nc.uid.ToString();
            playFields.Add(homeGuid, new List<CardAvatar>());
            playHands.Add(homeGuid, new List<CardAvatar>());
        }
        else
        {
            this.awayGuid = nc.uid.ToString();
            playFields.Add(awayGuid, new List<CardAvatar>());
            playHands.Add(awayGuid, new List<CardAvatar>());
        }
        if(awayGuid != null && homeGuid != null)
        {
            string str = "{\"message_type\":\"ready\"}";
            GetComponent<Client>().SendNewMessage(str);
        }

        action();
        action = null;
    }

    public void StarGameRune(Rune rune, Action action)
    {
        gameStarted = true;

        float yPos = -2.0f;

        if (playHands.ContainsKey(homeGuid))
        {
            float width = 1.3f;
            float halfWidth = width + epsilon;
            float startPoint = playHands[homeGuid].Count * halfWidth;

            for (int i = 0; i < playHands[homeGuid].Count; i++)
            {
                playHands[homeGuid][i].GetComponent<CardAvatar>().SetDestination(new Vector3(-startPoint + (halfWidth * i), yPos, -3));//, action);
            }
        }


        action();
        action = null;
    }

    public void AttackRune(Rune rune, Action action)
    {
        //Will be filled in later
        action();
    }

    public void PlaySpellRune(Rune rune, Action action)
    {
        PlaySpell ps = rune as PlaySpell;

        Card card = EntityManager.Singelton.GetEntity(ps.cardGuid) as Card;

        Controller player = EntityManager.Singelton.GetEntity(ps.controllerGuid) as Controller;

        RemoveCardFromHand(card.GetCardAvatar(), player.GetGuid(), TypeOfRemoveFromHand.INTO_PLAY);
		card.GetCardAvatar().transform.position = card.GetCardAvatar().transform.position + new Vector3(10000,0,0);
		card.GetCardAvatar().cardAvatarState = CardAvatarState.inGraveyad;
		card.GetCardAvatar().gameObject.SetActive(false);	
        action();
    }


    /*
    public void ModifyHealthRune(Rune rune, Action action)
    {
        ModifyHealth mh = rune as ModifyHealth;
        var dmg = EntityManager.Singelton.GetEntity(mh.target) as damageable;


        action();
    
     * }
     */
}