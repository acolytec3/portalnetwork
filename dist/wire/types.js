"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortalWireMessageType = exports.AcceptMessageType = exports.OfferMessageType = exports.ContentMessageType = exports.FindContentMessageType = exports.NodesMessageType = exports.FindNodesMessageType = exports.PongMessageType = exports.PingMessageType = exports.ENRs = exports.Bytes2 = exports.ByteList = exports.MessageCodes = exports.StateNetworkCustomDataType = exports.SubNetworkIds = void 0;
const ssz_1 = require("@chainsafe/ssz");
// Subnetwork IDs
var SubNetworkIds;
(function (SubNetworkIds) {
    SubNetworkIds["StateNetworkId"] = "0x500a";
    SubNetworkIds["HistoryNetworkId"] = "0x500b";
    SubNetworkIds["TxGossipNetworkId"] = "0x500c";
    SubNetworkIds["HeaderGossipNetworkId"] = "0x500d";
    SubNetworkIds["CanonIndicesNetworkId"] = "0x500e";
    SubNetworkIds["UTPNetworkId"] = "0x757470";
})(SubNetworkIds = exports.SubNetworkIds || (exports.SubNetworkIds = {}));
// State Network Custom Data type
exports.StateNetworkCustomDataType = new ssz_1.ContainerType({
    fields: {
        dataRadius: new ssz_1.BigIntUintType({ byteLength: 32 })
    }
});
// Wire Protocol Message Codes
var MessageCodes;
(function (MessageCodes) {
    MessageCodes[MessageCodes["PING"] = 0] = "PING";
    MessageCodes[MessageCodes["PONG"] = 1] = "PONG";
    MessageCodes[MessageCodes["FINDNODES"] = 2] = "FINDNODES";
    MessageCodes[MessageCodes["NODES"] = 3] = "NODES";
    MessageCodes[MessageCodes["FINDCONTENT"] = 4] = "FINDCONTENT";
    MessageCodes[MessageCodes["CONTENT"] = 5] = "CONTENT";
    MessageCodes[MessageCodes["OFFER"] = 6] = "OFFER";
    MessageCodes[MessageCodes["ACCEPT"] = 7] = "ACCEPT";
})(MessageCodes = exports.MessageCodes || (exports.MessageCodes = {}));
// Type Aliases
exports.ByteList = new ssz_1.ListType({ limit: 2048, elementType: ssz_1.byteType });
exports.Bytes2 = new ssz_1.ByteVectorType({ length: 2 });
exports.ENRs = new ssz_1.ListType({ elementType: exports.ByteList, limit: 32 });
exports.PingMessageType = new ssz_1.ContainerType({
    fields: {
        enrSeq: new ssz_1.BigIntUintType({ byteLength: 8 }),
        customPayload: exports.ByteList
    }
});
exports.PongMessageType = new ssz_1.ContainerType({
    fields: {
        enrSeq: new ssz_1.BigIntUintType({ byteLength: 8 }),
        customPayload: exports.ByteList
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
        enrs: exports.ENRs
    }
});
exports.FindContentMessageType = new ssz_1.ContainerType({
    fields: {
        contentKey: exports.ByteList
    }
});
exports.ContentMessageType = new ssz_1.UnionType({
    types: [exports.Bytes2, exports.ByteList, exports.ENRs]
});
exports.OfferMessageType = new ssz_1.ContainerType({
    fields: {
        contentKeys: new ssz_1.ListType({ elementType: exports.ByteList, limit: 64 })
    }
});
exports.AcceptMessageType = new ssz_1.ContainerType({
    fields: {
        connectionId: exports.Bytes2,
        contentKeys: new ssz_1.BitListType({ limit: 64 })
    }
});
exports.PortalWireMessageType = new ssz_1.UnionType({ types: [exports.PingMessageType, exports.PongMessageType, exports.FindNodesMessageType, exports.NodesMessageType, exports.FindContentMessageType, exports.ContentMessageType, exports.OfferMessageType, exports.AcceptMessageType] });
