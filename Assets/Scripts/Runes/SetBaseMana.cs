using UnityEngine;
using System.Collections;

public class SetBaseMana : Rune {

    public string controllerGuid { get; set; }
    public int baseMana { get; set; }

    public override void Execute(System.Action action)
    {
        Controller playerController = EntityManager.Singelton.GetEntity(controllerGuid) as Controller;
        if(playerController == null)
        {
            Debug.Log("Program finding Controller with guid" + controllerGuid);
            action();
            return;
        }
        playerController.SetBaseMana(baseMana);
        action();
    }
    public override void OnGUI()
    {
        
    }
}
