﻿using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class HeroAvatar : MonoBehaviour {

    public const string HERO_PORTRAIT_PATH = "HeroPortaits/";
    public const string HERO_POWER_PATH = "HeroPowers/";

    public Text mana;
    public Image portrait;
    public Image heroPower;

    public int currentMana;
    public int currentTopMana;

    public bool HomeAvatar;

    public string careAboutGuid;

	// Use this for initialization
	void Start () {

        RuneManager.Singelton.AddListener(typeof(NewController), SetHero);
        RuneManager.Singelton.AddListener(typeof(SetBaseMana), OnSetBaseMana);
        RuneManager.Singelton.AddListener(typeof(SetMana), OnSetMana);
        RuneManager.Singelton.AddListener(typeof(ModifyHealth), OnModifyHealth);
    }
	
	// Update is called once per frame
	void Update () {
	
	}

    public void OnModifyHealth(Rune rune, System.Action action)
    {


        action();
    }


    public void SetHero(Rune rune, System.Action action)
    {
        NewController nc = rune as NewController;
        string str = HERO_PORTRAIT_PATH + nc.hero + "Port";
        
        Sprite heroPort = Resources.Load<Sprite>("HeroPortraits/hunterPort");
        Sprite heroPower = Resources.Load<Sprite>(HERO_POWER_PATH + nc.hero + "Power");
        
        if (nc.isMe == HomeAvatar)
        {
            careAboutGuid = nc.controllerGuid;
        }
        portrait.overrideSprite = heroPort;
        this.heroPower.overrideSprite = heroPower;
        action();
    }

    public void OnSetBaseMana(Rune rune, System.Action action)
    {
        SetBaseMana sbm = rune as SetBaseMana;
        if (sbm.controllerGuid != careAboutGuid)
        {
            action();
            return;
        }
        currentTopMana = sbm.baseMana;
        mana.text = currentMana + " : " + currentTopMana;

        action();
    }

    public void OnSetMana(Rune rune, System.Action action)
    {

        SetMana sm = rune as SetMana;
        if(sm.controllerGuid != careAboutGuid)
        {
            action();
            return;
        }
        currentMana = sm.mana;
        mana.text = currentMana + " : " + currentTopMana;
        action();
    }

    public void OnPortaitClicked()
    {

    }

    public void OnHeroPowerClicked()
    {

    }
    



}