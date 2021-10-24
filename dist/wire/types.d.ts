import { ContainerType, ByteVector, UnionType } from "@chainsafe/ssz";
export declare enum SubNetworkIds {
    StateNetworkId = "0x500a",
    HistoryNetworkId = "0x500b",
    TxGossipNetworkId = "0x500c",
    HeaderGossipNetworkId = "0x500d",
    CanonIndicesNetworkId = "0x500e"
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
    enr_seq: bigint;
    custom_payload: ByteVector;
}
export declare const PingPongMessageType: ContainerType<import("@chainsafe/ssz").ObjectLike>;
export declare const PortalWireMessageType: UnionType<import("@chainsafe/ssz").Union<unknown>>;
export declare const StateNetworkCustomDataType: ContainerType<import("@chainsafe/ssz").ObjectLike>;
export interface FindNodesMessage {
    distances: Uint16Array;
}
export declare const FindNodesMessageType: ContainerType<import("@chainsafe/ssz").ObjectLike>;
//# sourceMappingURL=types.d.ts.map