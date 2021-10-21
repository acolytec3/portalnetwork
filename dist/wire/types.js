import { ContainerType, BigIntUintType, UnionType, NumberUintType, BasicListType } from "@chainsafe/ssz";
// Subnetwork IDs
export const StateNetworkId = Uint8Array.from([0x50, 0x0A]);
export const HistoryNetworkId = Uint8Array.from([0x50, 0x0B]);
export const TxGossipNetworkId = Uint8Array.from([0x50, 0x0C]);
export const HeaderGossipNetworkId = Uint8Array.from([0x50, 0x0D]);
export const CanonIndicesNetworkId = Uint8Array.from([0x50, 0x0E]);
// Wire Protocol Message Codes
export var MessageCodes;
(function (MessageCodes) {
    MessageCodes[MessageCodes["PING"] = 1] = "PING";
    MessageCodes[MessageCodes["PONG"] = 2] = "PONG";
    MessageCodes[MessageCodes["FINDNODES"] = 3] = "FINDNODES";
    MessageCodes[MessageCodes["NODES"] = 4] = "NODES";
    MessageCodes[MessageCodes["FINDCONTENT"] = 5] = "FINDCONTENT";
    MessageCodes[MessageCodes["CONTENT"] = 6] = "CONTENT";
    MessageCodes[MessageCodes["OFFER"] = 7] = "OFFER";
    MessageCodes[MessageCodes["ACCEPT"] = 8] = "ACCEPT";
})(MessageCodes || (MessageCodes = {}));
export const PingPongMessageType = new ContainerType({
    fields: {
        enr_seq: new BigIntUintType({ byteLength: 8 }),
        custom_payload: new BasicListType({ limit: 2048, elementType: new NumberUintType({ byteLength: 1 }) })
    }
});
export const MessageType = new UnionType({ types: [PingPongMessageType] });
export const StateNetworkCustomDataType = new ContainerType({
    fields: {
        data_radius: new BigIntUintType({ byteLength: 32 })
    }
});
