"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFinPacket = exports.createResetPacket = exports.createDataPacket = exports.createAckPacket = exports.createSynPacket = exports.Packet = void 0;
const tslib_1 = require("tslib");
const PacketTyping_1 = require("./PacketTyping");
const PacketHeader_1 = require("./PacketHeader");
const __1 = require("..");
class Packet {
    header;
    payload;
    sent;
    size;
    constructor(options) {
        this.header = options.header;
        this.payload = options.payload;
        this.sent = 0;
        this.size = 20 + this.payload.length;
    }
    encodePacket() {
        let buffer = (0, __1.packetToBuffer)(this);
        return buffer;
    }
}
exports.Packet = Packet;
function createSynPacket(rcvConnectionId, seqNr, ackNr) {
    let h = new PacketHeader_1.PacketHeader({
        pType: PacketTyping_1.PacketType.ST_SYN,
        connectionId: rcvConnectionId,
        seqNr: seqNr,
        ackNr: ackNr || 0,
    });
    let packet = new Packet({ header: h, payload: new Uint8Array() });
    return packet;
}
exports.createSynPacket = createSynPacket;
function createAckPacket(seqNr, sndConnectionId, ackNr, rtt_var) {
    let h = new PacketHeader_1.PacketHeader({
        pType: PacketTyping_1.PacketType.ST_STATE,
        connectionId: sndConnectionId,
        seqNr: seqNr,
        ackNr: ackNr,
        wndSize: PacketTyping_1.DEFAULT_WINDOW_SIZE,
        timestampDiff: rtt_var
    });
    const packet = new Packet({ header: h, payload: new Uint8Array(0) });
    return packet;
}
exports.createAckPacket = createAckPacket;
function createDataPacket(seqNr, sndConnectionId, ackNr, bufferSize, payload, rtt_var) {
    let h = new PacketHeader_1.PacketHeader({
        pType: PacketTyping_1.PacketType.ST_DATA,
        version: PacketTyping_1.protocolVersion,
        extension: 0,
        connectionId: sndConnectionId,
        timestampDiff: rtt_var,
        wndSize: bufferSize,
        seqNr: seqNr,
        ackNr: ackNr,
    });
    const packet = new Packet({ header: h, payload: payload });
    return packet;
}
exports.createDataPacket = createDataPacket;
function createResetPacket(seqNr, sndConnectionId, ackNr) {
    let h = new PacketHeader_1.PacketHeader({
        pType: PacketTyping_1.PacketType.ST_RESET,
        version: PacketTyping_1.protocolVersion,
        extension: 0,
        connectionId: sndConnectionId,
        timestamp: Date.now(),
        timestampDiff: 0,
        wndSize: 0,
        seqNr: seqNr,
        ackNr: ackNr,
    });
    return new Packet({ header: h, payload: new Uint8Array() });
}
exports.createResetPacket = createResetPacket;
function createFinPacket(connectionId, ackNr) {
    let h = new PacketHeader_1.PacketHeader({
        pType: PacketTyping_1.PacketType.ST_FIN,
        version: PacketTyping_1.protocolVersion,
        extension: 0,
        connectionId: connectionId,
        timestamp: Date.now(),
        timestampDiff: 0,
        wndSize: PacketTyping_1.DEFAULT_WINDOW_SIZE,
        seqNr: Number("eof_pkt"),
        ackNr: ackNr
    });
    return new Packet({ header: h, payload: new Uint8Array() });
}
exports.createFinPacket = createFinPacket;
(0, tslib_1.__exportStar)(require("./PacketTyping"), exports);
