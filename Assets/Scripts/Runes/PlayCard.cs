using System;
using UnityEngine;
using System.Collections;

public enum OriginOfCard
{
    HAND,
    DECK,
    SUMMON
}

public enum TypeOfRemoveFromHand
{
    INTO_PLAY,
    BURNED,
    DISCARDED
}


public class PlayCard : Rune {
    public Guid playerGuid;
    public Guid cardGuid;
    public OriginOfCard originOfCard;
    public TypeOfRemoveFromHand typeOfRemoveFromHand;

    public PlayCard(Guid playerGuid, Guid cardGuid, OriginOfCard originOfCard, TypeOfRemoveFromHand typeOfRemoveFromHand)
    {
        this.playerGuid = playerGuid;
        this.cardGuid = cardGuid;
        this.originOfCard = originOfCard;
        this.typeOfRemoveFromHand = typeOfRemoveFromHand;
    }

    public override void Execute(Action action)
    {
        Controller player = EntityManager.Singelton.GetEntity(playerGuid) as Controller;
        if(player == null)
        {
            Debug.Log("Could not find controller, bad guid");
            action();
            return;
        }

        Card card = EntityManager.Singelton.GetEntity(cardGuid) as Card;
        if(card == null)
        {
            Debug.Log("Could not find card, bad guid");
            action();
            return;
        }

        player.RemoveCardFromHand(card);
        player.AddCardToPlay(card);
        action();
    }

    public override void OnGUI()
    {
        
    }
}
