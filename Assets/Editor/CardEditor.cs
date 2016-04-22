using UnityEngine;
using System.Collections;
using UnityEditor;
using System;
using System.IO;
using System.Collections.Generic;

public class CardEditor : EditorWindow
{
    //must match up with the numbers in entityMangager.js would love to make them reach from the same place if I could
    public enum cardTypes
    {
        minion = 0,
        spell = 1,
        hero = 2    
    }

    //Must Match up with cardTags.js, but as with above would love for these to reach from the same source
    public enum tags
    {
        Taunt,
        Stealth,
        DivineShield,
        BattleCry,
        WindFury,
        Charge
    }

    class CardPrototype
    {
        public cardTypes type;
        public string cardName;
        public string desc;
        public int cost;
        public string id;//This I might have the editor set, and nothing else, dont want poeple changing them becase they are dumb or ignorant
        public List<string> tags;
        public string art;

        public CardPrototype()
        {
            type = cardTypes.minion;
            cardName = "";
            desc = "";
            cost = 0;
            id = "";
            tags = new List<string>();
            art = "";
        }

        public virtual string CovertToJSONObject()
        {
            string str = "";
            //Cardtype
            str += "{\n\"cardType\":" + (int)type + ",\n";

            //CardName
            str += "\"cardName\":\"" + cardName + "\",\n";
             
            //desc
            str += "\"desc\":\"" + desc + "\",\n";

            //cost
            str += "\"cost\":" + cost + ",\n";

            //id
            str += "\"id\":\"" + id + "\",\n";

            //tags
            str += "\"tags\":[\n";
            for (int i = 0; i < tags.Count; i++)
            {
                if ((i + 1) < tags.Count)
                {
                    str += "\"" + tags[i] + "\",\n";
                }
                else
                {
                    str += "\"" + tags[i] + "\"\n";
                }
            }
            str += "],\n";

            //art
            str += "\"art\":\"" + art +  "\",";

            return str;
        }
    }

    class MinionPrototype : CardPrototype
    {

        public int baseHealth;
        public int baseAttack;

        public MinionPrototype()
            :base()
        {
            baseHealth = 0;
            baseAttack = 0;
        }

        public override string CovertToJSONObject()
        {
            string str = base.CovertToJSONObject();

            //baseHealth
            str += "\"baseHealth\":" + baseHealth + ",\n";
            
            //baseAttack
            str += "\"baseAttack\":" + baseAttack + "\n}";

            return str;
        }
        
    }

    private static CardPrototype currentCard; 

    [MenuItem("Window/Card Editor")]   
    static void Init()
    {
        CardEditor ce = (CardEditor)EditorWindow.GetWindow(typeof(CardEditor));
        ce.Show();
    }
    
    static int holdMana = 0;
    static int holdAttack = 0;
    static int holdHealth = 0;

    static bool waitingForId = false;
    static string useId = "";
    void OnGUI()
    {
        if(currentCard == null)
        {
            if(GUILayout.Button("New Card"))
            {
                currentCard = new CardPrototype();
                currentCard.tags = new List<string>();
                waitingForId = true;
            }
            
            if(GUILayout.Button("Load Card"))
            {
                //Will have to look at all the cards and then load them
            }
        }
        else
        {
            if(waitingForId)
            {
                GUILayout.Label("Card Id (must be unique across all cards):");
                useId = GUILayout.TextField( useId, GUILayout.Width(100));
                cardTypes ct = (cardTypes)EditorGUILayout.EnumPopup("Card Type: ", currentCard.type, GUILayout.Width(250));
                
                if(GUILayout.Button("create card with this id"))
                {
                    switch(ct)
                    {
                        case cardTypes.minion:
                            currentCard = new MinionPrototype();
                            break;
                        case cardTypes.spell:
                            //Just bad things are going to happen here
                            break;
                    }
                    currentCard.id = useId;
                    waitingForId = false;
                }
                return;
            }
            if(GUILayout.Button("Save"))
            {
                //Save the card--this might be interesting
                if (currentCard != null)
                {
                    Debug.Log(currentCard.CovertToJSONObject());
                }
            }

            //This needs to be a enum drop down to covert to a number
            currentCard.type = (cardTypes)EditorGUILayout.EnumPopup("Card Type: ", currentCard.type, GUILayout.Width(250));

            //This will be one of this things we dont edit
            EditorGUILayout.LabelField("Id:(This is not to be changed EVER)" ,currentCard.id, GUILayout.Width(200));
        
            //Will have to validate if this card name is unique, just because
            currentCard.cardName = EditorGUILayout.TextField("Card Name: ", currentCard.cardName, GUILayout.Width(500));

            //art goes here, later, would like both a look up of all art files in a folder
            //and then a preview of the card arr
            //this might be tricky Ill come back later

            

            //This can go crazy, but would like to have basic formatting ideas, like Bold and Italics
            EditorGUILayout.LabelField("Card Description");
            currentCard.desc = EditorGUILayout.TextArea(currentCard.desc);

            //Mana cost, just needs to be greater than -1
            holdMana = EditorGUILayout.IntField("Cost: ", currentCard.cost, GUILayout.Width(200));
            if(holdMana >= 0)
            {
                currentCard.cost = holdMana;
            }
            
            EditorGUILayout.LabelField("Tags ie: Taunt, Divine Sheild..etc etc");
            for(int i = 0;i<currentCard.tags.Count;i++)
            {
                currentCard.tags[i] = EditorGUILayout.EnumPopup((tags)Enum.Parse(typeof(tags), currentCard.tags[i]), GUILayout.Width(100)).ToString();
            }
            if (GUILayout.Button("+", GUILayout.Width(100)))
            {
                currentCard.tags.Add("Taunt");
            }

            if(currentCard.type == cardTypes.minion)
            {
                MinionPrototype mp = currentCard as MinionPrototype;
                //baseHealth must be greaten than 0
                holdHealth = EditorGUILayout.IntField("Base Health", mp.baseHealth, GUILayout.Width(200));
                if(holdHealth > -1)
                {
                    mp.baseHealth = holdHealth;
                }

                holdAttack = EditorGUILayout.IntField("Base Attack", mp.baseAttack, GUILayout.Width(200));
                if(holdAttack > -1)
                {
                    mp.baseAttack = holdAttack;
                }
            }
        }
    }
}
