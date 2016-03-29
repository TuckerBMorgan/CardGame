
//{
//  "runeType":"ProvideTarget"
//  "controllerGuid":"xxxxxxxx-xxxx-xxyx-xxxx-xxxxxxxx0xxx",
//  "targetOrigin":"xxxxxxxx-xxxx-xxyx-xxxx-xxxxxxxx0xxx"
//}
exports.execute = function (rune, state) {

}

exports.canSee = function (rune, controller, state) {
    return rune.controllerGuid == controller.guid;
}