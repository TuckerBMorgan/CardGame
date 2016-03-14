using System;
using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public interface entity
{

}

public interface damageable
{
    void ModifyHealth(int amount);
    void SetHealth(int health);
    int GetHealth();
}

public class EntityManager : MonoBehaviour {

    private Dictionary<string, entity> entities = new Dictionary<string,entity>();

    public static EntityManager Singelton;

	void Awake()
    {
        Singelton = this;
    }
    

    public entity GetEntity(string guid)
    {
        if(entities.ContainsKey(guid))
        {
            
            return entities[guid];
        }
        return null;
    }

    public void AddEntity(string guid, entity entityNew)
    {
        if(entities.ContainsKey(guid))
        {
            Debug.Log("Double key error on insertion of " + entityNew + " with key " + guid + " The entity Manager might already have the this entity");
            return;
        }
        if(entities.ContainsValue(entityNew))
        {
            Debug.Log("Double value error on insertion of " + entityNew + " with key " + guid + " The entity manager might have this eneity under a different key");
            return;
        }

        entities.Add(guid, entityNew);
    }
	
}
