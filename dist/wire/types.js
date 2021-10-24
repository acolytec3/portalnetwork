import { ContainerType, BigIntUintType, UnionType, ListType, byteType, NumberUintType } from "@chainsafe/ssz";
// Subnetwork IDs
export var SubNetworkIds;
(function (SubNetworkIds) {
    SubNetworkIds["StateNetworkId"] = "0x500a";
    SubNetworkIds["HistoryNetworkId"] = "0x500b";
    SubNetworkIds["TxGossipNetworkId"] = "0x500c";
    SubNetworkIds["HeaderGossipNetworkId"] = "0x500d";
    SubNetworkIds["CanonIndicesNetworkId"] = "0x500e";
})(SubNetworkIds || (SubNetworkIds = {}));
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
        custom_payload: new ListType({ limit: 2048, elementType: byteType })
    }
});
export const PortalWireMessageType = new UnionType({ types: [PingPongMessageType] });
export const StateNetworkCustomDataType = new ContainerType({
    fields: {
        data_radius: new BigIntUintType({ byteLength: 32 })
    }
});
export const FindNodesMessageType = new ContainerType({
    fields: {
        distances: new ListType({ limit: 256, elementType: new NumberUintType({ byteLength: 2 }) })
    }
});
