using UnityEngine;
using System.Collections;

public class AddEnchantment : Rune {

	public string target {get;set;}
	public string source {get;set;}

	public override void Execute (System.Action action)
	{
		action ();
	}

	public override void OnGUI ()
	{
		
	}
}