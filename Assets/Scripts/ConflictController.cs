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
        playArea = GetComponent<PlayArea>();
        playArea.Setup();
        RuneManager.Singelton.AddListener(typeof(Mulligan), OnMulliganRune);
    }

    public void OnMulliganRune(Rune rune, System.Action action)
    {   
        MulliganButton.singelton.gameObject.SetActive(true);
        action();
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
