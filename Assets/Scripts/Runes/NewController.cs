using System;
using UnityEngine;
using System.Collections;

public class NewController : Rune
{

    public static string PLAYER_CONTROLLER = "PlayerController";
    public static string AI_CONTROLLER = "AiController";
    public static string CONTROLLERS_FILE_PATH = "Controllers/";

    public string uid { get; set; }
    public string hero { get; set; }
    public int client_id { get; set; }
    public string deck { get; set; }
    public string controllerName { get; set; }
    public bool is_me { get; set; }

    public NewController()
    {
        
    }

    public override void Execute(System.Action action)
    {
    
        GameObject go = null;
        if (is_me)
        {
            go = Resources.Load<GameObject>(CONTROLLERS_FILE_PATH + PLAYER_CONTROLLER);
        }
        else
        {
            go = Resources.Load<GameObject>(CONTROLLERS_FILE_PATH + AI_CONTROLLER);
        }
        go = GameObject.Instantiate(go);
        go.GetComponent<Controller>().Setup();
        go.GetComponent<Controller>().SetGuid(uid);
        EntityManager.Singelton.AddEntity(uid, go.GetComponent<Controller>());
        action();
    }

    public override void OnGUI()
    {   

    }

}
