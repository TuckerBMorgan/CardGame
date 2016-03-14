using System;
using UnityEngine;
using System.Collections;

public class DealCard : Rune {
    

    public string playerGuid { get; set; }
    public string cardGuid { get; set; }
    public bool faceDown { get; set; }


    public DealCard()
    {

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
