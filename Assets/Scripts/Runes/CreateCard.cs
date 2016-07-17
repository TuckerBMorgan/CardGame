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
    public int cost { get; set; }
    public int baseHealth { get; set; }
    public int currentHealth { get; set; }
    public int totalHealth { get; set; }
    public int team { get; set; }
    public int baseAttack { get; set; }
    public string state { get; set; }
    public string set { get; set; }
    public CardType type { get; set; }
    public EntityType entityType { get; set; }
    public string controllerGuid { get; set; }
    public string id { get; set; }
    
    public CreateCard()
    {
    }

    public override void Execute(Action action)
    {
        Card card;

        //THe case of a deal card being send before a creat rune, EX.(A card in the other persons hand)
        if(EntityManager.Singelton.GetEntity(cardGuid) != null)
        {
            CardAvatar ca = (EntityManager.Singelton.GetEntity(cardGuid) as Card).GetCardAvatar();
            
            EntityManager.Singelton.RemoveEntity(cardGuid);
            if(type == CardType.minion)
            {
                card = new MinionCard();
                MinionCard mc = card as MinionCard;
                CardDataLoader.CardData cd = CardDataLoader.Singelton.GetCardData(id);

                mc.SetName(cd.cardName);
                mc.SetArt(cd.art);
                mc.SetBaseAttack(baseAttack);
                mc.SetBaseHealth(baseHealth);
                mc.SetMana(cost);
                mc.SetGuid(cardGuid);
                mc.SetDesc(cd.desc);
                mc.SetCardAvatar(ca);   
                EntityManager.Singelton.AddEntity(cardGuid, mc);
                ca.Setup(card, cardGuid, controllerGuid);
            }
        }
        else
        {
            if(type == CardType.minion)
            {
               
                MinionCard mc = new MinionCard(); 
                CardDataLoader.CardData cd = CardDataLoader.Singelton.GetCardData(id);
                mc.SetCardText(cd.cardText);
                mc.SetName(cd.cardName);
                mc.SetArt(cd.art);
                mc.SetBaseAttack(baseAttack);
                mc.SetBaseHealth(baseHealth);
                mc.SetMana(cost);
                mc.SetGuid(cardGuid);
                mc.SetDesc(cd.desc);
                EntityManager.Singelton.AddEntity(cardGuid, mc);
            }
            else if (type == CardType.spell)
            {
                SpellCard sc = new SpellCard();
                CardDataLoader.CardData cd = CardDataLoader.Singelton.GetCardData(id);

                sc.SetName(cd.cardName);
                sc.SetArt(cd.art);
                sc.SetMana(cost);
                sc.SetDesc(cd.desc);
                sc.SetGuid(cardGuid);
                sc.SetCardType((int)type);
                EntityManager.Singelton.AddEntity(cardGuid, sc);
            }
        }
        action();
    }

    public override void OnGUI()
    {
        
    }
}
