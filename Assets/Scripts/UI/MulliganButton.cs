using UnityEngine;
using System.Collections;

public class MulliganButton : MonoBehaviour {
	public static MulliganButton singelton;

	void Awake()
	{
		singelton = this;
	}


	// Use this for initialization
	void Start () {
        RuneManager.Singelton.AddListener(typeof(StartGame), OnStartGameRune);
		gameObject.SetActive (false);
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    public void MulliganCards()
    {
		if (PlayArea.Singelton != null) 
		{
			PlayArea.Singelton.OnMulliganButtonClick ();
		}
    }

    public void OnStartGameRune(Rune rune, System.Action action)
    {
        Destroy(gameObject);
        action();
    }
}
