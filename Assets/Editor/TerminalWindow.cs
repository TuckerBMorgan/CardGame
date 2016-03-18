using UnityEngine;
using System.Collections;
using UnityEditor;
using System.Diagnostics;

public class TerminalWindow :  EditorWindow {
    
    [MenuItem("Window/Terminal")]
    static void Init()
    {
        TerminalWindow tw = (TerminalWindow)EditorWindow.GetWindow(typeof(TerminalWindow));
        tw.Show();
        string command = "";

        // /c tells cmd that we want it to execute the command that follows and then exit.
        System.Diagnostics.ProcessStartInfo procStartInfo = new System.Diagnostics.ProcessStartInfo("cmd.exe");

        procStartInfo.RedirectStandardOutput = true;
        procStartInfo.UseShellExecute = false;

        // Do not create the black window.
        procStartInfo.CreateNoWindow = true;
        procStartInfo.WindowStyle = ProcessWindowStyle.Hidden;

        System.Diagnostics.Process process = new System.Diagnostics.Process();
        process.StartInfo = procStartInfo;
        process.Start();
        

    }

    void OnGUI()
    {
        
    }
}
