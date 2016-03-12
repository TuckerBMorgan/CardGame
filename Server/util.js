exports.createGuid = function () {
    var start = 'xxxxxxxx-xxxx-xxyx-xxxx-xxxxxxxx0xxx';
    var goodCharacters = ['0','1','2','3','4','5','6','7','8','9',
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    var shortList = ['A', "B", "C", "D", "E", "F", "H"];
    
    for(var i = 0;i<start.length;i++)
    {
        if(start[i] == 'x')
        {
            var index = Math.floor(Math.random() * (0 - goodCharacters.length));
            start[i] = goodCharacters[index];
        }
        else if(start[i] == 'y')
        {
            var secIndex = Math.floor(Math.random() * (0 - shortList.length));
            start[i] = shortList[secIndex];
        }
    }
    
    return start;
}