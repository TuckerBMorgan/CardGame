using UnityEngine;
using UnityEditor;
using System.Collections;

[CustomEditor(typeof(PlayerController))]

public class PlayerControllerInspector : Editor
{

    public override void OnInspectorGUI()
    {
        base.OnInspectorGUI();
        ((PlayerController)target).DrawInspector();
    }
}
