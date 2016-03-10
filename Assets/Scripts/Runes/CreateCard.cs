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
    public static string MINION_CARD = "minionCard";
    public static string SPELL_CARD = "spellCard";
    public static string BASE_HEALTH = "baseHealth";
    public static string BASE_ATTACK = "baseAttack";
    public static string DESC = "desc";
    public static string ART = "art";
    public static string COST = "cost";
    public static string NAME = "name";
    public static string CARD_FILE_LOCATION = "Cards/";

    public Guid guid;
    public string cardName;

    public CreateCard(Guid guid, string cardName)
    {
        this.guid = guid;
        this.cardName = cardName;
    }

    public override void Execute(System.Action action)
    {
        TextAsset ta = Resources.Load<TextAsset>(CARD_FILE_LOCATION + cardName);   
        if(ta.text != null)
        {
            Script scr = new Script();
            scr.DoString(ta.text);
            string type = scr.Globals[TYPE].ToString();
            Card card;
            if(type == MINION_CARD)
            {
                card = new MinionCard();
                card.SetMana(int.Parse(scr.Globals[COST].ToString()));
                card.SetName(scr.Globals[NAME].ToString());
                card.SetGuid(guid);
                card.SetCardFile(scr);
                card.SetDesc(scr.Globals[DESC].ToString());
                card.SetArt(scr.Globals[ART].ToString());
                MinionCard mc = card as MinionCard;
                mc.SetBaseAttack(int.Parse(scr.Globals[BASE_ATTACK].ToString()));
                mc.SetBaseHealth(int.Parse(scr.Globals[BASE_HEALTH].ToString()));
                EntityManager.Singelton.AddEntity(guid, card);
            }
            else if( type == SPELL_CARD)
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
