using UnityEngine;
using System.Collections;

public class CardAvatarUIControl : MonoBehaviour {

    public CardAvatar cardAvatar;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    void OnMouseDown()
    {
        cardAvatar.OnMouseDownOnMesh();
    }

    void OnMouseUp()
    {
        cardAvatar.OnMouseUpOnMesh();
    }
}
