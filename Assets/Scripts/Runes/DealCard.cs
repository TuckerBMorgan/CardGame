using System;
using UnityEngine;
using System.Collections;

public class DealCard : Rune {

    
    
    public Guid playerGuid;
    public Guid cardGuid;
    public bool faceDown;

    public DealCard(Guid playerGuid, Guid cardGuid, bool faceDown)
    {
        this.playerGuid = playerGuid;
        this.cardGuid = cardGuid;
        this.faceDown = faceDown;
    }

    public override void Execute(Action action)
    {
        Controller player = EntityManager.Singelton.GetEntity(playerGuid) as Controller;
        if (player == null)
        {
            Debug.Log("Could not find controller in EntityManager, bad Guid");
            action();
            return;
        }

        Card card = EntityManager.Singelton.GetEntity(cardGuid) as Card;
        if (card == null)
        {
            Debug.Log("Could not find card in EntityManager, bad Guid");
            action();
            return;
        }

        player.RemoveCardFromDeck(card);
        player.AddCardToHand(card);
        action();
    }


    public override void OnGUI()
    {
        
    }

}
