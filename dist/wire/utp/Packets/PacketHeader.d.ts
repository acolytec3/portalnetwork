/// <reference types="node" />
import { Uint16, Uint32, Uint8 } from '..';
import { IPacketHeader, MicroSeconds, PacketType } from "./PacketTyping";
export declare class PacketHeader {
    pType: PacketType;
    version: Uint8;
    extension: Uint8;
    connectionId: Uint16;
    timestamp: MicroSeconds;
    timestampDiff: MicroSeconds;
    wndSize: Uint32;
    seqNr: Uint16;
    ackNr: Uint16;
    constructor(options: IPacketHeader);
    encodeTypeVer(): Uint8;
    encodeHeaderStream(): Buffer;
}
//# sourceMappingURL=PacketHeader.d.ts.map