using UnityEngine;
using System.Collections;
using UnityEditor;
using System;
using System.IO;
using System.Collections.Generic;

public class CardEditor : EditorWindow
{


    public static string DEFAULT_MINION_FILE = "Server/cards/default.js";

    //This is a string that apears in default files it lets us annotate the default file without copying those annotations to each file if we do not want to
    public static string DEFAULT_FILE_START_STRING = "DEFAULT_FILE_STARTS_NOW";

    //Comments in the file so I know where it is so I can remove it when I want to, and also where to insert it so it is in the same place across files
    public static string DEFAULT_FILE_DATA_START_FALG = "START_OF_CARD_DATA";
    public static string DEFAULT_FILE_DATA_END_FALG = "END_OF_CARD_DATA";

    //must match up with the numbers in entityMangager.js would love to make them reach from the same place if I could
    public enum cardTypes
    {
        MINION = 0,
        SPELL = 1,
        HERO = 2
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


    public static string basicCanPlay = "exports.canPlay = cardFunctions.basicCanPlay";
    public static string basicAttack = "exports.attack = cardFunctions.basicAttack";
    public static string basicCanAttack = "exports.canAttack = cardFunctions.basicCanAttack";
    public static string basictakeDamage = "exports.takeDamage = cardFunctions.basicTakeDamage";
    public static string basicIsAlive = "exports.isAlive = cardFunctions.basicIsAlive";


    class ServerFileProtoType
    {
        JSONObject data;
        List<String> triggerFunctions;

    }

    class ClientFileProtoType
    {
        JSONObject data;
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
            type = cardTypes.MINION;
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
            str += "{\n\"cardType\":ent." + type.ToString() + ",\n";

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
            str += "\"art\":\"" + art + "\",";

            return str;
        }
    }

    class MinionPrototype : CardPrototype
    {

        public int baseHealth;
        public int baseAttack;

        public MinionPrototype()
            : base()
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

    
    static Dictionary<string, CardDataLoader.CardData> cardData;
    static List<string> keys;

    [MenuItem("Window/Card Editor")]
    static void Init()
    {
        CardEditor ce = (CardEditor)EditorWindow.GetWindow(typeof(CardEditor));
        ce.Show();

        cardData = CardDataLoader.LoadData();
        keys = new List<string>();
        foreach(KeyValuePair<string, CardDataLoader.CardData> kvp in cardData)
        {
            keys.Add(kvp.Key);
        }
    }

    public CardDataLoader currentCard;
    public bool loadCard = false;

    void OnGUI()
    {
        if(currentCard == null)
        {
            if(loadCard)
            {
                foreach(string id in keys)
                {
                    if(GUILayout.Button(id))
                    {

                    }
                }
                return;
            }
            if (GUILayout.Button("Load Card"))
            {
                loadCard = true;
            }
        }
    }

    public JSONObject LoadServerData(CardDataLoader.CardData cardData)
    {
        

        return null;
    }


    public static JSONObject BasicClientCard()
    {
        JSONObject data = new JSONObject();
        data.AddField("cardName", "defaultValue");
        data.AddField("desc", "defaultValue");
        data.AddField("cardText", "");
        data.AddField("art", "defaultArt"); 
        return data;
    }

    public static JSONObject BasicServerMinionCard()
    {
        JSONObject data = new JSONObject();
        data.AddField("type", "ent.MINION");
        data.AddField("cost", 1);
        data.AddField("baseAttack", 1);
        data.AddField("baseHealth", 1);
        data.AddField("set", "cardTags.BASIC");
        data.AddField("id", "defaultValue");
        data.AddField("tags", JSONObject.arr);
        return data;
    }
}

