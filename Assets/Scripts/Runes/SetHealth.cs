using UnityEngine;
using System.Collections;

public class SetHealth : Rune {

    public string card_uid { get; set; }
    public int amount { get; set; }

    public override void Execute(System.Action action)
    {
		var ent = EntityManager.Singelton.GetEntity(card_uid) as damageable;
        ent.SetHealth(amount);
        action();
    }

    public override void OnGUI()
    {

    }
}
