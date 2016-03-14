using System;
using UnityEngine;
using System.Collections;

public class GrantCard : Rune {
    
    public string playerGuid { get; set; }
    public string cardGuid { get; set; }


    public GrantCard()
    {
    }

    public override void Execute(Action action)
    {
        Controller player = EntityManager.Singelton.GetEntity(playerGuid) as Controller;
        if(player == null)
        {
            Debug.Log("Not able to get controller from entity manager, bad GUID");
            action();
            return;
        }
        Card card = EntityManager.Singelton.GetEntity(cardGuid) as Card;
        if(card == null)
        {
            Debug.Log("Not able to get card from entity manager, bad GUID");
            action();
            return;
        }

        player.AddCardToDeck(card);

        action();
    }

    public override void OnGUI()
    {
        
    }
}
