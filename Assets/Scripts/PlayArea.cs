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
    private string awayGuid;
    private Box box;
    public static PlayArea Singelton;

    public void Setup()
    {
        
        Singelton = this;

        RuneManager.Singelton.AddListener(typeof(DealCard), DealRune);
        RuneManager.Singelton.AddListener(typeof(PlayCard), PlayRune);
        RuneManager.Singelton.AddListener(typeof(DamageRune), DamageRuneCall);
        RuneManager.Singelton.AddListener(typeof(NewController), NewControllerRune);
        box = new Box(4, -1.5f, -6, 6);

    }

    private static float epsilon = .1f;
    public void AddCardToHand(CardAvatar cardAvatar, string controllerGuid)//Will need optional paramater for origin
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
            playHands[controllerGuid].Add(cardAvatar);

            float width = 1.3f;
            float halfWidth = width + epsilon;
            float startPoint = playHands[controllerGuid].Count * halfWidth;

            for (int i = 0; i < playHands[controllerGuid].Count; i++)
            {
                playHands[controllerGuid][i].GetComponent<CardAvatar>().SetDestination(new Vector3(-startPoint + (halfWidth * i), yPos, -3));
            }
        }
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

    public void AddCardToPlayArea(CardAvatar cardAvatar, string controllerGuid, OriginOfCard originOfCard)
    {
        float yPos = 0;
        if (controllerGuid == homeGuid)
        {
            yPos = -0.5f;
        }
        else if (controllerGuid == awayGuid)
        {
            yPos = 1.5f;
        }
        
        if (playFields.ContainsKey(controllerGuid))
        {
            cardAvatar.cardAvatarState = CardAvatarState.inPlay;
            switch (originOfCard)
            {
                case OriginOfCard.HAND:
                    RemoveCardFromHand(cardAvatar, controllerGuid, TypeOfRemoveFromHand.INTO_PLAY);
                    playFields[controllerGuid].Add(cardAvatar);
                    float width = 1.3f;
                    float halfWidth = width + epsilon;
                    float startPoint = playFields[controllerGuid].Count * halfWidth;
                    for (int i = 0; i < playFields[controllerGuid].Count; i++)
                    {
                        playFields[controllerGuid][i].SetDestination(new Vector3(-startPoint + (halfWidth * i), yPos, -3));
                    }

                    break;
            }
        }
    }

    public void DealRune(Rune rune, Action action)
    {
        DealCard dc = rune as DealCard;

        Controller player = EntityManager.Singelton.GetEntity(dc.controllerGuid) as Controller;
        if (player == null)
        {
            Debug.Log("Could not find controller in EntityManager, bad Guid");
            action();
            return;
        }

        Card card = EntityManager.Singelton.GetEntity(dc.cardGuid) as Card;
        if (card == null)
        {
            Debug.Log("Could not find card in EntityManager, bad Guid");
            action();
            return;
        }
         float yPos = 0;
        if (dc.controllerGuid == homeGuid)
        {
            yPos = -2.0f;
        }
        else if (dc.controllerGuid == awayGuid)
        {
            yPos = 4.0f;
        }

        GameObject go = Resources.Load<GameObject>(CARD_AVATAR_PREFAB_LOCATION);
        go = GameObject.Instantiate(go);
        go.transform.position = new Vector3(6, yPos, -3);
        string useGuid = Guid.NewGuid().ToString();
        
        go.GetComponent<CardAvatar>().Setup(card, useGuid, player.GetGuid());
        card.SetCardAvatar(go.GetComponent<CardAvatar>());
        EntityManager.Singelton.AddEntity(useGuid, go.GetComponent<CardAvatar>());
        AddCardToHand(go.GetComponent<CardAvatar>(), dc.controllerGuid);

        action();
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
        AddCardToPlayArea(card.GetCardAvatar(), player.GetGuid(), pc.originOfCard);
        action();
    }
    
    public void DamageRuneCall(Rune rune, Action action)
    {
        DamageRune dr = rune as DamageRune;

        if(dr.targetType== TargetType.minion)
        {
            CardAvatar cardAvatar = (EntityManager.Singelton.GetEntity(dr.target) as Card).GetCardAvatar();
            cardAvatar.ModifyHealth(dr.amount);
        }
        else if(dr.targetType == TargetType.player)
        {
            //once we have player avatars in do this
        }
        action();
    }

    public void NewControllerRune(Rune rune, Action action)
    {
        NewController nc = rune as NewController;

        playFields = new Dictionary<string, List<CardAvatar>>();
        playHands = new Dictionary<string, List<CardAvatar>>();
        if (nc.isMe)
        {
            this.homeGuid = nc.controllerGuid;
            playFields.Add(homeGuid, new List<CardAvatar>());
            playHands.Add(homeGuid, new List<CardAvatar>());
        }
        else
        {
            this.awayGuid = nc.controllerGuid;
            playFields.Add(awayGuid, new List<CardAvatar>());
            playHands.Add(awayGuid, new List<CardAvatar>());
        }

        string str = "{\"type\":\"ready\"}";
        GetComponent<Client>().SendNewMessage(str);
        action();
    }

    public bool InPlayArea(Vector3 pos)
    {
        return box.Contains(pos);
    }
}