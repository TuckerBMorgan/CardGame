using UnityEngine;
using System;
using System.Collections;

public class CardAvatar : MonoBehaviour, entity
{

    public GameObject nameText;
    public GameObject healthText;
    public GameObject attackText;

    private Guid guid;

    private Card card;

    // Use this for initialization
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {

    }

    public void SetCard(Card card)
    {
        if (this.card == null)
        {
            this.card = card;
        }
    }

    public void Setup(Card card, Guid guid)
    {
        this.guid = guid;
        this.card = card;
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
}
