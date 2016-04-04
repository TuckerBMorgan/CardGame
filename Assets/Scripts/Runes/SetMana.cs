using UnityEngine;
using System.Collections;
using System;

public class SetMana : Rune {

    public string controllerGuid { get; set; }
    public int mana { get; set; }

    public override void Execute(Action action)
    {

        action();
    }

    public override void OnGUI()
    {

    }

}
