using UnityEngine;
using System;
using System.Collections;
using MoonSharp.Interpreter;

public class ConflictController : MonoBehaviour {

    private Script conflictScenario;

    void Awake()
    {

    }

    public void StartConflict(string conflictFile)
    {
        
        TextAsset ta = Resources.Load<TextAsset>("Conflicts/" + conflictFile);
        if(ta.text != null)
        {
            conflictScenario = new Script();
            conflictScenario.DoString(ta.text);
            Table table = (Table)conflictScenario.Globals["Players"];
            foreach(DynValue val in table.Values)
            {
                NewController nc = new NewController(val.String, Guid.NewGuid());
                RuneManager.Singelton.ExecuteRune(nc);
            }
        }
        else
        {
            Debug.Log("Could not find conflict file :" + conflictFile);
        }
    }

    public void EndConflict()
    {

    }
}
