using UnityEngine;
using System.Collections;

public class Attack : Rune {

    public string source_uid { get; set; }
    public string target_uid { get; set; }

    public override void Execute(System.Action action)
    {
        //This is be done later
        action();
    }

    public override void OnGUI()
    {
        
    }
}
