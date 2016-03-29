using System;
using UnityEngine;
using System.Collections;

public class DealCard : Rune {
    

    public string controllerGuid { get; set; }
    public string cardGuid { get; set; }
    public bool faceDown { get; set; }


    public DealCard()
    {

    }

    public override void Execute(Action action)
    {
        Controller player = EntityManager.Singelton.GetEntity(controllerGuid) as Controller;
        if (player == null)
        {
            Debug.Log("Could not find controller in EntityManager, bad Guid");
            action();
            return;
        }



        Card card = EntityManager.Singelton.GetEntity(cardGuid) as Card;
        if (card == null)
        {
            //The deal card is a card into there hand
            if (controllerGuid == PlayArea.Singelton.AwayGuid)
            {
                Card unknowCard = new UnknowCard();
                unknowCard.SetCardType(2);
                EntityManager.Singelton.AddEntity(cardGuid, unknowCard as entity);
                player.AddCardToHand(unknowCard);
            }
        }
        else
        {
            player.RemoveCardFromDeck(card);
            player.AddCardToHand(card);
        }
        action();
    }


    public override void OnGUI()
    {
        
    }

}
