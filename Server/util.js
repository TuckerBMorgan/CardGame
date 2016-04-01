var fs = require('fs'); 
var entity = require('./entityManager');

exports.createGuid = function () {
    var start = 'xxxxxxxx-xxxx-xxyx-xxxx-xxxxxxxx0xxx';
    var goodCharacters = ['0','1','2','3','4','5','6','7','8','9',
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    var shortList = ['A', 'B', 'C', 'D', 'E', 'F', 'H'];
    var newG = [];
    
    for(var i = 0;i<start.length;i++)
    {
        if(start[i] == 'x')
        {
            var index = Math.floor(Math.random() * ( goodCharacters.length));
            newG.push(goodCharacters[index]);
        }
        else if(start[i] == 'y')
        {
            var secIndex = Math.floor(Math.random() * ( shortList.length));
            newG.push(shortList[secIndex]);
        }
        else if(start[i] == '-')
        {
            newG.push('-');
        }
        else 
        {
            newG.push(start[i]);
        }
    }
    return newG.join('');
}

exports.loadCard = function(fileName) {
      var contents =  fs.readFileSync("cards/" + fileName + ".json");
      var obj = JSON.parse(contents);
      obj.entityType = entity.MINION;
      return obj;
}

exports.dealCard = function (deck) {
        var index = Math.floor(Math.random() * deck.length);
        return deck[index].cardGuid;
}