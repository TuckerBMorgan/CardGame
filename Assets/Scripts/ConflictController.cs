using UnityEngine;
using System;
using System.Collections;
using System.Collections.Generic;
using MoonSharp.Interpreter;

public class ConflictController : MonoBehaviour {

    private Script conflictScenario;
   // private List<Controller> controllersInGame;
    private PlayArea playArea;

    void Awake()
    {

    }

    public void StartConflict(string conflictFile)
    {
   //     controllersInGame = new List<Controller>();
        playArea = GetComponent<PlayArea>();
        playArea.Setup();
        string str = "{\"type\":\"newConnection\"}";
        GetComponent<Client>().SendNewMessage(str);
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
