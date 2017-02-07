using UnityEngine;
using System;
using System.Collections;
using UnityEngine.UI;
public class ManaUIController : MonoBehaviour {

    public Text text;
	// Use this for initialization
	void Start () {
        RuneManager.Singelton.AddListener(typeof(SetMana), OnSetMana);
        RuneManager.Singelton.AddListener(typeof(SetBaseMana), OnSetBaseMana);
        text = GetComponent<Text>();
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    public void OnSetBaseMana(Rune rune, Action action)
    {
        SetBaseMana sbm = rune as SetBaseMana;
        text.text = sbm.base_mana.ToString();
        action();
    }

    public void OnSetMana(Rune rune, Action action)
    {
        SetMana sm = rune as SetMana;
        text.text += ":" + sm.mana;
        action();
    }
}
