import {
  protocolVersion,
  PacketType,
  IPacketOptions,
  DEFAULT_WINDOW_SIZE,
} from "./PacketTyping";
import { PacketHeader } from "./PacketHeader";
import { Uint16, Uint32 } from ".";




export class Packet {
  header: PacketHeader;
  payload: Uint8Array;
  sent: number;
  size: number;
  constructor(options: IPacketOptions) {
    this.header = options.header;
    this.payload = options.payload;
    this.sent = 0;
    this.size = 20 + this.payload.length;
  }

  encodePacket(): Buffer {
    let buffer = Buffer.alloc(this.size)
    buffer[0] = 1
    buffer[1] = 0
    buffer.writeUInt16BE(this.header.connectionId, 2);
    buffer.writeUInt32BE(this.header.timestamp, 4);
    buffer.writeUInt32BE(this.header.timestampDiff, 8);
    buffer.writeUInt32BE(this.header.wndSize, 12);
    buffer.writeUInt16BE(this.header.seqNr, 16);
    buffer.writeUInt16BE(this.header.seqNr, 18);
    if (this.payload) {
      return Buffer.from(this.payload)
    } else {
      return Buffer.alloc(20)
    }
  
  }
}

export function createSynPacket(
  rcvConnectionId: Uint16,
  seqNr: Uint16,
  ackNr?: number
): Packet {
  let h: PacketHeader = new PacketHeader({
    pType: PacketType.ST_SYN,
    connectionId: rcvConnectionId,
    seqNr: seqNr,
    ackNr: ackNr || 0,
  });

  let packet: Packet = new Packet({ header: h, payload: new Uint8Array() });
  return packet;
}

export function createAckPacket(
  seqNr: Uint16,
  sndConnectionId: Uint16,
  ackNr: Uint16,
  rtt_var: number
): Packet {
  let h: PacketHeader = new PacketHeader({
    pType: PacketType.ST_STATE,
    connectionId: sndConnectionId,
    seqNr: seqNr,
    ackNr: ackNr,
    wndSize: DEFAULT_WINDOW_SIZE,
    timestampDiff: rtt_var
  });

  const packet: Packet = new Packet({ header: h, payload: new Uint8Array(0) });
  return packet;
}

export function createDataPacket(
  seqNr: Uint16,
  sndConnectionId: Uint16,
  ackNr: Uint16,
  bufferSize: Uint32,
  payload: Uint8Array,
  rtt_var: number
): Packet {
  let h: PacketHeader = new PacketHeader({
    pType: PacketType.ST_DATA,
    version: protocolVersion,
    extension: 0,
    connectionId: sndConnectionId,
    timestampDiff: rtt_var,
    wndSize: bufferSize,
    seqNr: seqNr,
    ackNr: ackNr,
  });
  const packet: Packet = new Packet({ header: h, payload: payload });
  return packet;
}

export function createResetPacket(
  seqNr: Uint16,
  sndConnectionId: Uint16,
  ackNr: Uint16,
): Packet {
  let h = new PacketHeader({
    pType: PacketType.ST_RESET,
    version: protocolVersion,
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

export function createFinPacket(
  connectionId: Uint16,
  ackNr: number,
): Packet {
  let h = new PacketHeader({
    pType: PacketType.ST_FIN,
    version: protocolVersion,
    extension: 0,
    connectionId: connectionId,
    timestamp: Date.now(),
    timestampDiff: 0,
    wndSize: DEFAULT_WINDOW_SIZE,
    seqNr: Number("eof_pkt") as Uint16,
    ackNr: ackNr
  })
  return new Packet({header: h, payload: new Uint8Array()})
}




export * from "./PacketTyping";
