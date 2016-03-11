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

    protected Guid guid;
    protected Guid playerGuid;

    protected Card card;

    // Use this for initialization
    void Start()
    {
        cardAvatarState = CardAvatarState.inHand;
    }

    // Update is called once per frame
    void Update()
    {
        if(cardAvatarState == CardAvatarState.inTransit)
        {
            Vector3 transPoint = Camera.main.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y, 7));
            transform.position = new Vector3(transPoint.x, transPoint.y, transform.position.z);
        }
    }

    public void SetCard(Card card)
    {
        if (this.card == null)
        {
            this.card = card;
        }
    }

    public void Setup(Card card, Guid guid, Guid playerGuid)
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

    public Guid GetGuid()
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
        if(cardAvatarState == CardAvatarState.inHand)
        {
            cardAvatarState = CardAvatarState.inTransit;
            transform.position = new Vector3(transform.position.x, transform.position.y, transform.position.z - 1);
        }
    }

    public void OnMouseUp()
    {
        if(cardAvatarState == CardAvatarState.inTransit)
        {
            if(PlayArea.Singelton.InPlayArea(transform.position))
            {
                cardAvatarState = CardAvatarState.inPlay;
                PlayCard pc = new PlayCard(playerGuid, card.GetGuid(), OriginOfCard.HAND, TypeOfRemoveFromHand.INTO_PLAY);
                RuneManager.Singelton.ExecuteRune(pc);
            }
        }
    }
}
