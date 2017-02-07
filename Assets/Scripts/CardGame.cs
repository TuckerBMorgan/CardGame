using UnityEngine;
using System;
using System.Collections;

public class CardGame : MonoBehaviour
{

    public ConflictController currentConflict;

    // Use this for initialization
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {

    }

    public void StartConflict()
    {
        currentConflict.StartConflict("testScenario");
        GetComponent<Client>().Setup();
    }
}