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
        targeting
    }

    protected string guid;
    protected List<Card> deck;
    protected List<Card> hand;
    protected List<Card> inPlay;
    protected int health;
    protected string controllerName;
    protected int mana;
    protected int baseMana;

    ControllerState controllerState;

    public void Setup()
    {
        deck = new List<Card>();
        hand = new List<Card>();
        inPlay = new List<Card>();
        health = STARTING_HEALTH;
    }

    public abstract void StartTurn();
    public abstract void EndTurn();

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

    protected string targetingEntity;
    public void EntityWantsToTarget(string guid)
    {
        if (!string.IsNullOrEmpty(targetingEntity) || controllerState == ControllerState.targeting)
            return;

        controllerState = ControllerState.targeting;

        //dont like any of this

    }
}
