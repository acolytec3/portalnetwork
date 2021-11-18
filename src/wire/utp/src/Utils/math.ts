import { Uint16, Uint32 } from "..";
import { hrtime } from "process";
import { EXTENSION, ID_MASK, VERSION } from "./constants";
import { PacketHeader } from "../Packets/PacketHeader";
import { Packet } from "../Packets/Packet";
import { Duration, Miliseconds } from "../Socket/socketTyping";
import { minimalHeaderSize } from "../Packets/PacketTyping";
export function getMonoTimeStamp(): Uint32 {
    let time = hrtime.bigint();
    return Number(time / BigInt(1000)) as Uint32;
  }
  
  export function randUint16(): Uint16 {
    return (Math.random() * 2 ** 16) as Uint16;
  }
  export function randUint32(): Uint16 {
    return (Math.random() * 2 ** 32) as Uint16;
  }

  export function bitLength(n: number): number {
    const bitstring = n.toString(2);
    if (bitstring === "0") {
      return 0;
    }
    return bitstring.length;
  }
  
  export function nextPowerOf2(n: number): number {
    return n <= 0 ? 1 : Math.pow(2, bitLength(n - 1));
  }

  export function sleep(ms: Miliseconds) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  export function max(a: number, b: Duration): Duration {
    return a > b ? a : b;
  }

  export function decodePacketFromBytes(bytes: Uint8Array): Packet {
    if (bytes.length < minimalHeaderSize) {
      console.error("invalid header size");
    }
    const kind = bytes[0] >> 4;
    let header: PacketHeader = new PacketHeader({
      pType: kind,
      extension: bytes[1],
      connectionId: Buffer.from(bytes.subarray(2, 3)).readUInt16BE(),
      seqNr: Buffer.from(bytes.subarray(16, 17)).readUInt16BE(),
      ackNr: Buffer.from(bytes.subarray(18, 19)).readUInt16BE(),
      timestamp: Buffer.from(bytes.subarray(4, 7)).readUInt16BE(),
      timestampDiff: Buffer.from(bytes.subarray(8, 11)).readUInt16BE(),
      wndSize: Buffer.from(bytes.subarray(12, 15)).readUInt16BE(),
    });
    let payload = bytes.length == 20 ? new Uint8Array(0) : bytes.subarray(20);
    let packet: Packet = new Packet({ header: header, payload: payload });
    return packet;
  }

  export function bufferToPacket(buffer: Buffer): Packet {
    let packet: Packet = new Packet({
      header: new PacketHeader({
        pType: 0,
        version: 1,
        extension: 0,
        connectionId: buffer[0] & ID_MASK,
        timestamp: buffer.readUInt16BE(2),
        timestampDiff: buffer.readUInt32BE(4),
        wndSize: buffer.readUInt32BE(12),
        seqNr: buffer.readUInt16BE(16),
        ackNr: buffer.readUInt16BE(18)
      }),
      payload: buffer.slice(20)
      }
    )
    return packet
    }

  export function packetToBuffer(packet: Packet): Buffer {
    let buffer = Buffer.alloc(20 + (packet.payload ? packet.payload.length : 0))
    buffer[0] = packet.header.connectionId | VERSION
    buffer[1] = EXTENSION
    buffer.writeUInt16BE(packet.header.connectionId, 2);
    buffer.writeUInt32BE(packet.header.timestamp, 4);
    buffer.writeUInt32BE(packet.header.timestampDiff as number, 8);
    buffer.writeUInt32BE(packet.header.wndSize as number, 12);
    buffer.writeUInt16BE(packet.header.seqNr, 16);
    buffer.writeUInt16BE(packet.header.seqNr, 18);
    if (packet.payload) {
      return Buffer.from(packet.payload)
    } else {
      return Buffer.alloc(20)
    }
  
  }