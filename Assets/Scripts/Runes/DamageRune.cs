using System;
using UnityEngine;
using System.Collections;

public enum TargetType
{
    minion,
    player
}
public class DamageRune : Rune
{

    //damage must be a negative number as in Current Amount + amount to get new health
    
    public int amount { get; set; }
    public string source { get; set; }
    public string target { get; set; }
    public TargetType targetType { get; set; }


    public DamageRune()
    {

    }

    public override void Execute(Action action)
    {
  //      damageable dmg = EntityManager.Singelton.GetEntity(target) as damageable;

    //    dmg.ModifyHealth(amount);

        action();
    }

    public override void OnGUI()
    {

    }
}
