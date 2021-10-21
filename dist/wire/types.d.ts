import { ContainerType, ByteVector, UnionType } from "@chainsafe/ssz";
export declare const StateNetworkId: Uint8Array;
export declare const HistoryNetworkId: Uint8Array;
export declare const TxGossipNetworkId: Uint8Array;
export declare const HeaderGossipNetworkId: Uint8Array;
export declare const CanonIndicesNetworkId: Uint8Array;
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
export declare const MessageType: UnionType<import("@chainsafe/ssz").Union<unknown>>;
export declare const StateNetworkCustomDataType: ContainerType<import("@chainsafe/ssz").ObjectLike>;
//# sourceMappingURL=types.d.ts.map