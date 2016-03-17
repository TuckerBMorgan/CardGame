using UnityEngine;
using System.Collections;

public class StartButton : MonoBehaviour {

    public void OnDeathClick()
    {
        Destroy(gameObject);
    }
}
