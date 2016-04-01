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
        foreach(JSONObject j in jsonObject["options"].list)
        {
            switch(j["option"].str)
            {
                case MULLIGAN:
                    Mulligan m = new Mulligan();
                    m.cardGuid = j["cardGuid"].str;
                    if(!options.ContainsKey(m.cardGuid))
                    {
                        options.Add(m.cardGuid, new List<Option>());
                    }

                    options[m.cardGuid].Add(m);
                    break;
                case NO_MULLIGAN:
                    NoMulligan nm = new NoMulligan();
                    if(!options.ContainsKey(noMulliganKey))
                    {
                        options.Add(noMulliganKey, new List<Option>());
                    }
                    options[noMulliganKey].Add(nm);
                    break;
                case END_TURN:
                    EndTurn et = new EndTurn();
                    if(!options.ContainsKey(endTurnKey))
                    {
                        options.Add(endTurnKey, new List<Option>());
                    }

                    options[endTurnKey].Add(et);
                    break;
                case PLAY_CARD:
                    PlayCardOption pc = new PlayCardOption();
                    pc.cardGuid = j["cardGuid"].str;
                    if(!options.ContainsKey(pc.cardGuid))
                    {
                        options.Add(pc.cardGuid, new List<Option>());
                    }
                    options[pc.cardGuid].Add(pc);
                    break;
                case ATTACK:
                    Attack a = new Attack();
                    a.cardGuid = j["cardGuid"].str;
                    a.defenderGuid = j["defendedGuid"].str;

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

    }
}

public class Option
{

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