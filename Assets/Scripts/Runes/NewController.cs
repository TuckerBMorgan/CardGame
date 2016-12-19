using System;
using UnityEngine;
using System.Collections;

public class NewController : Rune
{

    public static string PLAYER_CONTROLLER = "PlayerController";
    public static string AI_CONTROLLER = "AiController";
    public static string CONTROLLERS_FILE_PATH = "Controllers/";

    public string uid { get; set; }
    public string controller_type { get; set; }
    public string hero { get; set; }
    public string controllerName { get; set; }
    public bool isMe { get; set; }

    public NewController()
    {
        
    }

    public override void Execute(System.Action action)
    {
    /*
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
        go.GetComponent<Controller>().SetGuid(controllerGuid);
        EntityManager.Singelton.AddEntity(controllerGuid, go.GetComponent<Controller>());
        */
        action();
    }

    public override void OnGUI()
    {   

    }

}
