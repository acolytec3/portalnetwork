export enum SubNetwork {
    state = 0x500A,
    history = 0x500B,
    txGossip = 0x500C,
    headerGossip = 0x500D,
    canonIndices = 0X500E
}

export enum MessageType {
    PING = 0x01,
    PONG = 0x02,
    FINDNODES = 0x03,
    NODES = 0x04,
    FINDCONTENT = 0x05,
    CONTENT = 0x06,
    OFFER = 0x07,
    ACCEPT = 0x08
}