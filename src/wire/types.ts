import { ContainerType, ByteVector, ByteVectorType, BigIntUintType, UnionType, NumberUintType, BasicVectorType, BasicListType, NUMBER_UINT_TYPE } from "@chainsafe/ssz";

// Subnetwork IDs
export const StateNetworkId = '0x500A'
export const HistoryNetworkId = Uint8Array.from([0x50, 0x0B])
export const TxGossipNetworkId = Uint8Array.from([0x50, 0x0C])
export const HeaderGossipNetworkId = Uint8Array.from([0x50, 0x0D])
export const CanonIndicesNetworkId = Uint8Array.from([0x50, 0x0E])

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
        custom_payload: new BasicListType({ limit: 2048, elementType: new NumberUintType({ byteLength: 1 }) })
    }
})


export const MessageType = new UnionType({ types: [PingPongMessageType] })

export const StateNetworkCustomDataType = new ContainerType({
    fields: {
        data_radius: new BigIntUintType({ byteLength: 32 })
    }
})

