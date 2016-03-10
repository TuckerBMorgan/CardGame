using UnityEngine;
using System;
using System.Collections;
using System.Collections.Generic;
using MoonSharp.Interpreter;

public class ConflictController : MonoBehaviour {

    private Script conflictScenario;
    private List<Controller> controllersInGame;

    void Awake()
    {

    }

    public void StartConflict(string conflictFile)
    {
        controllersInGame = new List<Controller>();   
        TextAsset ta = Resources.Load<TextAsset>("Conflicts/" + conflictFile);
        if(ta.text != null)
        {
            conflictScenario = new Script();
            conflictScenario.DoString(ta.text);
            Table table = (Table)conflictScenario.Globals["Players"];
            foreach(DynValue val in table.Values)
            {
                Guid useGuid = Guid.NewGuid();
                NewController nc = new NewController(val.String, useGuid);
                RuneManager.Singelton.ExecuteRune(nc);
                controllersInGame.Add(EntityManager.Singelton.GetEntity(useGuid) as Controller);
            }

            Guid cardGuid = controllersInGame[0].GetCardByIndex(0).GetGuid();
            Guid playerGuid = controllersInGame[0].GetGuid();

            DealCard dc = new DealCard(playerGuid, cardGuid, true);
            RuneManager.Singelton.ExecuteRune(dc);

            cardGuid = controllersInGame[0].GetCardByIndex(1).GetGuid();
            DealCard dc2 = new DealCard(playerGuid, cardGuid, true);
            RuneManager.Singelton.ExecuteRune(dc2);

        }
        else
        {
            Debug.Log("Could not find conflict file :" + conflictFile);
        }
    }

    void Update()
    {
        if(Input.GetKeyDown(KeyCode.A))
        {
            Guid cardGuid = controllersInGame[0].GetCardByIndex(2).GetGuid();
            Guid playerGuid = controllersInGame[0].GetGuid();

            DealCard dc = new DealCard(playerGuid, cardGuid, true);
            RuneManager.Singelton.ExecuteRune(dc);

        }
    }

    public void EndConflict()
    {

    }
}
