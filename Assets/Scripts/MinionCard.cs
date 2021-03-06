﻿using UnityEngine;
using System.Collections;

public class MinionCard : Card, damageable {

    protected int baseAttack;
    protected int baseHealth;
    protected int useHealth;
	protected int useAttack;

    public void SetBaseAttack(int baseAttack)
    {
        this.baseAttack = baseAttack;
    }
    public int GetBaseAttack()
    {
        return baseAttack;
    }
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

    public void ModifyHealth(int amount)
    {
        useHealth += amount;
        cardAvatar.ModifyHealth(amount);
    }

    public int GetHealth()
    {
        return useHealth;
    }

    public void SetHealth(int health)   
    {
        baseHealth = health;
		cardAvatar.SetTotalHealth (baseHealth);
    }

	public void SetAttack(int attack)
	{
		useAttack = attack;
		cardAvatar.SetAttack (attack);
	}

	public void ModifyAttack(int amount)
	{
		useAttack += amount;
		cardAvatar.ModifyAttack (amount);
	}

	public int GetAttack()
	{
		return useAttack;
	}

}
