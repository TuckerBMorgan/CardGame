using UnityEngine;
using System.Collections;

public class SummonMinion : Rune {

    public string controllerGuid{get;set;}
    public string sourceCardGuid { get; set; }
    public string cardGuid { get; set; }
    public string cardId { get; set; }
	public int fieldIndex{ get; set; }

    public override void Execute(System.Action action)
    {
        action();    
    }

    public override void OnGUI()
    {
        
    }

} 