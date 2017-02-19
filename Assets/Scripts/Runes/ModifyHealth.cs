using UnityEngine;
using System.Collections;

public class ModifyHealth : Rune {
	
    public string target_uid { get; set; }
    public int amount { get; set; }


    public override void Execute(System.Action action)
    {
        var ent = EntityManager.Singelton.GetEntity(target_uid) as damageable;
        ent.ModifyHealth(amount);
        action();
    }

    public override void OnGUI()
    {
        
    }
}
