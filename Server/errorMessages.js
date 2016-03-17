var server = require('./server');

exports.cantPlayCardMessageCode = 101;
exports.cantAttackMessageCode = 102;
exports.cantTargetMessageCode = 103;

exports.cantPlayCard = function (socket) {
    var cantPlayCardMessage = {
        "errorMessage":exports.cantPlayCardMessageCode
    }
    server.sendMessage(JSON.stringify(cantPlayCardMessage), socket);
}

exports.cantAttack = function (socket) {
    var cantAttackMessage = {
        "errorMessage":exports.cantAttackMessageCode
    }
    server.sendMessage(JSON.stringify(cantAttackMessage), socket);
}

exports.cantTarget = function (socket) {
    var cantTargetMessage = {
        "errorMessage":exports.cantTargetMessageCode
    }
    server.sendMessage(JSON.stringify(cantTargetMessage), socket);
}