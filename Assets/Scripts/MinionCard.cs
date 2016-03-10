using UnityEngine;
using System.Collections;

public class MinionCard : Card {

    private int baseAttack;
    public void SetBaseAttack(int baseAttack)
    {
        this.baseAttack = baseAttack;
    }
    public int GetBaseAttack()
    {
        return baseAttack;
    }

    private int baseHealth;
    public void SetBaseHealth(int baseHealth)
    {
        this.baseHealth = baseHealth;
    }
    public int GetBaseHealth()
    {
        return baseHealth;
    }

    public override void OnPlay()
    {
        
    }

    public override void OnPull()
    {
        
    }

}
