using UnityEngine;
using System.Collections;

public class ModifyAttack : Rune {

	public string source { get; set; }
	public string target { get; set; }
	public int amount { get; set; }

	public override void Execute (System.Action action)
	{
		action ();
	}

	public override void OnGUI ()
	{
		
	}
}
