var fs = require('fs'); 
var entity = require('./entityManager');
var defaultCard = require('./cards/default')
var count = 0;

exports.createGuid = function () {
    
    //an experiment of sorts, it cuts the size of messages down a lot
    count++;
    return count.toString();
}

exports.loadCard = function(fileName) {
      var contents =  require("./cards/" + fileName);
      var obj = JSON.parse(JSON.stringify(contents.card));
      var def = JSON.parse(JSON.stringify(defaultCard["cardPrototype"]));
      
      var obKeys = Object.keys(obj);
      obKeys.forEach(function (element) {
          def[element] = obj[element];
      })
      
      return def;
}

exports.dealCard = function (deck) {
        var index = Math.floor(Math.random() * deck.length);
        return deck[index].cardGuid;
}