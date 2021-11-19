"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packetToBuffer = exports.bufferToPacket = exports.max = exports.sleep = exports.nextPowerOf2 = exports.bitLength = exports.randUint32 = exports.randUint16 = exports.getMonoTimeStamp = void 0;
const process_1 = require("process");
const constants_1 = require("./constants");
const PacketHeader_1 = require("../Packets/PacketHeader");
const Packet_1 = require("../Packets/Packet");
function getMonoTimeStamp() {
    let time = process_1.hrtime.bigint();
    return Number(time / BigInt(1000));
}
exports.getMonoTimeStamp = getMonoTimeStamp;
function randUint16() {
    return (Math.random() * 2 ** 16);
}
exports.randUint16 = randUint16;
function randUint32() {
    return (Math.random() * 2 ** 32);
}
exports.randUint32 = randUint32;
function bitLength(n) {
    const bitstring = n.toString(2);
    if (bitstring === "0") {
        return 0;
    }
    return bitstring.length;
}
exports.bitLength = bitLength;
function nextPowerOf2(n) {
    return n <= 0 ? 1 : Math.pow(2, bitLength(n - 1));
}
exports.nextPowerOf2 = nextPowerOf2;
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
exports.sleep = sleep;
function max(a, b) {
    return a > b ? a : b;
}
exports.max = max;
function bufferToPacket(buffer) {
    let ptandver = buffer[0].toString(16);
    let ver = ptandver[1];
    let version = parseInt(ver, 16);
    let packet = new Packet_1.Packet({
        header: new PacketHeader_1.PacketHeader({
            pType: buffer[0] >> 4,
            version: version,
            extension: buffer.readUInt8(1),
            connectionId: buffer.readUInt16BE(2),
            timestamp: buffer.readUInt32BE(4),
            timestampDiff: buffer.readUInt32BE(8),
            wndSize: buffer.readUInt32BE(12),
            seqNr: buffer.readUInt16BE(16),
            ackNr: buffer.readUInt16BE(18)
        }),
        payload: buffer.subarray(20)
    });
    return packet;
}
exports.bufferToPacket = bufferToPacket;
function packetToBuffer(packet) {
    let buffer = Buffer.alloc(20 + (packet.payload ? packet.payload.length : 0));
    let p = packet.header.pType.toString(16);
    let v = packet.header.version.toString(16);
    let pv = p + v;
    let typeAndVer = parseInt(pv, 16);
    buffer.writeUInt8(typeAndVer);
    buffer.writeUInt8(constants_1.EXTENSION, 1);
    buffer.writeUInt16BE(packet.header.connectionId, 2);
    buffer.writeUInt32BE(packet.header.timestamp, 4);
    buffer.writeUInt32BE(packet.header.timestampDiff, 8);
    buffer.writeUInt32BE(packet.header.wndSize, 12);
    buffer.writeUInt16BE(packet.header.seqNr, 16);
    buffer.writeUInt16BE(packet.header.seqNr, 18);
    if (packet.payload) {
        Buffer.concat([buffer, Buffer.from(packet.payload)]);
    }
    return buffer;
}
exports.packetToBuffer = packetToBuffer;
