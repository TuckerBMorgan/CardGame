using System;
using UnityEngine;
using System.Collections;


//When a card is created, it is attached to no one
//That is why we base the GUID into it, so we can get 
//it afterwards, and then use a GrantCard rune to 
//Give to to a player
public class CreateMinion : Rune {

    public static string TYPE = "type";
    public static string BASE_HEALTH = "baseHealth";
    public static string BASE_ATTACK = "baseAttack";
    public static string DESC = "desc";
    public static string ART = "art";
    public static string COST = "cost";
    public static string NAME = "name";
    public static string CARD_FILE_LOCATION = "Cards/";

    public int cost { get; set; }
    public string id { get; set; }
    public string uid { get; set; }
    public string controller_uid { get; set; }
    public string name { get; set; }
    public string set { get; set; }

    public int base_health { get; set; }
    public int current_health { get; set; }
    public int total_health { get; set; }

    public int base_attack { get; set; }
	public int total_attack{ get; set; }
	public int current_attack{ get; set; }
    
    public int team { get; set; }

    public CreateMinion()
    {

    }

    public override void Execute(Action action)
    {

        Card card;

         //Not sure but I think I might not need this anymore??
        if (EntityManager.Singelton.GetEntity(uid) != null)
        {
            CardAvatar ca = (EntityManager.Singelton.GetEntity(uid) as Card).GetCardAvatar();
            EntityManager.Singelton.RemoveEntity(uid);
            card = new MinionCard();
            MinionCard mc = card as MinionCard;
            CardDataLoader.CardData cd = CardDataLoader.Singelton.GetCardData(id);

            mc.SetName(cd.cardName);
            mc.SetBaseAttack(base_attack);
            mc.SetBaseHealth(base_health);
            mc.SetMana(cost);
            mc.SetGuid(uid);
            mc.SetDesc(cd.desc);
            mc.SetCardAvatar(ca);
            EntityManager.Singelton.AddEntity(uid, mc);
            ca.Setup(card, uid, controller_uid);
        }
        else
        {
            MinionCard mc = new MinionCard();
            CardDataLoader.CardData cd = CardDataLoader.Singelton.GetCardData(id);
            mc.SetCardText(cd.cardText);
            mc.SetName(cd.cardName);
            mc.SetArt(cd.art);
            mc.SetBaseAttack(base_attack);
            mc.SetBaseHealth(base_health);
            mc.SetMana(cost);
            mc.SetGuid(uid);
            mc.SetDesc(cd.desc);
            EntityManager.Singelton.AddEntity(uid, mc);
        }


        action();
    }

    public override void OnGUI()
    {
        
    }
}
