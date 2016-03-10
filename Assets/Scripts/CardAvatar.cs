using UnityEngine;
using System.Collections;

public class CardAvatar : MonoBehaviour {

    private Card card;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    public void SetCard(Card card)
    {
        if (this.card != null)
        {
            this.card = card;
        }
    }
}
