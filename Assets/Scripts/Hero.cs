using UnityEngine;
using System.Collections;

public class Hero {

    private string guid;
    public string Guid { get { return guid; } set { guid = value; } }
    
    private string id;
    public string Id { get { return guid; } set { Guid = value; } }

    private int baseCost;
    public int BaseCost { get { return baseCost; } set { baseCost = value; } }
    
    
    public void Setup()
    {

    }

}
