using System;
using UnityEngine;
using System.Reflection;
using System.Collections.Generic;
using System.Linq;
using UnityEditor;


public class RuneManager : MonoBehaviour
{

    public static string RUNE_TYPE = "runeType";

    public static Dictionary<string, Type> stringToRune = new Dictionary<string, Type>();

    public List<Rune> gameRunes;

    public Queue<Rune> runePump;

    private Dictionary<Type, List<Action<Rune, Action>>> runeEvents;

    public static RuneManager Singelton;

    public int currentCallbacks;

    public Queue<string> messages;


    void Awake()
    {

        Singelton = this;
        runeEvents = new Dictionary<Type, List<Action<Rune, Action>>>();
        gameRunes = new List<Rune>();
        currentCallbacks = 0;
        runePump = new Queue<Rune>();
        messages = new Queue<string>();
    }

    void Update()
    {
        if(messages.Count > 0)
        {
            ParseRuneAndExecute(messages.Dequeue());
        }
    }

    public void ParseRuneAndExecute(string runeAsString)
    {
        Debug.Log(runeAsString);
        JSONObject jsonObject = new JSONObject(runeAsString);
        string typeOfRune = jsonObject[RUNE_TYPE].str;
        if (typeOfRune != "optionRune")
        {


            var type = Type.GetType(typeOfRune);
            var runeObj = Activator.CreateInstance(type);
            for (int i = 0; i < jsonObject.keys.Count; i++)
            {
                var property = type.GetProperty(jsonObject.keys[i]);
                Debug.Log(jsonObject.keys[i]);
                if (jsonObject.keys[i] == "runeType")
                    continue;
                switch (jsonObject[jsonObject.keys[i]].type)
                {
                    case JSONObject.Type.STRING:
                        property.SetValue(runeObj, jsonObject[jsonObject.keys[i]].str, null);
                        break;
                    case JSONObject.Type.NUMBER:
                        property.SetValue(runeObj, (int)jsonObject[jsonObject.keys[i]].i, null);
                        break;
                    case JSONObject.Type.BOOL:
                        property.SetValue(runeObj, jsonObject[jsonObject.keys[i]].b, null);
                        break;
                    case JSONObject.Type.ARRAY:
                        break;
                    default:
                        Debug.Log("I have not done that type");
                        break;
                }
            }
            Singelton.ExecuteRune((Rune)runeObj);
        }
        else
        {
            OptionsManager.Singleton.StartToProcessOptions(jsonObject);
        }
    }

    public void PlaceMessageInQueue(string message)
    {
        messages.Enqueue(message);
    }


    public void ExecuteRune(Rune rune)
    {
        runePump.Enqueue(rune);
        if (currentCallbacks == 0)
        {
            PumpRuneQue();
        }
    }

    void PumpRuneQue()
    {
        var rune = runePump.Dequeue();
        CallbackNumberUp();
        rune.Execute(CallbackNumberDown);
        if (runeEvents.ContainsKey(rune.GetType()))
        {
            for (var i = 0; i < runeEvents[rune.GetType()].Count; i++)
            {
                CallbackNumberUp();
                runeEvents[rune.GetType()][i].Invoke(rune, CallbackNumberDown);
            }
        }
        RecordAllRune(rune);
    }



    public void AddListener(Type type, Action<Rune, Action> action)
    {
        if (!runeEvents.ContainsKey(type))
            runeEvents.Add(type, new List<Action<Rune, Action>>());

        runeEvents[type].Add(action);
    }

    public void RemoveListener(Type type, Action<Rune, Action> action)
    {
        if (!runeEvents.ContainsKey(type)) return;

        runeEvents[type].Remove(action);
    }

    public void CallbackNumberUp()
    {
        
        currentCallbacks++;
    }

    public void CallbackNumberDown()
    {
        currentCallbacks--;
        if (currentCallbacks != 0) return;
        if (runePump.Count > 0)
        {
            PumpRuneQue();
        }
    }

    public void RecordAllRune(Rune rune)
    {
        gameRunes.Add(rune);
    }

   

}

public abstract class Rune
{
    public string name;
    public abstract void OnGUI();
    public abstract void Execute(System.Action action);
}