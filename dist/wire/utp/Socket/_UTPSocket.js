"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._UTPSocket = void 0;
const tslib_1 = require("tslib");
const __1 = require("..");
const _1 = require(".");
const events_1 = (0, tslib_1.__importDefault)(require("events"));
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
const ssz_1 = require("@chainsafe/ssz");
const __2 = require("../..");
const MAX_WINDOW = 1280;
const PacketSent = new EventTarget();
PacketSent.addEventListener("Packet Sent", (id) => {
    console.log("packet sent to" + id);
});
class _UTPSocket extends events_1.default {
    seqNr;
    client;
    ackNr;
    sndConnectionId;
    rcvConnectionId;
    max_window;
    cur_window;
    reply_micro;
    state;
    rtt;
    rtt_var;
    constructor(client) {
        super();
        this.client = client;
        this.seqNr = 1;
        this.ackNr = 0;
        this.rcvConnectionId = (0, __1.randUint16)();
        this.sndConnectionId = this.rcvConnectionId + 1;
        this.max_window = MAX_WINDOW;
        this.cur_window = 0;
        this.reply_micro = 0;
        this.state = _1.ConnectionState.SynSent;
        this.rtt = 0;
        this.rtt_var = 0;
    }
    validatePacketSize(packet) {
        return packet.payload.length <= this.max_window;
    }
    async sendPacket(packet, dstId, type) {
        let msg = packet.encodePacket();
        (0, assert_1.default)(this.validatePacketSize(packet), `Packet size ${packet.encodePacket().length} too large for max_window: ${this.max_window}`);
        await this.client.sendTalkReqSync(dstId, msg, (0, ssz_1.fromHexString)(__2.SubNetworkIds.UTPNetworkId));
        console.log(`${__1.PacketType[type]} packet sent.`);
    }
    async sendAck(seqNr, sndConnectionId, ackNr, dstId) {
        const packet = (0, __1.createAckPacket)(seqNr, sndConnectionId, ackNr, this.rtt_var);
        console.log(`Sending ack packet ${packet}`);
        await this.sendPacket(packet, dstId, __1.PacketType.ST_STATE);
    }
    // async sendAcceptPacket(packet: Packet, dstId: string) {
    //   let p = packet.encodePacket();
    //   const payload: AcceptMessage = {
    //     connectionId: p,
    //     contentKeys: [true],
    //   };
    //   const encodedPayload = PortalWireMessageType.serialize({
    //     selector: MessageCodes.ACCEPT,
    //     value: payload,
    //   });
    //   this.client.sendTalkResp(dstId, message.id, Buffer.from(encodedPayload));
    // }
    async sendSyn(dstId) {
        (0, assert_1.default)(this.state === _1.ConnectionState.SynSent);
        let packet = (0, __1.createSynPacket)(this.rcvConnectionId, this.seqNr++, this.ackNr);
        this.seqNr++;
        console.log(`Sending SYN packet ${packet} to ${dstId}`);
        await this.sendPacket(packet, dstId, __1.PacketType.ST_SYN);
        console.log(`SYN packet ${packet} sent to ${dstId}`);
    }
    async sendFin(dstId) {
        let packet = (0, __1.createFinPacket)(this.sndConnectionId, this.ackNr);
        console.log(`Sending FIN packet ${packet} to ${dstId}`);
        await this.sendPacket(packet, dstId, __1.PacketType.ST_FIN);
        this.seqNr = Number("eof_pkt");
        console.log(`FIN packet ${packet} sent to ${dstId}`);
    }
    async sendReset(dstId) {
        let packet = (0, __1.createResetPacket)(this.seqNr, this.sndConnectionId, this.ackNr);
        console.log(`Sending RESET packet ${packet} to ${dstId}`);
        await this.sendPacket(packet, dstId, __1.PacketType.ST_RESET);
        console.log(`RESET packet ${packet} sent to ${dstId}`);
    }
    async sendData(seqNr, ackNr, sndConnectionId, payload, dstId) {
        let packet = (0, __1.createDataPacket)(seqNr, sndConnectionId, ackNr, this.max_window, payload, this.rtt_var);
        console.log(`Sending DATA packet to ${dstId}`, packet);
        await this.sendPacket(packet, dstId, __1.PacketType.ST_DATA);
        console.log(`DATA packet ${packet} sent to ${dstId}`);
    }
    updateRTT(packetRTT) {
        this.rtt_var += Math.abs(this.rtt - packetRTT - this.rtt_var) / 4;
        this.rtt += (packetRTT - this.rtt) / 8;
    }
}
exports._UTPSocket = _UTPSocket;
