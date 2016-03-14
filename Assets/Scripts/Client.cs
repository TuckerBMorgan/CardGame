using UnityEngine;
using System.Collections;
using System.Net.Sockets;
using System.Threading;
using System.Text;

public class Client : MonoBehaviour {
    public static bool THREAD_GO = true;
    private Reader reader;
    private Writer writer;
    private TcpClient client;

    
    public void Setup()
    {
        client = new TcpClient("127.0.0.1", 4884);
        NetworkStream stream = client.GetStream();
        reader = new Reader();
        writer = new Writer();
        reader.Setup(stream, this);
        writer.Setup(stream);
    }

    public void SendNewMessage(string message)
    {
        writer.SendMessage(message);
    }

    public void ReportMessageToMainProgram(string message)
    {
        RuneManager.Singelton.PlaceMessageInQueue(message);
    }


    public void OnApplicationQuit()
    {
        THREAD_GO = false;
        client.Close();
    }
}

public class Reader
{
    private NetworkStream stream;
    private Client client;
    private Thread readThread;
    private byte[] buffer;

    int byteSize = 0;
    public void Setup(NetworkStream stream, Client client)
    {
        this.client = client;
        this.stream = stream;
        readThread = new Thread(Tick);
        readThread.Start();
        buffer = new byte[500];
    }

    public void Tick()
    {
        while (Client.THREAD_GO)
        {
            byteSize = stream.Read(buffer, 0, 500);
            if(byteSize > 0)
            {
                Debug.Log(buffer);
                string message = findMessage(buffer, byteSize);
                client.ReportMessageToMainProgram(message);
                
            }
        }
    }

    public string findMessage(byte[] array, int length)
    {
        StringBuilder strBuild = new StringBuilder();

        for (int i = 0; i < length; i++)
        {
            if (array[i] != '\0')
            {
                strBuild.Append((char)array[i]);
            }
        }
        return strBuild.ToString();
    }

}

public class Writer
{
    private NetworkStream stream;
    private Thread writeThread;
    private Queue messages;
    private byte[] buffer;

    private string message;

    public void Setup(NetworkStream stream)
    {
        messages = new Queue();
        this.stream = stream;
        writeThread = new Thread(Tick);
        writeThread.Start();
    }

    public void Tick()
    {
        while (Client.THREAD_GO)
        { 
            if (!string.IsNullOrEmpty(message))
            {
                byte[] array = Encoding.ASCII.GetBytes(message);
                stream.Write(array, 0, array.Length);
                message = null;
                if (messages.Count > 0)
                {
                    message = (string)messages.Dequeue();
                }
            }
        }
    }

    public void SendMessage(string message)
    {
        if(messages.Count > 0)
        {
            messages.Enqueue(message);
        }
        else
        {
            this.message = message;
        }
    }
}