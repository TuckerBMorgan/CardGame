using UnityEngine;
using System.Collections;

public class AddTag : Rune {

	public string minion_uid { get; set; }

	public string tag { get; set; }

	public override void Execute (System.Action action)
	{
		action ();
	}

	public override void OnGUI ()
	{
		
	}
}
