"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BUFFER_SIZE = exports.CLOSE_GRACE = exports.DEFAULT_WINDOW_SIZE = exports.MIN_PACKET_SIZE = exports.PacketType = exports.protocolVersion = exports.minimalHeaderSize = void 0;
exports.minimalHeaderSize = 20;
exports.protocolVersion = 1;
var PacketType;
(function (PacketType) {
    PacketType[PacketType["ST_DATA"] = 0] = "ST_DATA";
    PacketType[PacketType["ST_FIN"] = 1] = "ST_FIN";
    PacketType[PacketType["ST_STATE"] = 2] = "ST_STATE";
    PacketType[PacketType["ST_RESET"] = 3] = "ST_RESET";
    PacketType[PacketType["ST_SYN"] = 4] = "ST_SYN";
})(PacketType = exports.PacketType || (exports.PacketType = {}));
exports.MIN_PACKET_SIZE = 20;
exports.DEFAULT_WINDOW_SIZE = 1 << 18;
exports.CLOSE_GRACE = 5000;
exports.BUFFER_SIZE = 512;
