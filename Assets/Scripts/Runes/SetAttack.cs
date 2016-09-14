using UnityEngine;
using System.Collections;

public class SetAttack : Rune {

	public string cardGuid { get; set; }
	public int amount { get; set; }

	public override void Execute (System.Action action)
	{
		action ();
	}

	public override void OnGUI ()
	{
		
	}
}
