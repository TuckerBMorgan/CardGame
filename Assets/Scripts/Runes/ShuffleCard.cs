using UnityEngine;
using System.Collections;

public class ShuffleCard : Rune
{

    public string controllerGuid { get; set; }
    public string cardGuid { get; set; }

    public override void Execute(System.Action action)
    {
        Controller controller = EntityManager.Singelton.GetEntity(controllerGuid) as Controller;

        if (controller == null)
        {
            Debug.Log("Bad controller");
            return;
        }

        Card card = EntityManager.Singelton.GetEntity(cardGuid) as Card;
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