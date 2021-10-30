"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodesMessageType = exports.FindNodesMessageType = exports.StateNetworkCustomDataType = exports.PortalWireMessageType = exports.PingPongMessageType = exports.ByteList = exports.MessageCodes = exports.SubNetworkIds = void 0;
const ssz_1 = require("@chainsafe/ssz");
// Subnetwork IDs
var SubNetworkIds;
(function (SubNetworkIds) {
    SubNetworkIds["StateNetworkId"] = "0x500a";
    SubNetworkIds["HistoryNetworkId"] = "0x500b";
    SubNetworkIds["TxGossipNetworkId"] = "0x500c";
    SubNetworkIds["HeaderGossipNetworkId"] = "0x500d";
    SubNetworkIds["CanonIndicesNetworkId"] = "0x500e";
})(SubNetworkIds = exports.SubNetworkIds || (exports.SubNetworkIds = {}));
// Wire Protocol Message Codes
var MessageCodes;
(function (MessageCodes) {
    MessageCodes[MessageCodes["PING"] = 1] = "PING";
    MessageCodes[MessageCodes["PONG"] = 2] = "PONG";
    MessageCodes[MessageCodes["FINDNODES"] = 3] = "FINDNODES";
    MessageCodes[MessageCodes["NODES"] = 4] = "NODES";
    MessageCodes[MessageCodes["FINDCONTENT"] = 5] = "FINDCONTENT";
    MessageCodes[MessageCodes["CONTENT"] = 6] = "CONTENT";
    MessageCodes[MessageCodes["OFFER"] = 7] = "OFFER";
    MessageCodes[MessageCodes["ACCEPT"] = 8] = "ACCEPT";
})(MessageCodes = exports.MessageCodes || (exports.MessageCodes = {}));
exports.ByteList = new ssz_1.ListType({ limit: 2048, elementType: ssz_1.byteType });
exports.PingPongMessageType = new ssz_1.ContainerType({
    fields: {
        enrSeq: new ssz_1.BigIntUintType({ byteLength: 8 }),
        customPayload: exports.ByteList
    }
});
exports.PortalWireMessageType = new ssz_1.UnionType({ types: [exports.PingPongMessageType] });
exports.StateNetworkCustomDataType = new ssz_1.ContainerType({
    fields: {
        dataRadius: new ssz_1.BigIntUintType({ byteLength: 32 })
    }
});
exports.FindNodesMessageType = new ssz_1.ContainerType({
    fields: {
        distances: new ssz_1.ListType({ elementType: new ssz_1.NumberUintType({ byteLength: 2 }), limit: 256 })
    }
});
exports.NodesMessageType = new ssz_1.ContainerType({
    fields: {
        total: ssz_1.byteType,
        enrs: new ssz_1.ListType({ elementType: exports.ByteList, limit: 32 })
    }
});
