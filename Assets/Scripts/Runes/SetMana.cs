using UnityEngine;
using System.Collections;
using System;

public class SetMana : Rune {

    public string controller_uid { get; set; }
    public int mana { get; set; }

    public override void Execute(Action action)
    {
        Controller playerController = EntityManager.Singelton.GetEntity(controller_uid) as Controller;
        if(playerController == null)
        {
            Debug.Log("Problem finding controller with guid" + controller_uid);
            action();
            return;
        }

        playerController.SetMana(mana);
        action();
    }

    public override void OnGUI()
    {

    }

}
