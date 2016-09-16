using UnityEngine;
using System.Collections;

public class SetAttack : Rune {

	public string cardGuid { get; set; }
	public int amount { get; set; }

	public override void Execute (System.Action action)
	{
		var ent = EntityManager.Singelton.GetEntity (cardGuid) as damageable;
		ent.SetAttack (amount);
		action ();
	}

	public override void OnGUI ()
	{
		
	}
}
