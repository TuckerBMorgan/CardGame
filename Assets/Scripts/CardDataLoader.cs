using UnityEngine;
using UnityEngine.Serialization;
using System.IO;
using System.Xml;
using System.Text;

using System.Collections;

public class CardDataLoader : MonoBehaviour {

    public const string CARDS_XML = "Resouces/Cards/Cards.xml";

    public void LoadData()
    {
        string str = File.ReadAllText(CARDS_XML);

        XmlReader read = XmlReader.Create(str);

        

    }

}
