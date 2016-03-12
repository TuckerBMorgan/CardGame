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
        reader.Setup(stream);
        writer.Setup(stream);
    }

    public void SendMessage(string message)
    {
        writer.SendMessage(message);
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
    private Thread readThread;
    private byte[] buffer;

    int byteSize = 0;
    public void Setup(NetworkStream stream)
    {
        this.stream = stream;
        readThread = new Thread(Tick);
        buffer = new byte[500];
    }

    public void Tick()
    {
        while (Client.THREAD_GO)
        {
            byteSize = stream.Read(buffer, 0, 500);
            if(byteSize > 0)
            {
                string message = findMessage(buffer, byteSize);

            }
        }
    }

    public string findMessage(byte[] array, int length)
    {
        StringBuilder strBuild = new StringBuilder();

        for (int i = 0; i < length; i++)
        {
            if (array[i] != '\0' && array[i] != null)
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
        this.stream = stream;
        writeThread = new Thread(Tick);
    }

    public void Tick()
    {
        while (Client.THREAD_GO)
        {
            if (!string.IsNullOrEmpty(message))
            {
                byte[] array = Encoding.ASCII.GetBytes(message);
                stream.Write(array, 0, array.Length);
                if(messages.Count > 0)
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