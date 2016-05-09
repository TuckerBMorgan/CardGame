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

    class CardData
    {
        public string id;
        public string cardName;
        public string desc;
        public string cardText;
        public string art;
    }

    public const string CARDS_XML = "Assets\\Resources\\Cards\\Cards.xml";

    private Dictionary<string, CardData> cards;

    void Awake()
    {
        cards = new Dictionary<string, CardData>();
        LoadData();
    }


    public void LoadData()
    {
        string str = File.ReadAllText(CARDS_XML);

        int openTagCount = 0;
        string currentId = "";
        using (XmlReader reader = XmlReader.Create(new StringReader(str)))
        {
            while (reader.Read())
            {
                Debug.Log(reader.Name + ":" + reader.Value);
                continue;
                if (reader.NodeType == XmlNodeType.Element)
                {
                    if(reader.Name == ID)
                    {
                       
                        currentId = reader.Value;
                        CardData cd = new CardData();
                        cd.id = currentId;
                        Debug.Log(currentId);
                        cards.Add(currentId, cd);
                    }
                    else if(reader.Name == CARD_NAME)
                    {
                        cards[currentId].cardName = reader.Value;
                    }
                    else if(reader.Name == DESC)
                    {
                        cards[currentId].desc = reader.Value;
                    }
                    else if(reader.Name == CARD_TEXT)
                    {
                        cards[currentId].cardText = reader.Value;
                    }
                    else if(reader.Name == ART)
                    {
                        cards[currentId].art = reader.Value;
                        currentId = "";
                    }
                    openTagCount++;
                }
                else if(reader.NodeType == XmlNodeType.EndElement)
                {
                    openTagCount--;   
                }
            }

        }


    }

}
