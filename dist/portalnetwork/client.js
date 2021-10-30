import { Discv5, ENR } from "@chainsafe/discv5";
import { MessageType } from "@chainsafe/discv5/lib/message";
import { EventEmitter } from 'events';
import debug from 'debug';
import { PingPongMessageType, StateNetworkCustomDataType, MessageCodes, SubNetworkIds, FindNodesMessageType, NodesMessageType, } from "../wire/types";
import { fromHexString, toHexString } from "@chainsafe/ssz";
import { StateNetworkRoutingTable } from "..";
import { shortId } from "../util";
const log = debug("portalnetwork");
export class PortalNetwork extends EventEmitter {
    client;
    stateNetworkRoutingTable;
    constructor(config) {
        super();
        this.client = Discv5.create(config);
        this.stateNetworkRoutingTable = new StateNetworkRoutingTable(this.client.enr.nodeId, 5);
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
        debug.enable(namespaces);
    };
    /**
     *
     * Sends a Portal Network Wire Protocol PING message to a specified node
     * @param dstId the nodeId of the peer to send a ping to
     */
    sendPing = (dstId) => {
        const payload = StateNetworkCustomDataType.serialize({ dataRadius: BigInt(1) });
        const pingMsg = PingPongMessageType.serialize({
            enrSeq: this.client.enr.seq,
            customPayload: payload
        });
        this.client.sendTalkReq(dstId, Buffer.concat([Buffer.from([MessageCodes.PING]), Buffer.from(pingMsg)]), fromHexString(SubNetworkIds.StateNetworkId))
            .then((res) => {
            if (parseInt(res.slice(0, 1).toString('hex')) === MessageCodes.PONG) {
                log(`Received PONG from ${shortId(dstId)}`);
                const decoded = PingPongMessageType.deserialize(res.slice(1));
                log(decoded);
            }
            else {
                log(`Received invalid response from ${shortId(dstId)} to PING request`);
            }
        })
            .catch((err) => {
            log(`Error during PING request to ${shortId(dstId)}: ${err.toString()}`);
        });
        log(`Sending PING to ${shortId(dstId)} for ${SubNetworkIds.StateNetworkId} subnetwork`);
    };
    sendFindNodes = (dstId, distances) => {
        const findNodesMsg = { distances: distances };
        const payload = FindNodesMessageType.serialize(findNodesMsg);
        this.client.sendTalkReq(dstId, Buffer.concat([Buffer.from([MessageCodes.FINDNODES]), Buffer.from(payload)]), fromHexString(SubNetworkIds.StateNetworkId))
            .then(res => {
            if (parseInt(res.slice(0, 1).toString('hex')) === MessageCodes.NODES) {
                log(`Received NODES from ${shortId(dstId)}`);
                const decoded = NodesMessageType.deserialize(res.slice(1));
                log(`Received ${decoded.total} ENRs from ${shortId(dstId)}`);
                if (decoded.total > 0) {
                    console.log(ENR.decode(Buffer.from(decoded.enrs[0])).nodeId);
                }
            }
        });
    };
    sendPong = async (srcId, reqId) => {
        const payload = StateNetworkCustomDataType.serialize({ data_radius: BigInt(1) });
        const pongMsg = PingPongMessageType.serialize({
            enr_seq: this.client.enr.seq,
            custom_payload: payload
        });
        log('PONG payload ', Buffer.concat([Buffer.from([MessageCodes.PONG]), Buffer.from(pongMsg)]));
        this.client.sendTalkResp(srcId, reqId, Buffer.concat([Buffer.from([MessageCodes.PONG]), Buffer.from(pongMsg)]));
        const peerENR = this.client.getKadValue(srcId);
    };
    onTalkReq = async (srcId, sourceId, message) => {
        switch (toHexString(message.protocol)) {
            case SubNetworkIds.StateNetworkId:
                log(`Received State Subnetwork request`);
                break;
            default:
                log(`Received TALKREQ message on unsupported protocol ${toHexString(message.protocol)}`);
                return;
        }
        const decoded = this.decodeMessage(message);
        log(`TALKREQUEST message received from ${srcId}`);
        switch (decoded.type) {
            case MessageCodes.PING:
                this.handlePing(srcId, message);
                break;
            case MessageCodes.PONG:
                log(`PONG message not expected in TALKREQ`);
                break;
            case MessageCodes.FINDNODES:
                this.handleFindNodes(decoded.body);
                break;
            case MessageCodes.NODES:
                log(`NODES message not expected in TALKREQ`);
                break;
            case MessageCodes.FINDCONTENT:
                this.handleFindContent(decoded.body);
                break;
            case MessageCodes.CONTENT:
                log(`CONTENT message not expected in TALKREQ`);
                break;
            case MessageCodes.OFFER:
                this.handleOffer(decoded.body);
                break;
            case MessageCodes.ACCEPT:
                log(`ACCEPT message not expected in TALKREQ`);
                break;
            default: log(`Unrecognized message type received`);
        }
    };
    onTalkResp = (srcId, sourceId, message) => {
        log(`TALKRESPONSE message received from ${srcId}, ${message.toString()}`);
    };
    decodeMessage = (message) => {
        if (message.type === MessageType.TALKREQ) {
            return {
                type: parseInt(message.request.slice(0, 1).toString('hex')),
                body: PingPongMessageType.deserialize(message.request.slice(1))
            };
        }
        else {
            return {
                type: 0,
                body: undefined
            };
        }
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
    handleFindNodes = (body) => {
        throw new Error("Method not implemented.");
    };
    handleOffer = (body) => {
        throw new Error("Method not implemented.");
    };
    handleFindContent = (body) => {
        throw new Error("Method not implemented.");
    };
}
