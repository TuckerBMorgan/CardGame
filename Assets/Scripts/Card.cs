using System;
using UnityEngine;
using System.Collections;
using MoonSharp.Interpreter;

public enum CardType
{
    minion,
    test,
    unknown
}

public enum EntityType
{
    minion,
    hero
}
public enum CardState
{
    inDeck,
    inHand,
    inPlay,
    inGraveyard
}
public abstract class Card : entity  {

    protected string name;
    protected string desc;
    protected string art;
    protected int mana;
    protected int health; 
    protected string guid;
    protected CardAvatar cardAvatar;
    protected Script cardFile;
    protected CardType cardType;
    protected CardState cardState;
    

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
    
    public void SetGuid(string guid)
    {
        this.guid = guid;
    }
    public string GetGuid()
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
        if (this.cardAvatar == null)
        {
            this.cardAvatar = cardAvatar;
        }
    }
    public CardAvatar GetCardAvatar()
    {
        return cardAvatar;
    }

    public void SetCardType(int type)
    {
        if(type  > sizeof(CardType) || type < 0)
        {
            Debug.Log(type + " is not a valid card type");
            return;
        }

        cardType = (CardType)type;
    }
    public CardType GetCardType()
    {
        return cardType;
    }

    public void SetCardState(CardState cardState)
    {
        this.cardState = cardState;
    }
    public CardState GetCardState()
    {
        return cardState;
    }
    

    //On Pulled from the deck
    public abstract void OnPull();
    //On Played into the battle field
    public abstract void OnPlay();

}
