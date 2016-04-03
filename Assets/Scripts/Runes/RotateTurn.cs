using UnityEngine;
using System.Collections;

public class RotateTurn : Rune{
    
    public override void Execute(System.Action action)
    {
        action();
    }

    public override void OnGUI()
    {
        
    }
}
