import { _UTPSocket } from "../Socket/_UTPSocket";
import { bufferToPacket, ConnectionState, Packet, randUint16 } from "..";
import { Discv5 } from "@chainsafe/discv5";

export class UtpProtocol {
  sockets: Record<string, _UTPSocket>;
  client: Discv5
  payloadChunks: Buffer[];

  constructor(client: Discv5) {
  this.client = client;
    this.sockets = {};
    this.payloadChunks = [];
  }
  

  // TODO: Chop up CONTENT into chunks.
  // TODO: Reassemble chunks

  async processContent(payload: Buffer): Promise<void> {
    let packetSize = 1200;
    for (let i=0; i<payload.length; i+= packetSize) {
      this.payloadChunks.push(payload.subarray(i, i+packetSize))
    }
  }

  
  
  
  nextChunk(): Buffer {
    return this.payloadChunks.pop() as Buffer
  }
  
  
  
  async initiateSyn(dstId: string): Promise<number> {
    const socket = new _UTPSocket(this.client)
    this.sockets[dstId] = socket;
    
    await this.sockets[dstId].sendSyn(dstId);
    return this.sockets[dstId].sndConnectionId
  }
  
  async handleSynAck(payload: Buffer, dstId: string, content: Buffer): Promise<void> {
    const ack = bufferToPacket(payload);
    await this.processContent(content)
    this.sockets[dstId].state = ConnectionState.Connected;
    this.sockets[dstId].ackNr = ack.header.seqNr;
    this.payloadChunks.length > 0
    ? await this.sendData(this.nextChunk(), dstId)
    : await this.sockets[dstId].sendFin(dstId);
  }
  
  async sendData(chunk: Buffer, dstId: string): Promise<void> {
    await this.sockets[dstId].sendData(
      this.sockets[dstId].seqNr,
      this.sockets[dstId].ackNr,
      this.sockets[dstId].sndConnectionId,
      chunk,
      dstId
      );
    }
    
    async handleIncomingSyn(packetAsBuffer: Buffer, dstId: string): Promise<void> {
      let socket = new _UTPSocket(this.client);
      this.sockets[dstId] = socket;
      const packet: Packet = bufferToPacket(packetAsBuffer)
    this.sockets[dstId].updateRTT(packet.header.timestampDiff);
    this.sockets[dstId].rcvConnectionId = packet.header.connectionId + 1;
    this.sockets[dstId].sndConnectionId = packet.header.connectionId;
    this.sockets[dstId].seqNr = randUint16();
    this.sockets[dstId].ackNr = packet.header.seqNr;
    this.sockets[dstId].state = ConnectionState.SynRecv;
    await this.sockets[dstId].sendAck(
      this.sockets[dstId].seqNr++,
      this.sockets[dstId].sndConnectionId,
      this.sockets[dstId].ackNr,
      dstId
    );
  }

  async handleIncomingData(packet: Packet, dstId: string): Promise<void> {
    this.sockets[dstId].updateRTT(packet.header.timestampDiff);
    this.sockets[dstId].ackNr = packet.header.seqNr;
    this.sockets[dstId].state = ConnectionState.Connected;
    await this.sockets[dstId].sendAck(
      this.sockets[dstId].seqNr++,
      this.sockets[dstId].ackNr,
      this.sockets[dstId].sndConnectionId,
      dstId
    );
  }



}
