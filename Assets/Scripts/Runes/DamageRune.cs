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
    public int amount;
    public Guid source;
    public Guid target;
    public TargetType targetType;

    public DamageRune(int amount, Guid source, Guid target, TargetType targetType)
    {
        this.amount = amount;
        this.source = source;
        this.target = target;
        this.targetType = targetType;
    }

    public override void Execute(Action action)
    {
        damageable dmg = EntityManager.Singelton.GetEntity(target) as damageable;

        dmg.ModifyHealth(amount);

        action();
    }

    public override void OnGUI()
    {

    }
}
