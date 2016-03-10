using System;
using UnityEngine;
using UnityEditor;
using System.Collections;
using System.Collections.Generic;

public abstract class Controller : MonoBehaviour, entity {

    protected Guid guid;
    protected List<Card> deck;
    protected List<Card> hand;
    protected List<Card> inPlay;
    protected List<CardAvatar> displayHand;
    protected List<CardAvatar> displayInPlay;

    public void Setup()
    {
        deck = new List<Card>();
        hand = new List<Card>();
        inPlay = new List<Card>();
        displayHand = new List<CardAvatar>();
        displayInPlay = new List<CardAvatar>();
    }

    public abstract void StartTurn();
    public abstract void EndTurn();

    public void SetGuid(Guid guid)
    {
        this.guid = guid;
    }
    public Guid GetGuid()
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

    public Card GetCardByGUID(Guid guid)
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
    private static float epsilon = .1f;
    public void AddCardAvatarToHand(CardAvatar cardAvatar)
    {
        displayHand.Add(cardAvatar);
        float width = 1.3f;
        float halfWidth = width;// / 2.0f;
        float startPoint = displayHand.Count * halfWidth;
        displayHand[0].transform.position = new Vector3(-startPoint, -1, -3);
        for (int i = 1; i < displayHand.Count; i++)
        {
            displayHand[i].transform.position = new Vector3(-startPoint + (halfWidth * i + epsilon), -1, -3);
        }


    }
    public void RemoveCardAvatarFromHand(CardAvatar cardAvatar)
    {
        displayInPlay.Remove(cardAvatar);
     
    }
    public CardAvatar GetCardAvatarByGuid(Guid guid)
    {
        for(int i = 0;i<displayHand.Count;i++)
        {
            if(displayHand[i].GetGuid() == guid)
            {
                return displayHand[i];
            }
        }
        return null;
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
}
