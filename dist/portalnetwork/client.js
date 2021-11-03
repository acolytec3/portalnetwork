"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortalNetwork = void 0;
const tslib_1 = require("tslib");
const discv5_1 = require("@chainsafe/discv5");
const events_1 = require("events");
const debug_1 = (0, tslib_1.__importDefault)(require("debug"));
const wire_1 = require("../wire");
const ssz_1 = require("@chainsafe/ssz");
const __1 = require("..");
const util_1 = require("../util");
const log = (0, debug_1.default)("portalnetwork");
class PortalNetwork extends events_1.EventEmitter {
    client;
    stateNetworkRoutingTable;
    constructor(config) {
        super();
        this.client = discv5_1.Discv5.create(config);
        this.stateNetworkRoutingTable = new __1.StateNetworkRoutingTable(this.client.enr.nodeId, 5);
        this.client.on("talkReqReceived", this.onTalkReq);
        this.client.on("talkRespReceived", this.onTalkResp);
    }
    /**
     * Starts the portal network client
     */
    start = async () => {
        await this.client.start();
    };
    /**
     *
     * @param namespaces comma separated list of logging namespaces
     * defaults to "portalnetwork*, discv5*"
     */
    enableLog = (namespaces = "portalnetwork*,discv5*") => {
        debug_1.default.enable(namespaces);
    };
    /**
     *
     * Sends a Portal Network Wire Protocol PING message to a specified node
     * @param dstId the nodeId of the peer to send a ping to
     */
    sendPing = (dstId) => {
        const payload = wire_1.StateNetworkCustomDataType.serialize({ dataRadius: BigInt(1) });
        const pingMsg = wire_1.PortalWireMessageType.serialize({
            selector: wire_1.MessageCodes.PING, value: {
                enrSeq: this.client.enr.seq,
                customPayload: payload
            }
        });
        this.client.sendTalkReq(dstId, Buffer.from(pingMsg), (0, ssz_1.fromHexString)(wire_1.SubNetworkIds.StateNetworkId))
            .then((res) => {
            if (parseInt(res.slice(0, 1).toString('hex')) === wire_1.MessageCodes.PONG) {
                log(`Received PONG from ${(0, util_1.shortId)(dstId)}`);
                const decoded = wire_1.PortalWireMessageType.deserialize(res);
                log(decoded);
            }
            else {
                log(`Received invalid response from ${(0, util_1.shortId)(dstId)} to PING request`);
            }
        })
            .catch((err) => {
            log(`Error during PING request to ${(0, util_1.shortId)(dstId)}: ${err.toString()}`);
        });
        log(`Sending PING to ${(0, util_1.shortId)(dstId)} for ${wire_1.SubNetworkIds.StateNetworkId} subnetwork`);
    };
    /**
     * Sends a Portal Network Wire Protocol FINDNODES request to a peer requesting other node ENRs
     * @param dstId node id of peer
     * @param distances distances as defined by subnetwork for node ENRs being requested
     */
    sendFindNodes = (dstId, distances) => {
        const findNodesMsg = { distances: distances };
        const payload = wire_1.PortalWireMessageType.serialize({ selector: wire_1.MessageCodes.FINDNODES, value: findNodesMsg });
        this.client.sendTalkReq(dstId, Buffer.from(payload), (0, ssz_1.fromHexString)(wire_1.SubNetworkIds.StateNetworkId))
            .then(res => {
            if (parseInt(res.slice(0, 1).toString('hex')) === wire_1.MessageCodes.NODES) {
                log(`Received NODES from ${(0, util_1.shortId)(dstId)}`);
                const decoded = wire_1.NodesMessageType.deserialize(res.slice(1));
                log(`Received ${decoded.total} ENRs from ${(0, util_1.shortId)(dstId)}`);
                if (decoded.total > 0) {
                    log(discv5_1.ENR.decode(Buffer.from(decoded.enrs[0])).nodeId);
                }
            }
        });
        log(`Sending FINDNODES to ${(0, util_1.shortId)(dstId)} for ${wire_1.SubNetworkIds.StateNetworkId} subnetwork`);
    };
    sendFindContent(dstId, key) {
        const findContentMsg = { contentKey: key };
        const payload = wire_1.FindContentMessageType.serialize(findContentMsg);
        this.client.sendTalkReq(dstId, Buffer.concat([Buffer.from([wire_1.MessageCodes.FINDCONTENT]), Buffer.from(payload)]), (0, ssz_1.fromHexString)(wire_1.SubNetworkIds.StateNetworkId))
            .then(res => {
            if (parseInt(res.slice(0, 1).toString('hex')) === wire_1.MessageCodes.CONTENT) {
                log(`Received FOUNDCONTENT from ${(0, util_1.shortId)(dstId)}`);
                log(res);
                const decoded = wire_1.ContentMessageType.deserialize(res.slice(1));
                log(decoded);
            }
        });
        log(`Sending FINDCONTENT to ${(0, util_1.shortId)(dstId)} for ${wire_1.SubNetworkIds.StateNetworkId} subnetwork`);
    }
    sendPong = async (srcId, reqId) => {
        const payload = wire_1.StateNetworkCustomDataType.serialize({ dataRadius: BigInt(1) });
        const pongMsg = wire_1.PortalWireMessageType.serialize({
            selector: wire_1.MessageCodes.PONG,
            value: {
                enrSeq: this.client.enr.seq,
                customPayload: payload
            }
        });
        this.client.sendTalkResp(srcId, reqId, Buffer.from(pongMsg));
        const peerENR = this.client.getKadValue(srcId);
    };
    onTalkReq = async (srcId, sourceId, message) => {
        switch ((0, ssz_1.toHexString)(message.protocol)) {
            case wire_1.SubNetworkIds.StateNetworkId:
                log(`Received State Subnetwork request`);
                break;
            default:
                log(`Received TALKREQ message on unsupported protocol ${(0, ssz_1.toHexString)(message.protocol)}`);
                return;
        }
        const messageType = message.request[0];
        log(`TALKREQUEST message received from ${srcId}`);
        switch (messageType) {
            case wire_1.MessageCodes.PING:
                this.handlePing(srcId, message);
                break;
            case wire_1.MessageCodes.PONG:
                log(`PONG message not expected in TALKREQ`);
                break;
            case wire_1.MessageCodes.FINDNODES:
                this.handleFindNodes(srcId, message);
                break;
            case wire_1.MessageCodes.NODES:
                log(`NODES message not expected in TALKREQ`);
                break;
            case wire_1.MessageCodes.FINDCONTENT:
                this.handleFindContent(srcId, message);
                break;
            case wire_1.MessageCodes.CONTENT:
                log(`CONTENT message not expected in TALKREQ`);
                break;
            case wire_1.MessageCodes.OFFER:
                this.handleOffer(srcId, message);
                break;
            case wire_1.MessageCodes.ACCEPT:
                log(`ACCEPT message not expected in TALKREQ`);
                break;
            default: log(`Unrecognized message type received`);
        }
    };
    onTalkResp = (srcId, sourceId, message) => {
        log(`TALKRESPONSE message received from ${srcId}, ${message.toString()}`);
    };
    handlePing = (srcId, message) => {
        // Check to see if node is already in state network routing table and add if not
        if (!this.stateNetworkRoutingTable.getValue(srcId)) {
            const enr = this.client.getKadValue(srcId);
            if (enr) {
                this.stateNetworkRoutingTable.add(enr);
            }
        }
        this.sendPong(srcId, message.id);
    };
    handleFindNodes = (srcId, message) => {
        const decoded = wire_1.FindNodesMessageType.deserialize(message.request.slice(1));
        log(`Received FINDNODES request from ${(0, util_1.shortId)(srcId)}`);
        log(decoded);
        this.client.sendTalkReq(srcId, Buffer.from([]), message.protocol);
    };
    handleOffer = (srcId, message) => {
        const decoded = wire_1.OfferMessageType.deserialize(message.request.slice(1));
        log(`Received OFFER request from ${(0, util_1.shortId)(srcId)}`);
        log(decoded);
        this.client.sendTalkReq(srcId, Buffer.from([]), message.protocol);
    };
    handleFindContent = (srcId, message) => {
        const decoded = wire_1.FindContentMessageType.deserialize(message.request.slice(1));
        log(`Received FINDCONTENT request from ${(0, util_1.shortId)(srcId)}`);
        log(decoded);
        // Sends the node's ENR as the CONTENT response (dummy data to verify the union serialization is working)
        const msg = [this.client.enr.encode()];
        const payload = wire_1.ContentMessageType.serialize({ selector: 2, value: msg });
        this.client.sendTalkResp(srcId, message.id, Buffer.concat([Buffer.from([wire_1.MessageCodes.CONTENT]), Buffer.from(payload)]));
    };
}
exports.PortalNetwork = PortalNetwork;
