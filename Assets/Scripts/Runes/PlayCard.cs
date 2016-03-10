using System;
using UnityEngine;
using System.Collections;

public class PlayCard : Rune {
    public Guid playerGuid;
    public Guid cardGuid;

    public PlayCard(Guid playerGuid, Guid cardGuid)
    {
        this.playerGuid = playerGuid;
        this.cardGuid = cardGuid;
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
        //The card at this moment leaves the hand goes into play
        player.AddCardToPlay(card);
    }

    public override void OnGUI()
    {
        
    }
}
