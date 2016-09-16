using UnityEngine;
using System.Collections;

public class ModifyAttack : Rune {

	public string source { get; set; }
	public string target { get; set; }
	public int amount { get; set; }

	public override void Execute (System.Action action)
	{
		Debug.Log ("SDFSDFSDFSDFSDFSDFSDFSDF");
		var ent = EntityManager.Singelton.GetEntity (target) as damageable;
		ent.ModifyAttack (amount);
		action ();
	}

	public override void OnGUI ()
	{
		
	}
}
