using UnityEngine;
using System.Collections;

public class RemoveTag : Rune {

	public string source { get; set; }

	public string target { get; set; }

	public string tag { get; set; }

	public override void Execute (System.Action action)
	{
		action ();
	}

	public override void OnGUI ()
	{

	}
}
