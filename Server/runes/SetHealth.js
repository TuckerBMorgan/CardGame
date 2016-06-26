var entities = require('../entityManager');


exports.executeRune = function(rune, state) {
        var card = entities.getEntity(rune.cardGuid);
        var amount = rune.amount;
        card.totalHealth += amount;
}

exports.canSee = function (params) {
    return true;
} 