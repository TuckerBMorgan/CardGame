var fs = require('fs'); 
var entity = require('./entityManager');
var defaultCard = require('./cards/cardPrototype')
var count = 0;

exports.createGuid = function () {
    
    //an experiment of sorts, it cuts the size of messages down a lot
    count++;
    return count.toString();
}

exports.loadCard = function(fileName) {
      var contents =  require("./cards/" + fileName);

      var def = JSON.parse(JSON.stringify(defaultCard.cardPrototype));
      var card = Object.assign(def, contents.card);
      card["enchantments"] = [];
      return card;
}

exports.dealCard = function (deck) {
		//grab a random index
        var index = Math.floor(Math.random() * deck.length);
        //return the card GUID at that index
        return deck[index].cardGuid;
} 