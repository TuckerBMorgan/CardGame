using UnityEngine;
using System.Collections;

public class PlaySpell : Rune {

    public string cardGuid { get; set; }
    public string targetGuid { get; set; }
    public string controllerGuid { get; set; }

    public override void Execute(System.Action action)
    {
        action();
    }

    public override void OnGUI()
    {
        
    }

}
