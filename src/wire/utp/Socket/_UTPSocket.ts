import {
  createAckPacket,
  createDataPacket,
  createFinPacket,
  createResetPacket,
  createSynPacket,
  Packet,
  PacketType,
  randUint16,
} from "..";
import { ConnectionState } from ".";

import EventEmitter from "events";
import { Discv5 } from "@chainsafe/discv5";
import assert from "assert";
import { fromHexString } from "@chainsafe/ssz";
import { SubNetworkIds } from "../..";

const MAX_WINDOW = 1280;
const PacketSent = new EventTarget();
PacketSent.addEventListener("Packet Sent", (id) => {
  console.log("packet sent to" + id);
});

export class _UTPSocket extends EventEmitter {
  seqNr: number;
  client: Discv5;
  ackNr: number;
  sndConnectionId: number;
  rcvConnectionId: number;
  max_window: number;
  cur_window: number;
  reply_micro: number;
  state: ConnectionState;
  rtt: number;
  rtt_var: number;
  constructor(client: Discv5) {
    super();
    this.client = client;
    this.seqNr = 1;
    this.ackNr = 0;
    this.rcvConnectionId = randUint16();
    this.sndConnectionId = this.rcvConnectionId + 1;

    this.max_window = MAX_WINDOW;
    this.cur_window = 0;
    this.reply_micro = 0;
    this.state = ConnectionState.SynSent;
    this.rtt = 0;
    this.rtt_var = 0;
  }

  validatePacketSize(packet: Packet): boolean {
    return packet.payload.length <= this.max_window;
  }
  async sendPacket(
    packet: Packet,
    dstId: string,
    type: PacketType
  ): Promise<void> {
    let msg = packet.encodePacket();
    assert(
      this.validatePacketSize(packet),
      `Packet size ${packet.encodePacket().length} too large for max_window: ${
        this.max_window
      }`
    );
    await this.client.sendTalkReqSync(dstId, msg, fromHexString(SubNetworkIds.UTPNetworkId));
    console.log(`${PacketType[type]} packet sent.`);
  }

  async sendAck(
    seqNr: number,
    sndConnectionId: number,
    ackNr: number,
    dstId: string
  ): Promise<void> {
    const packet = createAckPacket(seqNr, sndConnectionId, ackNr, this.rtt_var);
    console.log(`Sending ack packet ${packet}`);
    await this.sendPacket(packet, dstId, PacketType.ST_STATE);
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

  async sendSyn(dstId: string): Promise<void> {
    assert(this.state === ConnectionState.SynSent);
    let packet = createSynPacket(
      this.rcvConnectionId,
      this.seqNr++,
      this.ackNr
    );
    this.seqNr++;
    console.log(`Sending SYN packet ${packet} to ${dstId}`);
    await this.sendPacket(packet, dstId, PacketType.ST_SYN);
    console.log(`SYN packet ${packet} sent to ${dstId}`);
  }

  async sendFin(dstId: string) {
    let packet = createFinPacket(this.sndConnectionId, this.ackNr);
    console.log(`Sending FIN packet ${packet} to ${dstId}`);
    await this.sendPacket(packet, dstId, PacketType.ST_FIN);
    this.seqNr = Number("eof_pkt");
    console.log(`FIN packet ${packet} sent to ${dstId}`);
  }

  async sendReset(dstId: string) {
    let packet = createResetPacket(
      this.seqNr,
      this.sndConnectionId,
      this.ackNr
    );
    console.log(`Sending RESET packet ${packet} to ${dstId}`);
    await this.sendPacket(packet, dstId, PacketType.ST_RESET);
    console.log(`RESET packet ${packet} sent to ${dstId}`);
  }

  async sendData(
    seqNr: number,
    ackNr: number,
    sndConnectionId: number,
    payload: Uint8Array,
    dstId: string
  ): Promise<void> {
    let packet = createDataPacket(
      seqNr,
      sndConnectionId,
      ackNr,
      this.max_window,
      payload,
      this.rtt_var
    );
    console.log(`Sending DATA packet to ${dstId}`, packet);
    await this.sendPacket(packet, dstId, PacketType.ST_DATA);
    console.log(`DATA packet ${packet} sent to ${dstId}`);
  }

  updateRTT(packetRTT: number) {
    this.rtt_var += Math.abs(this.rtt - packetRTT - this.rtt_var) / 4;

    this.rtt += (packetRTT - this.rtt) / 8;
  }
}
