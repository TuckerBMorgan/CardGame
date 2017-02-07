using UnityEngine;
using System.Collections;

public class MulliganButton : MonoBehaviour {
	public static MulliganButton singelton;
    public bool stop = false;

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

    public void OnMulliganRune()
    {

    }

    public void MulliganCards()
    {
		if (PlayArea.Singelton != null) 
		{
            if (!stop)
            {
                PlayArea.Singelton.OnMulliganButtonClick();
                stop = true;
            }
		}
    }

    public void OnStartGameRune(Rune rune, System.Action action)
    {
        Destroy(gameObject);
        action();
    }
}
