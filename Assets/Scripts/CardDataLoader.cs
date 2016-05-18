using UnityEngine;
using System.IO;
using System.Xml;
using System.Text;
using System.Collections;
using System.Collections.Generic;

public class CardDataLoader : MonoBehaviour
{
    public const string ID = "id";
    public const string CARD_NAME = "cardName";
    public const string DESC = "desc";
    public const string CARD_TEXT = "cardText";
    public const string ART = "art";
    public static CardDataLoader Singelton;

    public class CardData
    {
        public string id;
        public string cardName;
        public string desc;
        public string cardText;
        public string art;
        public string set;
        public string classGroup;
    }

    public const string CARDS_JSON = "Assets\\Resources\\Cards\\Cards.json";

    private Dictionary<string, CardData> cards;

    void Awake()
    {
        Singelton = this;
        
        cards = LoadData();
    }


    public static Dictionary<string,CardData> LoadData()
    {
        Dictionary<string, CardData> data = new Dictionary<string, CardData>();

        string str = File.ReadAllText(CARDS_JSON);

        JSONObject js = new JSONObject(str);
        JSONObject sets = js["sets"];

        foreach(string setKey in sets.keys)
        {
            foreach(string classKeys in sets[setKey].keys)
            {
                foreach(string cardKeys in sets[setKey][classKeys].keys)
                {
                    JSONObject card = sets[setKey][classKeys][cardKeys];
                    CardData cd = new CardData();
                    cd.id = cardKeys;
                    cd.cardName = card["cardName"].str;
                    cd.art = card["art"].str;
                    cd.cardText = card["cardText"].str;
                    cd.desc = card["desc"].str;
                    cd.set = setKey;
                    cd.classGroup = classKeys;
                    data.Add(cd.id, cd);
                }
            }
        }
        return data;
    }

    public CardData GetCardData(string id)
    {
        if(cards.ContainsKey(id))
        {
            return cards[id];
        }
        else
        {
            return null;
        }
    }


}
