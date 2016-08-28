using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;

public class HeroAvatar : MonoBehaviour {

    public const string HERO_PORTRAIT_PATH = "HeroPortaits/";
    public const string HERO_POWER_PATH = "HeroPowers/";

    public Text mana;
    public Text health;
    public Image portrait;
    public Image heroPower;

    public int currentHealth;
    public int currentTotalHealth;

    public int currentMana;
    public int currentTopMana;

    public bool HomeAvatar;

    public string careAboutGuid;

	// Use this for initialization
	void Start () {

        RuneManager.Singelton.AddListener(typeof(NewController), SetHero);
        RuneManager.Singelton.AddListener(typeof(SetHeroHealth), OnSetHeroHealth);
        RuneManager.Singelton.AddListener(typeof(SetBaseMana), OnSetBaseMana);
        RuneManager.Singelton.AddListener(typeof(SetMana), OnSetMana);
        RuneManager.Singelton.AddListener(typeof(ModifyHealth), OnModifyHealth);
    }
	
	// Update is called once per frame
	void Update () {
	
	}

    public void OnModifyHealth(Rune rune, System.Action action)
    {
        ModifyHealth mh = rune as ModifyHealth;

        if(mh.target == careAboutGuid)
        {
            action();
            return;
        }


        int currentHealth = int.Parse(health.text);
        currentHealth += mh.amount;
        health.text = currentHealth.ToString();

        action();
    }

    public void OnSetHeroHealth(Rune rune, System.Action action)
    {
        SetHeroHealth shh = rune as SetHeroHealth;

        if (shh.heroGuid != careAboutGuid)
        {
            action();
            return;
        }

        health.text = shh.health.ToString();
        action();
    }


    public void SetHero(Rune rune, System.Action action)
    {
        NewController nc = rune as NewController;
       // string str = HERO_PORTRAIT_PATH + nc.hero + "Port";
        
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
        //need to write in targeting system and have this work with that



    }

    public void OnHeroPowerClicked()
    {
        if(OptionsManager.Singleton.options.ContainsKey(careAboutGuid))
        {
             List<Option> ops = OptionsManager.Singleton.options[careAboutGuid];
            if(ops.Count == 1)
            {
                HeroPower hp = ops[0] as HeroPower;
                if(hp.targetGuid == "-1")
                {
                    //This means that the hero power is a no target power IE: Hunter, Paladin, Warlock, Warrior, Rougue, Shamen
                    OptionsManager.Singleton.PickUpOption(ops[0]);
                }
            }
            else
            {
                //this means there are target, working on that one
            }
        }
    }
    



}
