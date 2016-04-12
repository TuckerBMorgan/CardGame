using UnityEngine;
using System.Collections;
using UnityEditor;
using System;
using System.IO;
using System.Diagnostics;

public class TerminalWindow :  EditorWindow {


    static Process p;

    [MenuItem("Window/Terminal")]
    static void Init()
    {
        TerminalWindow tw = (TerminalWindow)EditorWindow.GetWindow(typeof(TerminalWindow));
        tw.Show();
      
    }

    static void p_OutputDataReceived(object sender, DataReceivedEventArgs e)
    {
        UnityEngine.Debug.Log("Data");
    }
    StreamWriter sw;
    void OnGUI()
    {

    }
}
