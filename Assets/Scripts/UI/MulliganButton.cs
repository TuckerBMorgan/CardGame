using UnityEngine;
using System.Collections;

public class MulliganButton : MonoBehaviour {

	// Use this for initialization
	void Start () {
        RuneManager.Singelton.AddListener(typeof(StartGame), OnStartGameRune);
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    public void MulliganCards()
    {
        PlayArea.Singelton.OnMulliganButtonClick();
    }

    public void OnStartGameRune(Rune rune, System.Action action)
    {
        Destroy(gameObject);
        action();
    }
}
