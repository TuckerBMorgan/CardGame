using System;
using UnityEngine;
using System.Collections;
using MoonSharp.Interpreter;


//When a card is created, it is attached to no one
//That is why we base the GUID into it, so we can get 
//it afterwards, and then use a GrantCard rune to 
//Give to to a player
public class CreateCard : Rune {

    public static string TYPE = "type";
    public static string BASE_HEALTH = "baseHealth";
    public static string BASE_ATTACK = "baseAttack";
    public static string DESC = "desc";
    public static string ART = "art";
    public static string COST = "cost";
    public static string NAME = "name";
    public static string CARD_FILE_LOCATION = "Cards/";

    public string cardGuid { get; set; }
    public string cardName { get; set; }
    public string art { get; set; }
    public string desc { get; set; }
    public int cost { get; set; }
    public int baseHealth { get; set; }
    public int baseAttack { get; set; }

    public CreateCard()
    {
    }

    public override void Execute(Action action)
    {
        TextAsset ta = Resources.Load<TextAsset>(CARD_FILE_LOCATION + cardName);   
        if(ta.text != null)
        {
            Script scr = new Script();
            scr.DoString(ta.text);
            int type = int.Parse(scr.Globals[TYPE].ToString());
            Card card;
            if(type == (int)CardType.minion)
            {
                card = new MinionCard();
                card.SetMana(int.Parse(scr.Globals[COST].ToString()));
                card.SetName(scr.Globals[NAME].ToString());
                card.SetGuid(cardGuid);
                card.SetCardFile(scr);
                card.SetDesc(scr.Globals[DESC].ToString());
                card.SetArt(scr.Globals[ART].ToString());
                MinionCard mc = card as MinionCard;
                mc.SetBaseAttack(int.Parse(scr.Globals[BASE_ATTACK].ToString()));
                mc.SetBaseHealth(int.Parse(scr.Globals[BASE_HEALTH].ToString()));
                EntityManager.Singelton.AddEntity(cardGuid, card);
            }
            else if( type == (int)CardType.test)
            {
                //Need to implement
            }
        }
        else
        {
            Debug.Log("The card " + cardName + " has not been found in the assets folder\n");
        }

        action();
    }

    public override void OnGUI()
    {
        
    }
}
