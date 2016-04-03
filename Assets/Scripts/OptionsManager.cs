using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System;

public class OptionsManager : MonoBehaviour {

    public static OptionsManager Singleton;

    public const string MULLIGAN = "mulligan";
    public const string NO_MULLIGAN = "noMulligan";
    public const string END_TURN = "endTurn";
    public const string PLAY_CARD = "playCard";
    public const string ATTACK = "attack";
    public string endTurnKey = "endTurn";
    public string noMulliganKey = "noMulliganKey";

    public Dictionary<string, List<Option>> options;

    public void Awake()
    {
        Singleton = this;
        options = new Dictionary<string, List<Option>>();
    
    }

    public void StartToProcessOptions(JSONObject jsonObject)
    {
        int count = 0;
        foreach(JSONObject j in jsonObject["options"].list)
        {
            
            switch(j["option"].str)
            {
                case MULLIGAN:
                    //WHY DID I DO THIS
                    /*
                    Mulligan m = new Mulligan();
                    m.n = count;
                 //   m.cardGuid = j["cardGuid"].str;
                    count++;
                    if(!options.ContainsKey(m.cardGuid))
                    {
                        options.Add(m.cardGuid, new List<Option>());
                    }

                    options[m.cardGuid].Add(m);
                     * */
                    break;
                case NO_MULLIGAN:
                    NoMulligan nm = new NoMulligan();
                    nm.n = count;
                    count++;
                    if(!options.ContainsKey(noMulliganKey))
                    {
                        options.Add(noMulliganKey, new List<Option>());
                    }
                    options[noMulliganKey].Add(nm);
                    break;
                case END_TURN:
                    EndTurn et = new EndTurn();
                    et.n = count;
                    count++;
                    if(!options.ContainsKey(endTurnKey))
                    {
                        options.Add(endTurnKey, new List<Option>());
                    }
                    options[endTurnKey].Add(et);
                    break;
                case PLAY_CARD:
                    PlayCardOption pc = new PlayCardOption();
                    pc.n = count;
                    pc.cardGuid = j["cardGuid"].str;
                    count++;
                    if(!options.ContainsKey(pc.cardGuid))
                    {
                        options.Add(pc.cardGuid, new List<Option>());
                    }
                    options[pc.cardGuid].Add(pc);
                    break;
                case ATTACK:
                    Attack a = new Attack();
                    a.n = count;
                    a.cardGuid = j["cardGuid"].str;
                    a.defenderGuid = j["defendedGuid"].str;
                    count++;
                    if(!options.ContainsKey(a.cardGuid))
                    {
                        options.Add(a.cardGuid, new List<Option>());
                    }

                    options[a.cardGuid].Add(a);
                    break;
                default:
                    
                    break;
            }
        }

        
    }

    public void PickUpOption(Option op)
    {
        string str = "{\"type\":\"option\",";
        str += "\"index\":" + op.n + "}";
        Client.Singelton.SendNewMessage(str);
        FlushOptions();
    }

    public void FlushOptions()
    {
        options.Clear();
    }
}

public class Option
{
    public int n;
}

public class NoMulligan : Option
{

}

public class Mulligan : Option
{
    public string cardGuid;
}



public class EndTurn : Option
{
    
}

public class PlayCardOption : Option
{
    public string cardGuid;
}

public class Attack : Option
{
    public string cardGuid;
    public string defenderGuid;
}