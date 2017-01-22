using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Mulligan :Rune {

    public override void Execute(Action action)
    {
        action();
    }

    public override void OnGUI()
    {

    }
}
