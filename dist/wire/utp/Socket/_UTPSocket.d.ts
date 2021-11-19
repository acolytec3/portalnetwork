/// <reference types="node" />
import { Packet, PacketType } from "..";
import { ConnectionState } from ".";
import EventEmitter from "events";
import { Discv5 } from "@chainsafe/discv5";
export declare class _UTPSocket extends EventEmitter {
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
    constructor(client: Discv5);
    validatePacketSize(packet: Packet): boolean;
    sendPacket(packet: Packet, dstId: string, type: PacketType): Promise<void>;
    sendAck(seqNr: number, sndConnectionId: number, ackNr: number, dstId: string): Promise<void>;
    sendSyn(dstId: string): Promise<void>;
    sendFin(dstId: string): Promise<void>;
    sendReset(dstId: string): Promise<void>;
    sendData(seqNr: number, ackNr: number, sndConnectionId: number, payload: Uint8Array, dstId: string): Promise<void>;
    updateRTT(packetRTT: number): void;
}
//# sourceMappingURL=_UTPSocket.d.ts.map