using System;
using UnityEngine;
using System.Collections;

public class DealCard : Rune {
    

    public string controller_uid { get; set; }
    public string card_uid { get; set; }

    public DealCard()
    {

    }

    public override void Execute(Action action)
    {
        Controller player = EntityManager.Singelton.GetEntity(controller_uid) as Controller;

        if (player == null)
        {
            Debug.Log("Could not find controller in EntityManager, bad Guid");
            action();
            return;
        }



        Card card = EntityManager.Singelton.GetEntity(card_uid) as Card;
        if (card == null)
        {
            //The deal card is a card into there hand
            if (controller_uid == PlayArea.Singelton.AwayGuid)
            {
                Card unknowCard = new UnknowCard();
                unknowCard.SetCardType(2);
                EntityManager.Singelton.AddEntity(card_uid, unknowCard as entity);
                player.AddCardToHand(unknowCard);
                unknowCard.SetCardState(CardState.inHand);
            }
        }
        else
        {
            card.SetCardState(CardState.inHand);
            player.RemoveCardFromDeck(card);
            player.AddCardToHand(card);
        }
        action();
    }


    public override void OnGUI()
    {
        
    }

}
