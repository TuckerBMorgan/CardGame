using UnityEngine;
using System.Collections;

public class SetBaseMana : Rune {

    public string controller_uid { get; set; }
    public int base_mana { get; set; }

    public override void Execute(System.Action action)
    {
        Controller playerController = EntityManager.Singelton.GetEntity(controller_uid) as Controller;
        if(playerController == null)
        {
            Debug.Log("Program finding Controller with guid" + controller_uid);
            action();
            return;
        }
        playerController.SetBaseMana(base_mana);
        action();
    }
    public override void OnGUI()
    {
        
    }
}
