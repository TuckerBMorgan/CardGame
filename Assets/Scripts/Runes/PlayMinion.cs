using UnityEngine;
using System.Collections;

public class PlayMinion : Rune {

    public string minion_uid { get; set; }
	public string controller_uid{get;set;}
	public int field_index{ get; set; }
	public string target_uid { get; set; }

    public override void Execute(System.Action action)
    {	
        action();    
    }

    public override void OnGUI()
    {
        
    }

} 