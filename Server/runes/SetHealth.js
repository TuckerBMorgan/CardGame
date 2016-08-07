var entities = require('../entityManager');


exports.execute = function(rune, state) {
        var card = entities.getEntity(rune.cardGuid, state);
        var amount = rune.amount;
        card.totalHealth += amount;
}

exports.canSee = function (params) {
    return true;
} 