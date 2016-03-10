using System;
using UnityEngine;
using System.Collections;

public class NewController : Rune
{

    public static string PLAYER_CONTROLLER = "PlayerController";
    public static string AI_CONTROLLER = "AiController";
    public static string CONTROLLERS_FILE_PATH = "Controllers/";

    public Guid guid;
    public string type;

    public NewController(string type, Guid guid)
    {
        this.type = type;
        this.guid = guid;
    }

    public override void Execute(System.Action action)
    {
        GameObject go = null;
        if (type == PLAYER_CONTROLLER)
        {
            go = Resources.Load<GameObject>(CONTROLLERS_FILE_PATH + PLAYER_CONTROLLER);
        }
        else if (type == AI_CONTROLLER)
        {
            go = Resources.Load<GameObject>(CONTROLLERS_FILE_PATH + AI_CONTROLLER);
        }
        go = GameObject.Instantiate(go);
        go.GetComponent<Controller>().Setup();
        go.GetComponent<Controller>().SetGuid(guid);
        EntityManager.Singelton.AddEntity(guid, go.GetComponent<Controller>());

        for (int i = 0; i < 30; i++)
        {
            Guid useGuid = Guid.NewGuid();
            var rune = new CreateCard(useGuid, "test");
            RuneManager.Singelton.ExecuteRune(rune);
            var grantRune = new GrantCard(guid, useGuid);
            RuneManager.Singelton.ExecuteRune(grantRune);
        }


        action();
    }

    public override void OnGUI()
    {   

    }

}
