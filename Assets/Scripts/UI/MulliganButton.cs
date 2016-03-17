using UnityEngine;
using System.Collections;

public class MulliganButton : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    void OnButtonPress()
    {
        PlayArea.Singelton.OnMulliganButtonClick();
    }
}
