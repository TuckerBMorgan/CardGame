using System;
using UnityEngine;
using System.Collections.Generic;
using System.Linq;
using UnityEditor;
using SimpleJson;

public class RuneManager : MonoBehaviour
{

    public List<Rune> gameRunes;

    public Queue<Rune> runePump;

    private Dictionary<Type, List<Action<Rune, Action>>> runeEvents;

    public static RuneManager Singelton;

    public int currentCallbacks;


    void Awake()
    {
        Singelton = this;
        runeEvents = new Dictionary<Type, List<Action<Rune, Action>>>();
        gameRunes = new List<Rune>();
        currentCallbacks = 0;
        runePump = new Queue<Rune>();
    }

    public void ParseRuneAndExecute(string runeAsString)
    {
   
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