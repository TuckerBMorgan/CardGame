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
    
    public string controllerGuid { get; set; }
    public string cardGuid { get; set; }
    public OriginOfCard originOfCard { get; set; }
    public TypeOfRemoveFromHand typeOfRemoveFromHand { get; set; }
	public int index{ get; set; }


    public PlayCard()
    {
    }

    public override void Execute(Action action)
    {
        Controller player = EntityManager.Singelton.GetEntity(controllerGuid) as Controller;
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
