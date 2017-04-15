using UnityEngine;
using System.Collections;

public class SetAttack : Rune {

	public string card_uid { get; set; }
	public int amount { get; set; }

	public override void Execute (System.Action action)
	{
		var ent = EntityManager.Singelton.GetEntity (card_uid) as damageable;
		ent.SetAttack (amount);
		action ();
	}

	public override void OnGUI ()
	{
		
	}
}
