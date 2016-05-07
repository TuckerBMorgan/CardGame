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
    static List<string> newFile;
    void OnGUI()
    {
        if (currentCard == null)
        {
            if (GUILayout.Button("New Card"))
            {
                currentCard = new CardPrototype();
                currentCard.tags = new List<string>();
                waitingForId = true;

            }

            if (GUILayout.Button("Load Card"))
            {
                //Will have to look at all the cards and then load them

            }
        }
        else
        {
            if (waitingForId)
            {
                GUILayout.Label("Card Id (must be unique across all cards):");
                useId = GUILayout.TextField(useId, GUILayout.Width(100));
                cardTypes ct = (cardTypes)EditorGUILayout.EnumPopup("Card Type: ", currentCard.type, GUILayout.Width(250));

                if (GUILayout.Button("create card with this id"))
                {
                    switch (ct)
                    {
                        case cardTypes.MINION:
                            currentCard = new MinionPrototype();
                            break;
                        case cardTypes.SPELL:
                            currentCard = new CardPrototype();
                            break;
                    }


                    CreateNewCardFile(DEFAULT_MINION_FILE);
                    LoadCardData();

                    currentCard.id = useId;
                    waitingForId = false;
                }
                return;
            }
            if (GUILayout.Button("Save"))
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
            EditorGUILayout.LabelField("Id:(This is not to be changed EVER)", currentCard.id, GUILayout.Width(200));

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
            if (holdMana >= 0)
            {
                currentCard.cost = holdMana;
            }

            EditorGUILayout.LabelField("Tags ie: Taunt, Divine Sheild..etc etc");
            for (int i = 0; i < currentCard.tags.Count; i++)
            {
                currentCard.tags[i] = EditorGUILayout.EnumPopup((tags)Enum.Parse(typeof(tags), currentCard.tags[i]), GUILayout.Width(100)).ToString();
            }
            if (GUILayout.Button("+", GUILayout.Width(100)))
            {
                currentCard.tags.Add("Taunt");
            }

            if (currentCard.type == cardTypes.MINION)
            {
                MinionPrototype mp = currentCard as MinionPrototype;
                //baseHealth must be greaten than 0
                holdHealth = EditorGUILayout.IntField("Base Health", mp.baseHealth, GUILayout.Width(200));
                if (holdHealth > -1)
                {
                    mp.baseHealth = holdHealth;
                }

                holdAttack = EditorGUILayout.IntField("Base Attack", mp.baseAttack, GUILayout.Width(200));
                if (holdAttack > -1)
                {
                    mp.baseAttack = holdAttack;
                }
            }
        }
    }

    public void SnipOutDeafaultCardData()
    {
        int indexStart = -1, indexEnd = -1;
        for (int i = 0; i < newFile.Count; i++)
        {
            if (newFile[i].Contains(DEFAULT_FILE_DATA_START_FALG))
            {
                indexStart = i;
            }
            else if (newFile[i].Contains(DEFAULT_FILE_DATA_END_FALG))
            {
                indexEnd = i;
            }
        }

        if (indexStart != indexEnd)
        {
            newFile.RemoveRange(indexStart, indexEnd - indexStart);
        }
    }

    public void InsertCardData(string cardData)
    {
        string exports = "exports.data = ";
        exports += cardData;
        int index = 0;
        for (int i = 0; i < newFile.Count; i++)
        {
            if (newFile[i].Contains(DEFAULT_FILE_DATA_START_FALG))
            {
                index = i;
            }
        }
        newFile.Insert(index + 1, exports);
    }

    public void LoadCardData()
    {
        if (newFile == null)
            return;

        int indexStart = -1, indexEnd = -1;
        for (int i = 0; i < newFile.Count; i++)
        {
            if (newFile[i].Contains(DEFAULT_FILE_DATA_START_FALG))
            {
                indexStart = i;
            }
            else if (newFile[i].Contains(DEFAULT_FILE_DATA_END_FALG))
            {
                indexEnd = i;
            }
        }

        string cardData = "{\n";
        for (int i = indexStart + 2; i < indexEnd; i++)
        {
            if (newFile.Contains("\\\\"))
            {
                //This is to deal with in struct comments I have
                continue;
            }
            if (i == indexStart + 2)
            {
                //have to deal with exports in this manner, wish I had a better way of doing this, will be a pain with tags, need better solution
                if (newFile[i].Contains("MINION"))
                {
                    cardData += "\"type\":0,\n";
                    continue;
                }
                else if (newFile[i].Contains("SPELL"))
                {
                    cardData += "\"type\":1,\n";
                    continue;
                }
            }
            cardData += newFile[i];
        }
        
        JSONObject jo = new JSONObject(cardData);
        currentCard.type = (cardTypes)(int)jo["type"].i;
        currentCard.cardName = jo["cardName"].str;
        currentCard.desc = jo["desc"].str;
        currentCard.cost = (int)jo["cost"].i;
        currentCard.art = jo["art"].str;
        currentCard.tags = new List<string>();

        if(currentCard.type == cardTypes.MINION)
        {
            MinionPrototype mp = currentCard as MinionPrototype;
            mp.baseAttack = (int)jo["baseAttack"].i;
            mp.baseHealth = (int)jo["baseHealth"].i;
        }



    }

    //THIS DOES NOT WORK REMOTALY THE WAY IT IS SEEMS PLEASE READ READ READ
    public void CreateNewCardFile(string filename)
    {
        StreamReader file = new StreamReader(filename);
        bool start_reading = false;
        newFile = new List<string>();
        string line;
        while ((line = file.ReadLine()) != null)
        {
            if (start_reading)
            {
                newFile.Add(line);
            }
            if (line.Contains(DEFAULT_FILE_START_STRING))
            {
                start_reading = true;
            }
        }
        file.Close();
    }

    public void OnClose()
    {

    }
}
