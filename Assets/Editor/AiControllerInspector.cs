
using UnityEngine;
using UnityEditor;
using System.Collections;

[CustomEditor(typeof(AiController))]

public class AiControllerInspector : Editor
{

    public override void OnInspectorGUI()
    {
        base.OnInspectorGUI();
        ((AiController)target).DrawInspector();
    }
}
