using UnityEngine;
using System.Collections;
using System;

public class SetHeroHealth : Rune {

    public string hero_uid { get; set; }
    public int health { get; set; }

    public override void Execute(Action action)
    {
        action();
    }

    public override void OnGUI()
    {

    }

}
