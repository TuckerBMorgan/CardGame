using UnityEngine;
using System.Collections;
using System.Net.Sockets;
using System.Threading;
using System.Text;
using System.Collections.Generic;

public class Client : MonoBehaviour {
    public static bool THREAD_GO = true;
    private Reader reader;
    private Writer writer;
    private TcpClient client;
    public static Client Singelton;

    public const int BUFFER_SIZE = 10000;
    
    public void Setup()
    {
        Singelton = this;
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
        buffer = new byte[Client.BUFFER_SIZE];
    }

	List<char> messageBuffer = new List<char>();
    public void Tick()
    {
        while (Client.THREAD_GO)
        {
            byteSize = stream.Read(buffer, 0, Client.BUFFER_SIZE);
            if (byteSize > 0)
            {
                AddToBuffer(buffer, buffer.Length);
            }
            buffer = new byte[Client.BUFFER_SIZE];
        }
    }

    public void AddToBuffer(byte[] array, int length)
    {
        for (int i = 0; i < length; i++)
        {
            if ((char)array[i] != '\0')
            {
                messageBuffer.Add((char)array[i]);
            }
        }
        LookForMessage();
    }

	public void LookForMessage()
	{
		bool foundMessage = false;
		int newLineCount = 0;
		for (int i = 0; i < messageBuffer.Count; i++) 
		{
			if (messageBuffer [i] == '@') 
			{
				newLineCount++;
			}
			if (newLineCount == 2) 
			{
				foundMessage = true;
				StringBuilder sb = new StringBuilder ();

				for (int s = 0; s < i ; s++) 
				{
					sb.Append (messageBuffer [s]);
				}
				sb.Replace ("@", "");
				string newMessage = sb.ToString ();

				if (!string.IsNullOrEmpty (newMessage) && newMessage.Length > 3) 
				{
					client.ReportMessageToMainProgram (newMessage);
				}
						
				messageBuffer.RemoveRange (0, i);
				break;
			}
		}
		if (foundMessage == true && messageBuffer.Count > 0) 
		{
			LookForMessage ();
		}
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