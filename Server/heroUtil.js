exports.BASE_HERO_HEALTH = 30;

exports.loadHero = function (hero) {
    var obj = JSON.parse(JSON.stringify(require('./heros/' + hero).hero));
    return obj;
}