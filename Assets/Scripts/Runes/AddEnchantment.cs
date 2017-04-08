using UnityEngine;
using System.Collections;

public class AddEnchantment : Rune {

	public string target_uid {get;set;}
	public string source_uid {get;set;}

	public override void Execute (System.Action action)
	{
		action ();
	}

	public override void OnGUI ()
	{
		
	}
}