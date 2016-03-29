exports.basicCanPlay = function (card, controller, state) {  
    if(card.cost <= state.controllers[controller].mana)
    {
        return true;
    }
    return false;
}