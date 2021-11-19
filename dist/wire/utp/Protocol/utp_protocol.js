"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtpProtocol = void 0;
const _UTPSocket_1 = require("../Socket/_UTPSocket");
const __1 = require("..");
class UtpProtocol {
    sockets;
    client;
    payloadChunks;
    constructor(client) {
        this.client = client;
        this.sockets = {};
        this.payloadChunks = [];
    }
    // TODO: Chop up CONTENT into chunks.
    // TODO: Reassemble chunks
    async processContent(payload) {
        let packetSize = 1200;
        for (let i = 0; i < payload.length; i += packetSize) {
            this.payloadChunks.push(payload.subarray(i, i + packetSize));
        }
    }
    nextChunk() {
        return this.payloadChunks.pop();
    }
    async initiateSyn(dstId) {
        const socket = new _UTPSocket_1._UTPSocket(this.client);
        this.sockets[dstId] = socket;
        await this.sockets[dstId].sendSyn(dstId);
        return this.sockets[dstId].sndConnectionId;
    }
    async handleSynAck(payload, dstId, content) {
        const ack = (0, __1.bufferToPacket)(payload);
        await this.processContent(content);
        this.sockets[dstId].state = __1.ConnectionState.Connected;
        this.sockets[dstId].ackNr = ack.header.seqNr;
        this.payloadChunks.length > 0
            ? await this.sendData(this.nextChunk(), dstId)
            : await this.sockets[dstId].sendFin(dstId);
    }
    async sendData(chunk, dstId) {
        await this.sockets[dstId].sendData(this.sockets[dstId].seqNr, this.sockets[dstId].ackNr, this.sockets[dstId].sndConnectionId, chunk, dstId);
    }
    async handleIncomingSyn(packetAsBuffer, dstId) {
        let socket = new _UTPSocket_1._UTPSocket(this.client);
        this.sockets[dstId] = socket;
        const packet = (0, __1.bufferToPacket)(packetAsBuffer);
        this.sockets[dstId].updateRTT(packet.header.timestampDiff);
        this.sockets[dstId].rcvConnectionId = packet.header.connectionId + 1;
        this.sockets[dstId].sndConnectionId = packet.header.connectionId;
        this.sockets[dstId].seqNr = (0, __1.randUint16)();
        this.sockets[dstId].ackNr = packet.header.seqNr;
        this.sockets[dstId].state = __1.ConnectionState.SynRecv;
        await this.sockets[dstId].sendAck(this.sockets[dstId].seqNr++, this.sockets[dstId].sndConnectionId, this.sockets[dstId].ackNr, dstId);
    }
    async handleIncomingData(packet, dstId) {
        this.sockets[dstId].updateRTT(packet.header.timestampDiff);
        this.sockets[dstId].ackNr = packet.header.seqNr;
        this.sockets[dstId].state = __1.ConnectionState.Connected;
        await this.sockets[dstId].sendAck(this.sockets[dstId].seqNr++, this.sockets[dstId].ackNr, this.sockets[dstId].sndConnectionId, dstId);
    }
}
exports.UtpProtocol = UtpProtocol;
