using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System;

public class OptionsManager : MonoBehaviour {

    public static OptionsManager Singleton;

    public const string MULLIGAN = "Emulligan";
    public const string NO_MULLIGAN = "noMulligan";
    public const string END_TURN = "EEndTurn";
    public const string PLAY_CARD = "EPlayCard";
    public const string ATTACK = "EAttack";
    public const string PLAY_SPELL = "EPlaySpell";
    public const string HERO_POWER = "HERO_POWER";

    public string endTurnKey = "EndTurn";
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
            switch(j["option_type"].str)
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
                    if(!options.ContainsKey(END_TURN))
                    {
                        options.Add(END_TURN, new List<Option>());
                    }

                    options[END_TURN].Add(et);
                    break;
                case PLAY_CARD:

                    PlayCardOption pc = new PlayCardOption();
                    pc.n = count;
					pc.cardGuid = j["source_uid"].n.ToString();
					pc.targetGuid = j["target_uid"].n.ToString();

                    count++;
                    if(!options.ContainsKey(pc.cardGuid))
                    {
                        options.Add(pc.cardGuid, new List<Option>());
                    }

                    options[pc.cardGuid].Add(pc);
                    break;
			case ATTACK:

					AttackOption a = new AttackOption ();
					a.n = count;
					a.cardGuid = j ["source_uid"].n.ToString ();
					a.defenderGuid = j["target_uid"].n.ToString();

                    count++;
                    if(!options.ContainsKey(a.cardGuid))
                    {
                        options.Add(a.cardGuid, new List<Option>());
                    }

                    options[a.cardGuid].Add(a);
                    break;

                case HERO_POWER:
                    break;

                case PLAY_SPELL:
                    
                    PlaySpellOption ps = new PlaySpellOption();
                    ps.n = count;
					ps.cardGuid = j["cardGuid"].n.ToString();
					ps.target = j["targetGuid"].n.ToString();
                    
                    count++;
                    if (!options.ContainsKey(ps.cardGuid))
                    {
                        options.Add(ps.cardGuid, new List<Option>());
                    }
                    options[ps.cardGuid].Add(ps);

                    break;
			default:
				
                    break;
            }
        }
    }

    public List<Option> GetAllOptionsWithKeys(string startKey)
    {
        return options[startKey];
    }

    public void PickUpOption(Option op)
    {
        string str = "{\"message_type\":\"option\",";
        str += "\"index\":" + op.n + ",";
		str += "\"board_index\":" + 0 + ",";	
        str += "\"timeStamp\":" + DateTime.Now.Second.ToString() + "}";
        Client.Singelton.SendNewMessage(str);
        FlushOptions();
    }

	public void PickUpOption(Option op, int index)
	{
		string str = "{\"message_type\":\"option\",";
		str += "\"index\":" + op.n + ",";
		str += "\"board_index\":" + index + "}";
		Client.Singelton.SendNewMessage(str);
		FlushOptions();
	}

    public bool HasOption(string guid, string key)
    {
        if (!options.ContainsKey(key))
            return false;

        List<Option> li = options[key];
        for (int i = 0; i < li.Count;i++ )
        {
             
        }

            return false;
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

public class EndTurn : Option
{
    
}

public class PlayCardOption : Option
{
    public string cardGuid;
    public string targetGuid;
}

public class PlaySpellOption : Option
{
    public string cardGuid;
    //Same as a hero power call, this can either a no target or a one target
    //A value of negatice one means the spell handles its own targeting
    public string target;
}

public class AttackOption : Option
{
    public string cardGuid;
    public string defenderGuid;
}

public class HeroPower : Option
{
    
    //This will be a special value (likely -1) if the ability does not have a target
    //Hero powers are a odd mix so this is at the moment the best solution I can think of
    // to deal with the different types like auto targets--hunter, paladin, and single target-mage, or self target like warlock
    public string targetGuid;
    
}