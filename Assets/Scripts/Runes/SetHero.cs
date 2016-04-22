using UnityEngine;
using System.Collections;

public class SetHero : Rune {

    public static string HeroResourceLocation = "Heroes/";

    public string controllerGuid { get; set; }
    public string id { get; set; }
    public int cost { get; set; }



    public override void Execute(System.Action action)
    {
        GameObject go = Resources.Load(HeroResourceLocation + id) as GameObject;

        go = GameObject.Instantiate(go);
        go.transform.position = Vector3.zero;
        
        
        action();
    }

    public override void OnGUI()
    {
        
    }
}
