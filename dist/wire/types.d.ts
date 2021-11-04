import { ContainerType, ByteVector, UnionType, ListType, ByteVectorType, Union } from "@chainsafe/ssz";
import { NoneType } from '@chainsafe/ssz/lib/types/basic/none';
export declare enum SubNetworkIds {
    StateNetworkId = "0x500a",
    HistoryNetworkId = "0x500b",
    TxGossipNetworkId = "0x500c",
    HeaderGossipNetworkId = "0x500d",
    CanonIndicesNetworkId = "0x500e"
}
export declare const StateNetworkCustomDataType: ContainerType<import("@chainsafe/ssz").ObjectLike>;
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
export declare const ByteList: ListType<import("@chainsafe/ssz").List<any>>;
export declare const Bytes2: ByteVectorType;
export declare const ENRs: ListType<import("@chainsafe/ssz").List<any>>;
export declare type PingMessage = {
    enrSeq: bigint;
    customPayload: ByteVector;
};
export declare type PongMessage = {
    enrSeq: bigint;
    customPayload: ByteVector;
};
export declare const PingMessageType: ContainerType<import("@chainsafe/ssz").ObjectLike>;
export declare const PongMessageType: ContainerType<import("@chainsafe/ssz").ObjectLike>;
export declare type FindNodesMessage = {
    distances: Uint16Array;
};
export declare const FindNodesMessageType: ContainerType<import("@chainsafe/ssz").ObjectLike>;
export declare type NodesMessage = {
    total: Number;
    enrs: Uint8Array[];
};
export declare const NodesMessageType: ContainerType<import("@chainsafe/ssz").ObjectLike>;
export declare type FindContentMessage = {
    contentKey: Uint8Array;
};
export declare const FindContentMessageType: ContainerType<import("@chainsafe/ssz").ObjectLike>;
export declare type ContentMessage = {
    content: Uint8Array | Uint8Array[];
};
export declare type connectionId = Uint8Array;
export declare type content = Uint8Array;
export declare type enrs = Uint8Array[];
export declare const ContentMessageType: UnionType<Union<Uint8Array | enrs>>;
export declare type OfferMessage = {
    contentKeys: Uint8Array[];
};
export declare const OfferMessageType: ContainerType<import("@chainsafe/ssz").ObjectLike>;
export declare type AcceptMessage = {
    connectionId: Uint8Array;
    contentKeys: Boolean[];
};
export declare const AcceptMessageType: ContainerType<import("@chainsafe/ssz").ObjectLike>;
declare type MessageTypeUnion = NoneType | PingMessage | PongMessage | FindNodesMessage | NodesMessage | FindContentMessage | ContentMessage | OfferMessage | AcceptMessage;
export declare const PortalWireMessageType: UnionType<Union<MessageTypeUnion>>;
export {};
//# sourceMappingURL=types.d.ts.map