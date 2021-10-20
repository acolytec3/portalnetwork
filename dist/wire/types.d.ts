import { ContainerType, ByteVector, UnionType } from "@chainsafe/ssz";
export declare enum SubNetwork {
    state = "0x500A",
    history = "0x500B",
    txGossip = "0x500C",
    headerGossip = "0x500D",
    canonIndices = "0X500E"
}
export declare enum MessageCodes {
    PING = 1,
    PONG = 2,
    FINDNODES = 3,
    NODES = 4,
    FINDCONTENT = 5,
    CONTENT = 6,
    OFFER = 7,
    ACCEPT = 8
}
export interface PingMessage {
    enr_seq: Uint8Array;
    custom_payload: ByteVector;
}
export declare const PingPongMessageType: ContainerType<import("@chainsafe/ssz").ObjectLike>;
export declare const MessageType: UnionType<import("@chainsafe/ssz").Union<unknown>>;
export declare const StateNetworkCustomDataType: ContainerType<import("@chainsafe/ssz").ObjectLike>;
//# sourceMappingURL=types.d.ts.map