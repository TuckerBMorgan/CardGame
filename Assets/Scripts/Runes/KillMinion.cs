using UnityEngine;
using System.Collections;
using System;

public class KillMinion : Rune { 

    public string minion_uid { get; set; }
    public string controller_uid { get; set; }

    public override void Execute(Action action)
    {
        Card card = EntityManager.Singelton.GetEntity(minion_uid) as Card;
        card.GetCardAvatar().transform.position = card.GetCardAvatar().transform.position + new Vector3(10000,0,0);
        card.GetCardAvatar().cardAvatarState = CardAvatarState.inGraveyad;
        card.GetCardAvatar().gameObject.SetActive(false);
        action();
    }

    public override void OnGUI()
    {

    }
}
