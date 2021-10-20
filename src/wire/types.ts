import { ContainerType, ByteVector, ByteVectorType, Number64UintType, BigIntUintType, UnionType, UintType, NumberUintType } from "@chainsafe/ssz";

export enum SubNetwork {
    state = '0x500A',
    history = '0x500B',
    txGossip = '0x500C',
    headerGossip = '0x500D',
    canonIndices = '0X500E'
}

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
    enr_seq: Uint8Array
    custom_payload: ByteVector
}

export const PingPongMessageType = new ContainerType({
    fields: {
        enr_seq: new NumberUintType({ byteLength: 64 }),
        custom_payload: new ByteVectorType({ length: 2048 })
    }
})


export const MessageType = new UnionType({ types: [PingPongMessageType] })

export const StateNetworkCustomDataType = new ContainerType({
    fields: {
        data_radius: new BigIntUintType({ byteLength: 256 })
    }
})

