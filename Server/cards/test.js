var cardFunctions = require('./cardFunctions')

exports.card = {
  "type": 0,
  "cardName": "test",
  "desc": "desc",
  "art": "test",
  "cost": 1,
  "baseHealth": 1,
  "baseAttack": 1,
  "tags":[]
}

exports.canPlay = cardFunctions.basicCanPlay
