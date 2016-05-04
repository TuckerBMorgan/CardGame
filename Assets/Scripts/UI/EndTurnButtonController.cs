using UnityEngine;
using UnityEngine.UI;
using System.Collections;


public class EndTurnButtonController : MonoBehaviour {

    public GameObject text;

	// Use this for initialization
	void Start () {
        GetComponent<Image>().enabled = false;
        text.SetActive(false);
        
        RuneManager.Singelton.AddListener(typeof(StartGame), StartGameRune);
        RuneManager.Singelton.AddListener(typeof(RotateTurn), RotateTurnRune);

	}
	
    public void OnEndTurnButtonClicked()
    {
        if (text.GetComponent<Text>().text == "End Turn")
        {
            if (OptionsManager.Singleton.options.ContainsKey(OptionsManager.END_TURN))
            {
                OptionsManager.Singleton.PickUpOption(OptionsManager.Singleton.options[OptionsManager.END_TURN][0]);
            }
        }
    }

    public void StartGameRune(Rune rune, System.Action action)
    {
        GetComponent<Image>().enabled = true;
        text.SetActive(true);   
        action();
    }

    public void RotateTurnRune(Rune rune, System.Action action)
    {
        RotateTurn rt = rune as RotateTurn;
        if(rt.previousGuid == PlayArea.Singelton.HomeGuid)
        {
            text.GetComponent<Text>().text = "Waiting for turn";
        }
        else
        {
            text.GetComponent<Text>().text = "End Turn";
        }
        action();
    }
}
