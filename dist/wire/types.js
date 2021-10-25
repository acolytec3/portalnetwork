import {
  ContainerType,
  BigIntUintType,
  UnionType,
  ListType,
  byteType,
  NumberUintType,
  ByteVectorType,
} from "@chainsafe/ssz";
import { List } from "@chakra-ui/layout";
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
  MessageCodes[(MessageCodes["PING"] = 1)] = "PING";
  MessageCodes[(MessageCodes["PONG"] = 2)] = "PONG";
  MessageCodes[(MessageCodes["FINDNODES"] = 3)] = "FINDNODES";
  MessageCodes[(MessageCodes["NODES"] = 4)] = "NODES";
  MessageCodes[(MessageCodes["FINDCONTENT"] = 5)] = "FINDCONTENT";
  MessageCodes[(MessageCodes["CONTENT"] = 6)] = "CONTENT";
  MessageCodes[(MessageCodes["OFFER"] = 7)] = "OFFER";
  MessageCodes[(MessageCodes["ACCEPT"] = 8)] = "ACCEPT";
})(MessageCodes || (MessageCodes = {}));

export const PingPongMessageType = new ContainerType({
  fields: {
    enr_seq: BigIntUintType({ byteLength: 8 }),
    custom_payload: ListType({ limit: 2048, elementType: byteType }),
  },
});
export const PortalWireMessageType = new UnionType({
  types: [PingPongMessageType],
});
export const StateNetworkCustomDataType = new ContainerType({
  fields: {
    data_radius: BigIntUintType({ byteLength: 32 }),
  },
});
export const FindNodesMessageType = new ContainerType({
  fields: {
    distances: ListType({
      limit: 256,
      elementType: NumberUintType({ byteLength: 2 }),
    }),
  },
});

// ByteType alias for Uint8

export const ByteType = new NumberUintType({ byteLength: 1 });

// ByteList alias for List[byte, limit=2048]

export const ByteListType = new ListType({
  elementType: ByteType,
  limit: 2048,
});

// Response message to FindNodes(0x03).

// total: The total number of Nodes response messages being sent.
// enrs: List of byte strings, each of which is an RLP encoded ENR record.

export const FindNodesMessageResponseType = new ContainerType({
  fields: {
    total: NumberUintType({ byteLength: 1 }),
    enrs: ListType({
      elementType: ListType({ elementType: ByteListType, limit: 32 }),
    }),
  },
});

// Request message to get the content with content_key, or, in case the recipient does not have the data,
// a list of ENR records of nodes that are closer than the recipient is to the requested content.

// content_key: The key for the content being requested. The encoding of content_key is specified per the network.

export const FindContentRequestMessage = new ContainerType({
  fields: {
    contentKey: ByteListType,
  },
});

// Response message to Find Content (0x05).

// This message can contain either a uTP connection ID, a list of ENRs or the requested content.

export const Bytes2 = new ByteVectorType({ elementType: ByteType, length: 2 });


// connection_id: Connection ID to set up a uTP stream to transmit the requested data.
// enrs: List of byte strings, each of which is an RLP encoded ENR record.
// content: byte string of the requested content.

export const FindContentResponseMessage = new UnionType({
  types: {
    connectionId: Bytes2,
    content: ByteListType,
    enrs: ListType({ elementType: ByteListType, limit: 32 }),
  },
});
