using System;
using UnityEngine;
using UnityEditor;
using System.Collections;
using System.Collections.Generic;

public abstract class Controller : MonoBehaviour, entity, damageable {

    public static int STARTING_HEALTH = 30;
    
    public enum ControllerState
    {
        waiting,
        targeting,
        movingCard
    }

    protected string guid;
    protected List<Card> deck;
    protected List<Card> hand;
    protected List<Card> inPlay;
    protected List<Card> graveyard;
    protected List<Option> targetOptions;
    protected int health;
    protected string controllerName;
    protected int mana;
    protected int baseMana;
    public ControllerState controllerState;
    protected string targetingEntity;
    private CardAvatar careAboutCard;
    

    public void Setup()
    {
        deck = new List<Card>();
        hand = new List<Card>();
        inPlay = new List<Card>();
        graveyard = new List<Card>();
        health = STARTING_HEALTH;
        controllerState = ControllerState.waiting;
    }

    public abstract void StartTurn();
    public abstract void EndTurn();

    void Update()
    {
        CheckForBoardClick();
    }

    private void CheckForBoardClick()
    {
        if (!PlayArea.Singelton.GetGameStart())
            return;

        if (Input.GetMouseButtonDown(0))
        {
            if (controllerState == ControllerState.waiting)
            {
                Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
                RaycastHit rch;
                if (Physics.Raycast(ray, out rch, 1000000))
                {
                    GameObject go = rch.collider.gameObject;
                    if (go.tag == "Card")
                    {
                        CardAvatar ca = go.GetComponentInParent<CardAvatar>();
                        if (ca.cardAvatarState == CardAvatarState.inHand)
                        {
                            if (ca.GetControllerGuid() == guid)
                            {
                                ca.cardAvatarState = CardAvatarState.inTransit;
                                careAboutCard = ca;
                                controllerState = ControllerState.movingCard;
                            }
                        }
                    }
                    else if (go.tag == "Hero")
                    {

                    }

                }
            }
            else if (controllerState == ControllerState.targeting)
            {
                Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
                RaycastHit rch;
                if (Physics.Raycast(ray, out rch, 1000000))
                {
                    GameObject go = rch.collider.gameObject;
                    if (go.tag == "Card")
                    {
                        CardAvatar ca = go.GetComponentInParent<CardAvatar>();

                        if (ca.cardAvatarState == CardAvatarState.inPlay)
                        {
                            string cardGuid = ca.GetGuid();
                            foreach (Option op in targetOptions)
                            {
                                if ((op as PlayCardOption).targetGuid == cardGuid)
                                {
                                    targetOptions = null;
                                    careAboutCard = null;
                                    controllerState = ControllerState.waiting;
                                    OptionsManager.Singleton.PickUpOption(op);
                                    return;
                                }
                            }
                        }
                        else
                        {
                            //this would be for spells or something similar I think   
                        }

                    }
                    else if (go.tag == "Hero")
                    {

                    }
                }
            }
        }
        else if (Input.GetMouseButtonUp(0))
        {
            if (careAboutCard != null)
            {
                if (controllerState == ControllerState.movingCard)
                {
                    if (PlayArea.Singelton.InPlayArea(careAboutCard.transform.position))
                    {
                        if (OptionsManager.Singleton.options.ContainsKey(careAboutCard.GetGuid()))
                        {
                            var options = OptionsManager.Singleton.options[careAboutCard.GetGuid()];
                            foreach (Option op in options)
                            {
                                if (op.GetType() == typeof(PlayCardOption))
                                {
                                    if ((op as PlayCardOption).targetGuid == "-1")
                                    {
                                        OptionsManager.Singleton.PickUpOption(op);
                                        careAboutCard.cardAvatarState = CardAvatarState.inPlay;
                                        controllerState = ControllerState.waiting;
                                        careAboutCard = null;
                                        return;
                                    }
                                    else
                                    {
                                        CardLookingForTargets(options);
                                        controllerState = ControllerState.targeting;
                                        return;
                                    }
                                }
                            }
                        }
                        else
                        {
                            careAboutCard.cardAvatarState = CardAvatarState.inHand;
                            careAboutCard = null;
                        }
                    }
                    else
                    {
                        careAboutCard.cardAvatarState = CardAvatarState.inHand;
                        careAboutCard = null;
                    }
                }
                else if (controllerState == ControllerState.targeting)
                {
                    if (careAboutCard != null)
                    {
                        Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
                        RaycastHit rch;
                        if (Physics.Raycast(ray, out rch, 10000000))
                        {
                            string targetGuid = "";

                            if (rch.collider.gameObject.tag == "Card")
                            {
                                targetGuid = rch.collider.gameObject.GetComponentInParent<CardAvatar>().GetGuid();
                            }
                            else if (rch.collider.gameObject.tag == "Hero")
                            {
                                targetGuid = rch.collider.gameObject.GetComponentInParent<HeroAvatar>().careAboutGuid;
                            }

                            if (careAboutCard.cardAvatarState == CardAvatarState.inHand)
                            {
                                if (targetOptions != null)
                                {
                                    foreach (Option op in targetOptions)
                                    {
                                        if (op.GetType() == typeof(PlayCardOption))
                                        {
                                            if ((op as PlayCardOption).targetGuid == targetGuid)
                                            {
                                                OptionsManager.Singleton.PickUpOption(op);
                                                careAboutCard = null;
                                                targetOptions = null;
                                                controllerState = ControllerState.waiting;
                                            }
                                        }
                                        else if (op.GetType() == typeof(PlaySpellOption))
                                        {
                                            //this might be folded up into the PlayCardOptions
                                        }
                                    }
                                }
                            }
                            else if (careAboutCard.cardAvatarState == CardAvatarState.inPlay)
                            {
                                if (targetOptions != null)
                                {
                                    foreach (Option op in targetOptions)
                                    {
                                        if ((op as AttackOption).defenderGuid == targetGuid)
                                        {
                                            OptionsManager.Singleton.PickUpOption(op);
                                            careAboutCard = null;
                                            targetOptions = null;
                                            controllerState = ControllerState.waiting;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        else if (Input.GetMouseButtonDown(1))
        {

        }
        else if (Input.GetMouseButtonUp(1))
        {

        }
    }


    public void SetGuid(string guid)
    {
        this.guid = guid;
    }
    public string GetGuid()
    {
        return guid;
    }    
    
    public Card GetCardByIndex(int i)
    {
        if (i < deck.Count)
        {
            return deck[i];
        }

        return null;
    }

    public Card GetCardByGUID(string guid)
    {
        for (int i = 0; i < deck.Count; i++)
        {
            if(deck[i].GetGuid() == guid)
            {
                return deck[i];
            }
        }
        return null;
    }

    public int DeckLength()
    {
        return deck.Count;
    }
    public void AddCardToDeck(Card card)
    {
        deck.Add(card);
    }
    public void RemoveCardFromDeck(Card card)
    {
        deck.Remove(card);
    }

    public int HandSize()
    {
        return deck.Count;
    }
    public void AddCardToHand(Card card)
    {
        hand.Add(card);
    }
    public void RemoveCardFromHand(Card card)
    {
        hand.Remove(card);
    }
    
    public int CardsInPlay()
    {
        return inPlay.Count;
    }
    public void AddCardToPlay(Card card)
    {
        inPlay.Add(card);
    }
    public void RemoveCardToPlay(Card card)
    {
        inPlay.Remove(card);
    }

    public void AddCardToGraveyard(Card card)
    {
        graveyard.Add(card);
    }

    public Card RemoveCardFromGraveyard(Card card)
    {
        int index = graveyard.IndexOf(card);
        if (index < 0)
        {
            return null;
        }
        return graveyard[index];
    }


    public virtual void DrawInspector()
    {
        EditorGUILayout.LabelField("Deck Length: " + deck.Count);
        EditorGUILayout.LabelField("In Deck");
        for(int i = 0;i<deck.Count;i++)
        {
            if(deck[i] == null)
            {
                continue;
            }
            EditorGUILayout.LabelField(deck[i].GetName());
        }
        EditorGUILayout.LabelField("In Hand");
        for(int i = 0;i<hand.Count;i++)
        {
            EditorGUILayout.LabelField(hand[i].GetName());
        }
        EditorGUILayout.LabelField("In Play");
        for(int i = 0;i<inPlay.Count;i++)
        {
            EditorGUILayout.LabelField(inPlay[i].GetName());
        }
    }

    public void SetHealth(int health)
    {
        this.health = health;
    }
    public void ModifyHealth(int amount)
    {
        health += amount;
    }
    public int GetHealth()
    {
        return health;
    }

    public int GetMana()
    {
        return mana;
    }
    public void SetMana(int mana)
    {
        this.mana = mana;
    }

    public int GetBaseMana()
    {
        return baseMana;
    }

    public void SetBaseMana(int baseMana)
    {
        this.baseMana = baseMana;
    }

    public void SetControllerName(string controllerName)
    {
        this.controllerName = controllerName;
    }

    public string GetControllerName()
    {
        return controllerName;
    }

    public int GetCardIndexInHand(Card card)
    {
        return hand.IndexOf(card);
    }

    public bool IsIsHand(Card card)
    {
        return hand.Contains(card);
    }

    public void OnCardAvatarClicked(CardAvatar cardAvatar)
    {
       
        if(controllerState == ControllerState.targeting)
        {
            TargetReport(cardAvatar.GetCard().GetGuid());
            return;
        }
        switch(cardAvatar.cardAvatarState)
        {
            case CardAvatarState.inGraveyad:

                break;
            case CardAvatarState.inHand:
                if(cardAvatar.GetControllerGuid() == guid)
                {
                    cardAvatar.cardAvatarState = CardAvatarState.inTransit;
                    cardAvatar.transform.position += new Vector3(0, 0, -1);
                }
                break;
            case CardAvatarState.inPlay:
                if (controllerState == ControllerState.waiting)
                {
                    if (OptionsManager.Singleton.options.ContainsKey(cardAvatar.GetCard().GetGuid()))
                    {
                        var options = OptionsManager.Singleton.options[cardAvatar.GetCard().GetGuid()];
                        foreach (Option op in options)
                        {
                            if (op.GetType() == typeof(AttackOption))
                            {
                                cardAvatar.cardAvatarState = CardAvatarState.waitingForTarget;
                                EntityWantsToTarget(cardAvatar.GetCard().GetGuid());
                            }
                        }
                    }
                }
                //a target has been picked, now all we have to do is validate it and act
                else
                {
                    TargetReport(cardAvatar.GetCard().GetGuid());
                }

                break;

            case CardAvatarState.inTransit:

                //this should not happen
                return;
                
            case CardAvatarState.waitingForTarget:
                break;

        }
    }

    public void OnHeroPortaitClicked(HeroAvatar heroAvatar)
    {

        if(targetOptions != null)
        {
            for(int i = 0;i<targetOptions.Count;i++)
            {
                if(targetOptions[i].GetType() == typeof(PlayCardOption))
                {
                    PlayCardOption pco = targetOptions[i] as PlayCardOption;
                    if(pco.targetGuid == heroAvatar.careAboutGuid)
                    {
                        OptionsManager.Singleton.PickUpOption(pco);
                        targetOptions = null;
                        return;
                    }
                }
            }
        }
    }

    public void CardLookingForTargets(List<Option> targetOptions)
    {
        this.targetOptions = targetOptions;
    }

    public void EntityWantsToTarget(string guid)
    {
        if (!string.IsNullOrEmpty(targetingEntity) || controllerState == ControllerState.targeting)
            return;
        controllerState = ControllerState.targeting;
        targetingEntity = guid;
    }

    public ControllerState GetControllerState()
    {
        return controllerState;
    }

    public void TargetReport(string Targetguid)
    {
        if (controllerState != ControllerState.targeting)
            return;

        var ent = EntityManager.Singelton.GetEntity(targetingEntity);// as Card;

        if (ent == null)
            return;

        if(targetOptions != null)
        {
            for(int i = 0;i<targetOptions.Count;i++)
            {
                if(targetOptions[i].GetType() == typeof(PlayCardOption))
                {
                    PlayCardOption pco = targetOptions[i] as PlayCardOption;
                    if(pco.targetGuid == Targetguid)
                    {
                        OptionsManager.Singleton.PickUpOption(pco);
                        targetOptions = null;
                        return;
                    }
                }
            }
        }

        //will not work spells, or hero powers that require targets--how do, pls help
        if (OptionsManager.Singleton.options.ContainsKey(Targetguid))
        {
            var options = OptionsManager.Singleton.options[Targetguid];  
            foreach (Option op in options)
            {
                if (op.GetType() == typeof(AttackOption))
                {
                    var opA = op as AttackOption;
                    if(opA.defenderGuid == Targetguid)
                    {
                        OptionsManager.Singleton.PickUpOption(opA);
                        controllerState = ControllerState.waiting;
                        targetingEntity = null;
                        if(ent.GetType() == typeof(Card))
                        {
                            Card card = ent as Card;
                            card.GetCardAvatar().cardAvatarState = CardAvatarState.inPlay;
                        }
                        else if(ent.GetType() == typeof(Hero))
                        {

                        }
                    }
                }
            }
        }
    }


}
