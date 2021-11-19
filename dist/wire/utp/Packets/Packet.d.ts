/// <reference types="node" />
import { IPacketOptions } from "./PacketTyping";
import { PacketHeader } from "./PacketHeader";
import { Uint16, Uint32 } from ".";
export declare class Packet {
    header: PacketHeader;
    payload: Uint8Array;
    sent: number;
    size: number;
    constructor(options: IPacketOptions);
    encodePacket(): Buffer;
}
export declare function createSynPacket(rcvConnectionId: Uint16, seqNr: Uint16, ackNr?: number): Packet;
export declare function createAckPacket(seqNr: Uint16, sndConnectionId: Uint16, ackNr: Uint16, rtt_var: number): Packet;
export declare function createDataPacket(seqNr: Uint16, sndConnectionId: Uint16, ackNr: Uint16, bufferSize: Uint32, payload: Uint8Array, rtt_var: number): Packet;
export declare function createResetPacket(seqNr: Uint16, sndConnectionId: Uint16, ackNr: Uint16): Packet;
export declare function createFinPacket(connectionId: Uint16, ackNr: number): Packet;
export * from "./PacketTyping";
//# sourceMappingURL=Packet.d.ts.map