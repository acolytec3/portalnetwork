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
const utp_1 = require("../wire/utp");
const _log = (0, debug_1.default)("portalnetwork");
class PortalNetwork extends events_1.EventEmitter {
    client;
    stateNetworkRoutingTable;
    uTP;
    constructor(config) {
        super();
        this.client = discv5_1.Discv5.create(config);
        this.stateNetworkRoutingTable = new __1.StateNetworkRoutingTable(this.client.enr.nodeId, 5);
        this.client.on("talkReqReceived", this.onTalkReq);
        this.client.on("talkRespReceived", this.onTalkResp);
        this.uTP = new utp_1.UtpProtocol(this.client);
    }
    log = (msg) => {
        _log(msg);
        typeof msg === 'string'
            ? this.emit("log", msg)
            : this.emit("log", `Payload: SSZ Union<${Object.entries(msg).map(([k, v]) => { return `${k}: ${v}`; }).toString()}>`);
    };
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
    enableLog = (namespaces = "portalnetwork*,discv5:service*,<uTP>*") => {
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
                this.log(`Received PONG from ${(0, util_1.shortId)(dstId)}`);
                const decoded = wire_1.PortalWireMessageType.deserialize(res);
                this.log(decoded);
            }
            else {
                this.log(`Received invalid response from ${(0, util_1.shortId)(dstId)} to PING request`);
            }
        })
            .catch((err) => {
            this.log(`Error during PING request to ${(0, util_1.shortId)(dstId)}: ${err.toString()}`);
        });
        this.log(`Sending PING to ${(0, util_1.shortId)(dstId)} for ${wire_1.SubNetworkIds.StateNetworkId} subnetwork`);
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
                this.log(`Received NODES from ${(0, util_1.shortId)(dstId)}`);
                const decoded = wire_1.PortalWireMessageType.deserialize(res);
                const msg = decoded.value;
                this.log(`Received ${msg.total} ENRs from ${(0, util_1.shortId)(dstId)}`);
                if (msg.total > 0) {
                    this.log(discv5_1.ENR.decode(Buffer.from(msg.enrs[0])).nodeId);
                }
            }
        });
        this.log(`Sending FINDNODES to ${(0, util_1.shortId)(dstId)} for ${wire_1.SubNetworkIds.StateNetworkId} subnetwork`);
    };
    sendFindContent = (dstId, key) => {
        const findContentMsg = { contentKey: key };
        const payload = wire_1.PortalWireMessageType.serialize({ selector: wire_1.MessageCodes.FINDCONTENT, value: findContentMsg });
        this.client.sendTalkReq(dstId, Buffer.from(payload), (0, ssz_1.fromHexString)(wire_1.SubNetworkIds.StateNetworkId))
            .then(res => {
            if (parseInt(res.slice(0, 1).toString('hex')) === wire_1.MessageCodes.CONTENT) {
                this.log(`Received FOUNDCONTENT from ${(0, util_1.shortId)(dstId)}`);
                // TODO: Switch this to use PortalWireMessageType.deserialize if type inference can be worked out
                const decoded = wire_1.ContentMessageType.deserialize(res.slice(1));
                this.log(decoded);
            }
        });
        this.log(`Sending FINDCONTENT to ${(0, util_1.shortId)(dstId)} for ${wire_1.SubNetworkIds.StateNetworkId} subnetwork`);
    };
    sendOffer = (dstId, contentKeys) => {
        const offerMsg = {
            contentKeys
        };
        const payload = wire_1.PortalWireMessageType.serialize({ selector: wire_1.MessageCodes.OFFER, value: offerMsg });
        this.client.sendTalkReq(dstId, Buffer.from(payload), (0, ssz_1.fromHexString)(wire_1.SubNetworkIds.StateNetworkId))
            .then(async (res) => {
            const decoded = wire_1.PortalWireMessageType.deserialize(res);
            if (decoded.selector === wire_1.MessageCodes.ACCEPT) {
                this.log(`Received ACCEPT message from ${(0, util_1.shortId)(dstId)}`);
                this.log(decoded.value);
                // TODO: Add code to initiate uTP streams with serving of requested content
                await this.sendUtpStreamRequest(dstId);
            }
        });
    };
    sendUtpStreamRequest = async (dstId) => {
        // Initiate a uTP stream request with a SYN packet
        await this.uTP.initiateSyn(dstId);
    };
    sendPong = async (srcId, reqId) => {
        const customPayload = wire_1.StateNetworkCustomDataType.serialize({ dataRadius: BigInt(1) });
        const payload = {
            enrSeq: this.client.enr.seq,
            customPayload: customPayload
        };
        const pongMsg = wire_1.PortalWireMessageType.serialize({
            selector: wire_1.MessageCodes.PONG,
            value: payload
        });
        this.client.sendTalkResp(srcId, reqId, Buffer.from(pongMsg));
        const peerENR = this.client.getKadValue(srcId);
    };
    onTalkReq = async (srcId, sourceId, message) => {
        switch ((0, ssz_1.toHexString)(message.protocol)) {
            case wire_1.SubNetworkIds.StateNetworkId:
                this.log(`Received State Subnetwork request`);
                break;
            case wire_1.SubNetworkIds.UTPNetworkId:
                this.log(`Received uTP packet`);
                this.handleUTPStreamRequest(srcId, message);
                return;
            default:
                this.log(`Received TALKREQ message on unsupported protocol ${(0, ssz_1.toHexString)(message.protocol)}`);
                return;
        }
        const messageType = message.request[0];
        this.log(`TALKREQUEST message received from ${srcId}`);
        switch (messageType) {
            case wire_1.MessageCodes.PING:
                this.handlePing(srcId, message);
                break;
            case wire_1.MessageCodes.PONG:
                this.log(`PONG message not expected in TALKREQ`);
                break;
            case wire_1.MessageCodes.FINDNODES:
                this.handleFindNodes(srcId, message);
                break;
            case wire_1.MessageCodes.NODES:
                this.log(`NODES message not expected in TALKREQ`);
                break;
            case wire_1.MessageCodes.FINDCONTENT:
                this.handleFindContent(srcId, message);
                break;
            case wire_1.MessageCodes.CONTENT:
                this.log(`CONTENT message not expected in TALKREQ`);
                break;
            case wire_1.MessageCodes.OFFER:
                this.handleOffer(srcId, message);
                break;
            case wire_1.MessageCodes.ACCEPT:
                this.log(`ACCEPT message not expected in TALKREQ`);
                break;
            default: this.log(`Unrecognized message type received`);
        }
    };
    onTalkResp = (srcId, sourceId, message) => {
        this.log(`TALKRESPONSE message received from ${srcId}, ${message.toString()}`);
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
        const decoded = wire_1.PortalWireMessageType.deserialize(message.request);
        this.log(`Received FINDNODES request from ${(0, util_1.shortId)(srcId)}`);
        this.log(decoded);
        const payload = decoded.value;
        if (payload.distances.length > 0) {
            let nodesPayload = {
                total: 0,
                enrs: []
            };
            // Send the client's ENR if a node at distance 0 is requested
            if (typeof payload.distances.find((res) => res === 0) === 'number')
                nodesPayload = {
                    total: 1,
                    enrs: [this.client.enr.encode()]
                };
            // TODO: Return known nodes in State Network DHT at specified distances
            const encodedPayload = wire_1.PortalWireMessageType.serialize({ selector: wire_1.MessageCodes.NODES, value: nodesPayload });
            this.client.sendTalkResp(srcId, message.id, encodedPayload);
        }
        else {
            this.client.sendTalkResp(srcId, message.id, Buffer.from([]));
        }
    };
    handleOffer = async (srcId, message) => {
        const decoded = wire_1.PortalWireMessageType.deserialize(message.request);
        this.log(`Received OFFER request from ${(0, util_1.shortId)(srcId)}`);
        this.log(decoded);
        const msg = decoded.value;
        if (msg.contentKeys.length > 0) {
            await this.sendAccept(srcId, message);
        }
        else {
            this.client.sendTalkResp(srcId, message.id, Buffer.from([]));
        }
    };
    sendAccept = async (srcId, message) => {
        const connectionId = await this.uTP.initiateSyn(srcId);
        const payload = {
            connectionId: new Uint8Array(2).fill(connectionId),
            contentKeys: [true]
        };
        const encodedPayload = wire_1.PortalWireMessageType.serialize({ selector: wire_1.MessageCodes.ACCEPT, value: payload });
        this.client.sendTalkResp(srcId, message.id, Buffer.from(encodedPayload));
    };
    handleFindContent = (srcId, message) => {
        const decoded = wire_1.PortalWireMessageType.deserialize(message.request);
        this.log(`Received FINDCONTENT request from ${(0, util_1.shortId)(srcId)}`);
        this.log(decoded);
        // Sends the node's ENR as the CONTENT response (dummy data to verify the union serialization is working)
        const msg = [this.client.enr.encode()];
        // TODO: Switch this line to use PortalWireMessageType.serialize
        const payload = wire_1.ContentMessageType.serialize({ selector: 2, value: msg });
        this.client.sendTalkResp(srcId, message.id, Buffer.concat([Buffer.from([wire_1.MessageCodes.CONTENT]), Buffer.from(payload)]));
    };
    handleUTPStreamRequest = async (srcId, message) => {
        const packet = (0, utp_1.bufferToPacket)(message.request);
        switch (packet.header.pType) {
            case utp_1.PacketType.ST_SYN:
                await this.uTP.handleIncomingSyn(packet, srcId);
                break;
            case utp_1.PacketType.ST_DATA:
                await this.uTP.handleIncomingData(packet, srcId);
                break;
            case utp_1.PacketType.ST_STATE:
                this.log('got STATE packet');
                break;
            case utp_1.PacketType.ST_RESET:
                this.log('got RESET packet');
                break;
            case utp_1.PacketType.ST_FIN:
                await this.uTP.handleFin(packet, srcId);
                this.log('got FIN packet');
                break;
        }
    };
}
exports.PortalNetwork = PortalNetwork;
