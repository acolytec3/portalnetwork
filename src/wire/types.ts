import { ENR } from "@chainsafe/discv5";
import { ContainerType, ByteVector, BigIntUintType, UnionType, ListType, byteType, NumberUintType } from "@chainsafe/ssz";

// Subnetwork IDs
export enum SubNetworkIds {
    StateNetworkId = '0x500a',
    HistoryNetworkId = '0x500b',
    TxGossipNetworkId = '0x500c',
    HeaderGossipNetworkId = '0x500d',
    CanonIndicesNetworkId = '0x500e',
}

// Wire Protocol Message Codes
export enum MessageCodes {
    PING = 0x01,
    PONG = 0x02,
    FINDNODES = 0x03,
    NODES = 0x04,
    FINDCONTENT = 0x05,
    CONTENT = 0x06,
    OFFER = 0x07,
    ACCEPT = 0x08
}

export const ByteList = new ListType({ limit: 2048, elementType: byteType })
export interface PingMessage {
    enrSeq: bigint
    customPayload: ByteVector
}

export const PingPongMessageType = new ContainerType({
    fields: {
        enrSeq: new BigIntUintType({ byteLength: 8 }),
        customPayload: ByteList
    }
})


export const PortalWireMessageType = new UnionType({ types: [PingPongMessageType] })

export const StateNetworkCustomDataType = new ContainerType({
    fields: {
        dataRadius: new BigIntUintType({ byteLength: 32 })
    }
})

export interface FindNodesMessage {
    distances: Uint16Array
}

export const FindNodesMessageType = new ContainerType({
    fields: {
        distances:
            new ListType({ elementType: new NumberUintType({ byteLength: 2 }), limit: 256 })
    }
})

export interface NodesMessage {
    total: Number,
    enrs: Uint8Array[]
}

export const NodesMessageType = new ContainerType({
    fields: {
        total: byteType,
        enrs: new ListType({ elementType: ByteList, limit: 32 })
    }
})
