using UnityEngine;
using System;
using System.Collections;
using System.Collections.Generic;
using MoonSharp.Interpreter;

public class ConflictController : MonoBehaviour {

    private Script conflictScenario;
    private List<Controller> controllersInGame;
    private PlayArea playArea;

    void Awake()
    {

    }

    public void StartConflict(string conflictFile)
    {
        controllersInGame = new List<Controller>();
        playArea = GetComponent<PlayArea>();
        string str = "{\"type\":\"newConnection\"}";
        GetComponent<Client>().SendNewMessage(str);
        /*
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
            
            playArea.Setup(controllersInGame[0].GetGuid(), controllersInGame[1].GetGuid());
            Guid saveOff;
            Guid cardGuid = controllersInGame[0].GetCardByIndex(0).GetGuid();
            saveOff = cardGuid;
            Debug.Log(cardGuid);
            Guid playerGuid = controllersInGame[0].GetGuid();

            DealCard dc = new DealCard(playerGuid, cardGuid, true);
            RuneManager.Singelton.ExecuteRune(dc);

            cardGuid = controllersInGame[0].GetCardByIndex(1).GetGuid();
            DealCard dc2 = new DealCard(playerGuid, cardGuid, true);
            RuneManager.Singelton.ExecuteRune(dc2);


            cardGuid = controllersInGame[1].GetCardByIndex(0).GetGuid();
            DealCard dc3 = new DealCard(controllersInGame[1].GetGuid(), cardGuid, true);
            RuneManager.Singelton.ExecuteRune(dc3);

            PlayCard pc = new PlayCard(controllersInGame[0].GetGuid(), saveOff, OriginOfCard.HAND, TypeOfRemoveFromHand.INTO_PLAY);
            RuneManager.Singelton.ExecuteRune(pc);

            PlayCard pc2 = new PlayCard(controllersInGame[1].GetGuid(), cardGuid, OriginOfCard.HAND, TypeOfRemoveFromHand.INTO_PLAY);
            RuneManager.Singelton.ExecuteRune(pc2);
        }
        else
        {
            Debug.Log("Could not find conflict file :" + conflictFile);
        }
        */
    }

    void Update()
    {
        if(Input.GetKeyDown(KeyCode.A))
        {

        }
    }

    public void EndConflict()
    {

    }
}
