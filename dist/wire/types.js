import { ContainerType, BigIntUintType, UnionType, NumberUintType, BasicListType } from "@chainsafe/ssz";
// Subnetwork IDs
export const StateNetworkId = '500a';
export const HistoryNetworkId = '500b';
export const TxGossipNetworkId = '500c';
export const HeaderGossipNetworkId = '500d';
export const CanonIndicesNetworkId = '500e';
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
export const PortalWireMessageType = new UnionType({ types: [PingPongMessageType] });
export const StateNetworkCustomDataType = new ContainerType({
    fields: {
        data_radius: new BigIntUintType({ byteLength: 32 })
    }
});
