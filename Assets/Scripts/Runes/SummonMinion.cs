using UnityEngine;
using System.Collections;

public class SummonMinion : Rune {

    public string controller_uid{get;set;}
    public string card_uid { get; set; }
	public int field_index{ get; set; }

    public override void Execute(System.Action action)
    {
        action();    
    }

    public override void OnGUI()
    {
        
    }

} 