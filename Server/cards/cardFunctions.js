exports.basicCanPlay = function (card, controller, state) {  
    if(card.cost <= state.controllers[controller].mana)
    {
        return true;
    }
    return false;
}

exports.basicCanAttack = function(card, target, controller, state){
    if(card.baseAttack > 0)
    {
        return true;
    }
}