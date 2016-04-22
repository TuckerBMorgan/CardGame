using UnityEngine;
using System.Collections;

public class Attack : Rune {

    public string source { get; set; }
    public string target { get; set; }

    public override void Execute(System.Action action)
    {
        //This is be done later
        action();
    }

    public override void OnGUI()
    {
        
    }
}
