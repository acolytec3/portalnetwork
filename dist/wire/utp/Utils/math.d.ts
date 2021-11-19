/// <reference types="node" />
import { Uint16, Uint32 } from "..";
import { Packet } from "../Packets/Packet";
import { Duration, Miliseconds } from "../Socket/socketTyping";
export declare function getMonoTimeStamp(): Uint32;
export declare function randUint16(): Uint16;
export declare function randUint32(): Uint16;
export declare function bitLength(n: number): number;
export declare function nextPowerOf2(n: number): number;
export declare function sleep(ms: Miliseconds): Promise<unknown>;
export declare function max(a: number, b: Duration): Duration;
export declare function bufferToPacket(buffer: Buffer): Packet;
export declare function packetToBuffer(packet: Packet): Buffer;
//# sourceMappingURL=math.d.ts.map