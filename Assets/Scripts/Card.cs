using System;
using UnityEngine;
using System.Collections;
using MoonSharp.Interpreter;

public abstract class Card : entity  {

    private string name;
    private string desc;
    private string art;
    private Script cardFile;
    private int mana;
    private Guid guid;
    private CardAvatar cardAvatar;
    
    public void SetName(string name)
    {
        this.name = name;
    }
    public string GetName()
    {
        return name;
    }

    public void SetCardFile(Script cardFile)
    {
        this.cardFile = cardFile;
    }
    public Script GetCardFile()
    {
        return cardFile;
    }

    public void SetMana(int mana)
    {
        this.mana = mana;
    }
    public int GetMana()
    {
        return mana;
    }
    
    public void SetGuid(Guid guid)
    {
        this.guid = guid;
    }
    public Guid GetGuid()
    {
        return guid;
    }

    public void SetArt(string art)
    {
        this.art = art;
    }
    public string GetArt()
    {
        return art;
    }

    public void SetDesc(string desc)
    {
        this.desc = desc;
    }
    public string GetDesc()
    {
        return desc;
    }

    public void SetCardAvatar(CardAvatar cardAvatar)
    {
        if (this.cardAvatar)
        {
            this.cardAvatar = cardAvatar;
        }
    }
    public CardAvatar GetCardAvatar()
    {
        return cardAvatar;
    }


    //On Pulled from the deck
    public abstract void OnPull();
    //On Played into the battle field
    public abstract void OnPlay();

}
