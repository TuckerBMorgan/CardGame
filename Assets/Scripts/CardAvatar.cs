using UnityEngine;
using UnityEngine.UI;
using System;
using System.Collections;
using System.Collections.Generic;

public enum CardAvatarState
{
    inHand,
    inPlay,
    inGraveyad,
    inTransit
}
public class CardAvatar : MonoBehaviour, entity
{

    public GameObject nameText;
    public GameObject healthText;
    public GameObject attackText;
    public GameObject costText;
    public CardAvatarState cardAvatarState;

    //Used for moving the card aroubd the field
    private float speed = 1.0f;
    private float startTime;
    private float journeyLength;
    private float distCovered;
    private float fracJounery;

    protected string guid;
    protected string playerGuid;
    protected Vector3 dest;
    protected List<Text> textOfCard;
    protected Action action;

    protected Card card;

    // Use this for initialization
    void Start()
    {
        cardAvatarState = CardAvatarState.inHand;
        RuneManager.Singelton.AddListener(typeof(PlayCard), OnCardPlay);
        textOfCard = new List<Text>(GetComponentsInChildren<Text>());

        for(int i = 0;i<textOfCard.Count;i++)
        {
            textOfCard[i].color = Color.red;
        }
    }

    // Update is called once per frame
    void Update()
    {
        if (cardAvatarState == CardAvatarState.inTransit)
        {
            Vector3 transPoint = Camera.main.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y, 7));
            transform.position = new Vector3(transPoint.x, transPoint.y, transform.position.z);
        }
        else if(cardAvatarState == CardAvatarState.inPlay || cardAvatarState == CardAvatarState.inHand)
        {
            if(dest != transform.position)
            {
                PositionLerp();        
            }
        }
    }

    private void PositionLerp()
    {
        distCovered = (Time.time - startTime) * speed;
        fracJounery = distCovered / journeyLength;
        transform.position = Vector3.Lerp(transform.position, dest, fracJounery);
        if(transform.position == dest)
        {
            if (action != null)
            {
                Debug.Log("end", gameObject);
                action();
                action = null;
            }
        }
    }

    public void Setup(Card card, string guid, string playerGuid)
    {
        this.guid = guid;
        this.card = card;
        this.playerGuid = playerGuid;
        nameText.GetComponent<Text>().text = card.GetName();
        costText.GetComponent<Text>().text = card.GetMana().ToString();
        if (card.GetCardType() == CardType.minion)
        {
            MinionCard mc = card as MinionCard;
            healthText.GetComponent<Text>().text = mc.GetBaseAttack().ToString();
            attackText.GetComponent<Text>().text = mc.GetBaseHealth().ToString();
        }
    }

    public void SetupBlankCard(string guid, string playerGuid)
    {
        this.guid = guid;
        card = null;
        this.playerGuid = playerGuid;
        nameText.GetComponent<Text>().text = "";
        healthText.GetComponent<Text>().text = "";
        attackText.GetComponent<Text>().text = "";
        costText.GetComponent<Text>().text = "";
    }

  
    //Entry point for the mesh to tell the whole card it is being clicked
    public void OnMouseDownOnMesh()
    {
        if (! PlayArea.Singelton.GetGameStart())
        {
            Controller ctr = EntityManager.Singelton.GetEntity(playerGuid) as Controller;
            PlayArea.Singelton.OnCardAvatarClickedForMulligan(ctr.GetCardIndexInHand(card));
            if (textOfCard.Count < 0)
                return;
            Color col = textOfCard[0].color == Color.white ? Color.red : Color.white;
            for (int i = 0; i < textOfCard.Count; i++)
            {
                textOfCard[i].color = col;
            }
            return;
        }
        if (cardAvatarState == CardAvatarState.inHand)
        {
            cardAvatarState = CardAvatarState.inTransit;
            transform.position = new Vector3(transform.position.x, transform.position.y, transform.position.z - 1);
        }
    }

    public void OnMouseUpOnMesh()
    {
        if (cardAvatarState == CardAvatarState.inTransit)
        {
            if (PlayArea.Singelton.InPlayArea(transform.position))
            {
                Controller ctr = EntityManager.Singelton.GetEntity(playerGuid) as Controller;

                string playCard = "{\"type\":\"playCard\",\n " +
                                    "\"index\":" + ctr.GetCardIndexInHand(card) + "}";
                Client.Singelton.SendNewMessage(playCard);
            }
        }
    }

    public void OnCardPlay(Rune rune, System.Action action)
    {
        PlayCard pc = rune as PlayCard;
        if(pc.cardGuid == card.GetGuid())
        {
            cardAvatarState = CardAvatarState.inPlay;
        } 
        action();
    }

    public void SetDestination(Vector3 dest, Action action = null)
    {
        startTime = Time.time;
        journeyLength = Vector3.Distance(dest, transform.position);
        this.dest = dest;
        this.action = action;
    }


    public void DeckIt()
    {

        RuneManager.Singelton.RemoveListener(typeof(PlayCard), OnCardPlay);
        gameObject.SetActive(false);
        enabled = false;
    }


    public void SetCard(Card card)
    {
        if (this.card == null)
        {
            this.card = card;
        }
    }

    public string GetGuid()
    {
        return guid;
    }

    public void ModifyHealth(int amount)
    {
        int current = int.Parse(healthText.GetComponent<Text>().text);
        current = current + amount;
        healthText.GetComponent<Text>().text = current.ToString();
    }

}
