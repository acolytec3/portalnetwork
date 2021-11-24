"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtpProtocol = void 0;
const _UTPSocket_1 = require("../Socket/_UTPSocket");
const __1 = require("..");
const debug_1 = require("debug");
const log = (0, debug_1.debug)("<uTP>");
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
        if (payload.length < packetSize) {
            this.payloadChunks.push(payload);
            console.log(this.payloadChunks);
        }
        else {
            for (let i = 0; i < payload.length; i += packetSize) {
                this.payloadChunks.push(payload.subarray(i, i + packetSize));
            }
        }
    }
    nextChunk() {
        return this.payloadChunks.pop();
    }
    async initiateSyn(dstId) {
        log(`Requesting uTP stream connection with ${dstId}`);
        const socket = new _UTPSocket_1._UTPSocket(this.client);
        this.sockets[dstId] = socket;
        await this.sockets[dstId].sendSyn(dstId);
        return this.sockets[dstId].sndConnectionId;
    }
    async handleSynAck(ack, dstId, content) {
        log("Received ST_STATE packet...SYN acked...Connection established.");
        await this.processContent(content);
        this.sockets[dstId].state = __1.ConnectionState.Connected;
        this.sockets[dstId].ackNr = ack.header.seqNr;
        this.payloadChunks.length > 0
            ? await this.sendData(this.nextChunk(), dstId)
            : await this.sockets[dstId].sendFin(dstId);
    }
    async handleAck(packet, dstId) {
        log("Received ST_STATE packet from " + dstId);
        this.sockets[dstId].state = __1.ConnectionState.Connected;
        this.sockets[dstId].ackNr = packet.header.seqNr;
        this.payloadChunks.length > 0
            ? await this.sendData(this.nextChunk(), dstId)
            : await this.sockets[dstId].sendFin(dstId);
    }
    async handleFin(packet, dstId) {
        log("Received ST_FIN packet from " + dstId + "...uTP stream closing...");
        this.sockets[dstId].state = __1.ConnectionState.Destroy;
        this.sockets[dstId].ackNr = packet.header.seqNr;
    }
    async sendData(chunk, dstId) {
        await this.sockets[dstId].sendData(this.sockets[dstId].seqNr, this.sockets[dstId].ackNr, this.sockets[dstId].sndConnectionId, chunk, dstId);
    }
    async handleIncomingSyn(packet, dstId) {
        log(`Received incoming ST_SYN packet...uTP connection requested by ${dstId}`);
        let socket = new _UTPSocket_1._UTPSocket(this.client);
        this.sockets[dstId] = socket;
        this.sockets[dstId].updateRTT(packet.header.timestampDiff);
        this.sockets[dstId].rcvConnectionId = packet.header.connectionId + 1;
        this.sockets[dstId].sndConnectionId = packet.header.connectionId;
        this.sockets[dstId].seqNr = (0, __1.randUint16)();
        this.sockets[dstId].ackNr = packet.header.seqNr;
        this.sockets[dstId].state = __1.ConnectionState.SynRecv;
        await this.sockets[dstId].sendAck(this.sockets[dstId].seqNr++, this.sockets[dstId].sndConnectionId, this.sockets[dstId].ackNr, dstId);
        log(`uTP stream opened with ${dstId}`);
    }
    async handleIncomingData(packet, dstId) {
        this.sockets[dstId].updateRTT(packet.header.timestampDiff);
        this.sockets[dstId].ackNr = packet.header.seqNr;
        this.sockets[dstId].state = __1.ConnectionState.Connected;
        await this.sockets[dstId].sendAck(this.sockets[dstId].seqNr++, this.sockets[dstId].ackNr, this.sockets[dstId].sndConnectionId, dstId);
    }
}
exports.UtpProtocol = UtpProtocol;
