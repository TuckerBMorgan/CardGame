using UnityEngine;
using System;
using System.Collections;
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
    public CardAvatarState cardAvatarState;
    

    protected string guid;
    protected string playerGuid;
    protected Vector3 dest;

    protected Card card;

    // Use this for initialization
    void Start()
    {
        cardAvatarState = CardAvatarState.inHand;
        RuneManager.Singelton.AddListener(typeof(PlayCard), OnCardPlay);
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

    public void SetCard(Card card)
    {
        if (this.card == null)
        {
            this.card = card;
        }
    }

    private float speed  = 1.0f;
    private float startTime;
    private float journeyLength;
    private float distCovered;
    private float fracJounery;
    private void PositionLerp()
    {
        distCovered = (Time.time - startTime) * speed;
        fracJounery = distCovered / journeyLength;
        transform.position = Vector3.Lerp(transform.position, dest, fracJounery);
    }

    public void Setup(Card card, string guid, string playerGuid)
    {
        this.guid = guid;
        this.card = card;
        this.playerGuid = playerGuid;
        nameText.GetComponent<TextMesh>().text = card.GetName();
        if (card.GetCardType() == CardType.minion)
        {
            MinionCard mc = card as MinionCard;
            healthText.GetComponent<TextMesh>().text = mc.GetBaseAttack().ToString();
            attackText.GetComponent<TextMesh>().text = mc.GetBaseHealth().ToString();
        }
    }

    public string GetGuid()
    {
        return guid;
    }

    public void ModifyHealth(int amount)
    {
        int current = int.Parse(healthText.GetComponent<TextMesh>().text);
        current = current + amount;
        healthText.GetComponent<TextMesh>().text = current.ToString();
    }

    public void OnMouseDown()
    {
        if(PlayArea.Singelton.GetGameStart())
        {
            Controller ctr = EntityManager.Singelton.GetEntity(playerGuid) as Controller;
            PlayArea.Singelton.OnCardAvatarClickedForMulligan(ctr.GetCardIndexInHand(card));
            return;
        }
        if (cardAvatarState == CardAvatarState.inHand)
        {
            cardAvatarState = CardAvatarState.inTransit;
            transform.position = new Vector3(transform.position.x, transform.position.y, transform.position.z - 1);
        }
    }

    public void OnMouseUp()
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

    public void SetDestination(Vector3 dest)
    {
        startTime = Time.time;
        journeyLength = Vector3.Distance(dest, transform.position);
        this.dest = dest;
    }
}
