var net = require('net');

var client = new net.Socket();

client.connect(4884, "127.0.0.1", function(){

    var newConn = {
        "type":"newConnection",
        "name":"fakeClient"
    }

    client.write(JSON.stringify(newConn));

    var ready = {
        "type":"ready"
    }
    client.write(JSON.stringify(ready));
});

var mul = false;

client.on('data', function(data){
    
    data = data.toString().replace("\n", " ");
    var messages = data.toString().split("@@");

    messages.forEach(function(element){
            try
            {
                
                var obj = JSON.parse(element);
                console.log(element + "\n");

                if(obj["runeType"] == "optionRune")
                {
                    if(mul == false)
                    {
                        mul = true;
                        var muli = {
                            "type":"mulligan",
                            "index":[]
                        }
                        client.write(JSON.stringify(muli));   
                    }

                    if(obj["options"].length > 1)
                    {

                        var Op = {
                             "type":"option",
                             "index":0,
                             "timeStamp":0
                         }
                         client.write(JSON.stringify(op));
                    }
                }
            }
            catch(e)
            {
                console.log("Errors" + element);
            }
    })
})

client.on('close', function(){

})