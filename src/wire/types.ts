import { ContainerType, ByteVector, BigIntUintType, UnionType, ListType, byteType, NumberUintType, BasicListType } from "@chainsafe/ssz";

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

export interface PingMessage {
    enr_seq: bigint
    custom_payload: ByteVector
}

export const PingPongMessageType = new ContainerType({
    fields: {
        enr_seq: new BigIntUintType({ byteLength: 8 }),
        custom_payload: new ListType({ limit: 2048, elementType: byteType })
    }
})


export const PortalWireMessageType = new UnionType({ types: [PingPongMessageType] })

export const StateNetworkCustomDataType = new ContainerType({
    fields: {
        data_radius: new BigIntUintType({ byteLength: 32 })
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

