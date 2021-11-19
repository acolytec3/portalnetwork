"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketHeader = void 0;
const constants_1 = require("../Utils/constants");
const PacketTyping_1 = require("./PacketTyping");
class PacketHeader {
    pType;
    version;
    extension;
    connectionId;
    timestamp;
    timestampDiff;
    wndSize;
    seqNr;
    ackNr;
    constructor(options) {
        this.pType = options.pType;
        this.version = options.version || constants_1.VERSION;
        this.extension = 0;
        this.connectionId = options.connectionId;
        this.timestamp = performance.now();
        this.timestampDiff = options.timestampDiff || 0;
        this.wndSize = PacketTyping_1.DEFAULT_WINDOW_SIZE;
        this.seqNr = options.seqNr;
        this.ackNr = options.ackNr;
    }
    encodeTypeVer() {
        let typeVer = 0;
        let typeOrd = this.pType;
        typeVer = (typeVer & 0xf0) | (this.version & 0xf);
        typeVer = (typeVer & 0xf) | (typeOrd << 4);
        return typeVer;
    }
    encodeHeaderStream() {
        let buffer = Buffer.alloc(20);
        buffer[0] = 1;
        buffer[1] = 0;
        buffer.writeUInt16BE(this.connectionId, 2);
        buffer.writeUInt32BE(this.timestamp, 4);
        buffer.writeUInt32BE(this.timestampDiff, 8);
        buffer.writeUInt32BE(this.wndSize, 12);
        buffer.writeUInt16BE(this.seqNr, 16);
        buffer.writeUInt16BE(this.seqNr, 18);
        return buffer;
    }
}
exports.PacketHeader = PacketHeader;
