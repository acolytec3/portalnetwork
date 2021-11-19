/// <reference types="node" />
import { _UTPSocket } from "../Socket/_UTPSocket";
import { Packet } from "..";
import { Discv5 } from "@chainsafe/discv5";
export declare class UtpProtocol {
    sockets: Record<string, _UTPSocket>;
    client: Discv5;
    payloadChunks: Buffer[];
    constructor(client: Discv5);
    processContent(payload: Buffer): Promise<void>;
    nextChunk(): Buffer;
    initiateSyn(dstId: string): Promise<number>;
    handleSynAck(payload: Buffer, dstId: string, content: Buffer): Promise<void>;
    sendData(chunk: Buffer, dstId: string): Promise<void>;
    handleIncomingSyn(packetAsBuffer: Buffer, dstId: string): Promise<void>;
    handleIncomingData(packet: Packet, dstId: string): Promise<void>;
}
//# sourceMappingURL=utp_protocol.d.ts.map