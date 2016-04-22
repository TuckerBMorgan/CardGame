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
    /*
     * returns the nearest point along the line segment defined by (a,b) to c
     * The answear I gave you used trig, but after thinking about it I came up a different solution
     */
    public Vector2 NearestPoint(Vector2 a, Vector2 b, Vector2 c)
    {
        //First we have to solve for the triangle formed by a,b,c
        float d1 = Vector2.Distance(a, b);
        float d2 = Vector2.Distance(a, c);
        float d3 = Vector2.Distance(b, c);

        float d1s = Mathf.Pow(d1, 2);
        float d2s = Mathf.Pow(d2, 2);
        float d3s = Mathf.Pow(d3, 2);

        float A = Mathf.Acos((d2s + d1s - d3s) / (2 * (d3 * d1)));

        float B = Mathf.Acos((d1s + d3s - d2s) / (2 * (d1 * d3)));

        if (d2 >= d3)
        {
            //We use B
            float bComp = 180 - B;
            if (bComp == 90)
            {
                //b lays right below c on the line
                return b;
            }
            float finalAngle = 180 - bComp - 90;
            float length = Mathf.Cos(finalAngle) * d3;
            Vector2 dir = (a - b).normalized * length;
            return b + dir;
        }
        else
        {
            //We use A
            float aComp = 180 - A;
            if (aComp == 90)
            {
                //a lays right below c on the line
                return a;
            }

            float finalAngle = 180 - aComp - 90;
            float length = Mathf.Cos(finalAngle) * d2;
            Vector2 dir = (b - a).normalized * length;
            return a + dir;

        }
    }

    /*
     * After the interview I looked up the answear online and found what seems to be the better solution
     * which I cna tell is a lot faster
     * You first find the slope of the line perpendicular to the one defined by a,b 
     * Then you find the line perpendicular to the line(a,b) that goes through c
     * solve for where those two lines intersect and that is you point
     */
}
