var fs = require('fs'); 

//contents of rune
//"guid":"foo"
//"cardId":"cardID"
exports.execute = function (rune, state) {
      var contents =  fs.readFileSync("cards/" + rune["cardID"] + ".json");
      var obj = JSON.parse(contents);
      console.log(obj);
}

exports.canSee = function (rune, controller, state) {
    return false;
}