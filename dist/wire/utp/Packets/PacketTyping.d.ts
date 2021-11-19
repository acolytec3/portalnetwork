import { Multiaddr } from "multiaddr";
import { PacketHeader } from "./PacketHeader";
export declare const minimalHeaderSize = 20;
export declare const protocolVersion = 1;
export declare enum PacketType {
    ST_DATA = 0,
    ST_FIN = 1,
    ST_STATE = 2,
    ST_RESET = 3,
    ST_SYN = 4
}
export declare const MIN_PACKET_SIZE = 20;
export declare const DEFAULT_WINDOW_SIZE: number;
export declare const CLOSE_GRACE = 5000;
export declare const BUFFER_SIZE = 512;
export declare type Uint8 = number;
export declare type Uint16 = number;
export declare type Uint32 = number;
export declare type MicroSeconds = Uint32;
export interface connectionType {
    Id: Multiaddr;
    seqNr: Uint16;
    ackNr: Uint16;
}
export declare type PacketHeaderType = {
    pType: PacketType;
    version: Uint8;
    extension: Uint8;
    connectionId: Uint16;
    timestamp: MicroSeconds;
    timestampDiff: MicroSeconds;
    wndSize: Uint32;
    seqNr: Uint16;
    ackNr: Uint16;
};
export interface IPacketHeader {
    pType: PacketType;
    connectionId: Uint16;
    seqNr: Uint16;
    ackNr: Uint16;
    version?: Uint8;
    extension?: Uint8;
    timestamp?: MicroSeconds;
    timestampDiff?: MicroSeconds;
    wndSize?: Uint32;
}
export interface IPacketOptions {
    header: PacketHeader;
    payload: Uint8Array;
}
export interface IDecodePacketOptions extends IPacketOptions {
    bytes: Uint8Array;
}
//# sourceMappingURL=PacketTyping.d.ts.map