using UnityEngine;
using System.Collections;

public class ShuffleCard : Rune
{

    public string controller_uid { get; set; }
    public string card_uid { get; set; }

    public override void Execute(System.Action action)
    {
        Controller controller = EntityManager.Singelton.GetEntity(controller_uid) as Controller;

        if (controller == null)
        {
            Debug.Log("Bad controller");
            return;
        }

        Card card = EntityManager.Singelton.GetEntity(card_uid) as Card;
        if (card == null)
        {
            Debug.Log("Bad Card");
            return;
        }

        controller.RemoveCardFromHand(card);
        controller.AddCardToDeck(card);
        action();
    }

    public override void OnGUI()
    {

    }
}