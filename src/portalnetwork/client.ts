import { Discv5, ENR, IDiscv5CreateOptions } from "@chainsafe/discv5";
import { ITalkReqMessage, ITalkRespMessage, MessageType } from "@chainsafe/discv5/lib/message";
import { EventEmitter } from 'events'

import debug from 'debug'
import { PingPongMessageType, StateNetworkCustomDataType, MessageCodes, SubNetworkIds, PingMessage, FindNodesMessageType, FindNodesMessage, NodesMessageType, NodesMessage, PortalWireMessageType, OfferMessageType, FindContentMessageType, FindContentMessage, ContentMessageType, } from "../wire";
import { fromHexString, toHexString } from "@chainsafe/ssz";
import { StateNetworkRoutingTable } from "..";
import { shortId } from "../util";

const log = debug("portalnetwork")

export class PortalNetwork extends EventEmitter {
    client: Discv5;
    stateNetworkRoutingTable: StateNetworkRoutingTable;

    constructor(config: IDiscv5CreateOptions) {
        super();
        this.client = Discv5.create(config)
        this.stateNetworkRoutingTable = new StateNetworkRoutingTable(this.client.enr.nodeId, 5)
        this.client.on("talkReqReceived", this.onTalkReq)
        this.client.on("talkRespReceived", this.onTalkResp)
    }

    /**
     * Starts the portal network client
     */
    public start = async () => {
        await this.client.start()
    }

    /**
     * 
     * @param namespaces comma separated list of logging namespaces
     * defaults to "portalnetwork*, discv5*"
     */
    public enableLog = (namespaces: string = "portalnetwork*,discv5*") => {
        debug.enable(namespaces)
    }

    /**
     * 
     * Sends a Portal Network Wire Protocol PING message to a specified node
     * @param dstId the nodeId of the peer to send a ping to
     */
    public sendPing = (dstId: string) => {
        const payload = StateNetworkCustomDataType.serialize({ dataRadius: BigInt(1) })
        const pingMsg = PingPongMessageType.serialize({
            enrSeq: this.client.enr.seq,
            customPayload: payload
        })
        this.client.sendTalkReq(dstId, Buffer.concat([Buffer.from([MessageCodes.PING]), Buffer.from(pingMsg)]), fromHexString(SubNetworkIds.StateNetworkId))
            .then((res) => {
                if (parseInt(res.slice(0, 1).toString('hex')) === MessageCodes.PONG) {
                    log(`Received PONG from ${shortId(dstId)}`)
                    const decoded = PingPongMessageType.deserialize(res.slice(1))
                    log(decoded)
                } else {
                    log(`Received invalid response from ${shortId(dstId)} to PING request`)
                }
            })
            .catch((err) => {
                log(`Error during PING request to ${shortId(dstId)}: ${err.toString()}`)
            })
        log(`Sending PING to ${shortId(dstId)} for ${SubNetworkIds.StateNetworkId} subnetwork`)
    }

    /**
     * Sends a Portal Network Wire Protocol FINDNODES request to a peer requesting other node ENRs
     * @param dstId node id of peer
     * @param distances distances as defined by subnetwork for node ENRs being requested
     */
    public sendFindNodes = (dstId: string, distances: Uint16Array) => {
        const findNodesMsg: FindNodesMessage = { distances: distances }
        const payload = FindNodesMessageType.serialize(findNodesMsg)
        this.client.sendTalkReq(dstId, Buffer.concat([Buffer.from([MessageCodes.FINDNODES]), Buffer.from(payload)]), fromHexString(SubNetworkIds.StateNetworkId))
            .then(res => {
                if (parseInt(res.slice(0, 1).toString('hex')) === MessageCodes.NODES) {
                    log(`Received NODES from ${shortId(dstId)}`);
                    const decoded = NodesMessageType.deserialize(res.slice(1)) as NodesMessage
                    log(`Received ${decoded.total} ENRs from ${shortId(dstId)}`);
                    if (decoded.total > 0) {
                        log(ENR.decode(Buffer.from(decoded.enrs[0])).nodeId)
                    }
                }
            })
        log(`Sending FINDNODES to ${shortId(dstId)} for ${SubNetworkIds.StateNetworkId} subnetwork`)
    }

    public sendFindContent(dstId: string, key: Uint8Array) {
        const findContentMsg: FindContentMessage = { contentKey: key };
        const payload = FindContentMessageType.serialize(findContentMsg);
        this.client.sendTalkReq(dstId, Buffer.concat([Buffer.from([MessageCodes.FINDCONTENT]), Buffer.from(payload)]), fromHexString(SubNetworkIds.StateNetworkId))
            .then(res => {
                if (parseInt(res.slice(0, 1).toString('hex')) === MessageCodes.CONTENT) {
                    log(`Received FOUNDCONTENT from ${shortId(dstId)}`);
                    log(res)
                    const decoded = ContentMessageType.deserialize(res.slice(1))
                    log(decoded)
                }
            })
        log(`Sending FINDCONTENT to ${shortId(dstId)} for ${SubNetworkIds.StateNetworkId} subnetwork`)
    }
    private sendPong = async (srcId: string, reqId: bigint) => {
        const payload = StateNetworkCustomDataType.serialize({ dataRadius: BigInt(1) })
        const pongMsg = PingPongMessageType.serialize({
            enrSeq: this.client.enr.seq,
            customPayload: payload
        })
        log('PONG payload ', Buffer.concat([Buffer.from([MessageCodes.PONG]), Buffer.from(pongMsg)]))
        this.client.sendTalkResp(srcId, reqId, Buffer.concat([Buffer.from([MessageCodes.PONG]), Buffer.from(pongMsg)]))
        const peerENR = this.client.getKadValue(srcId);
    }

    private onTalkReq = async (srcId: string, sourceId: ENR | null, message: ITalkReqMessage) => {
        switch (toHexString(message.protocol)) {
            case SubNetworkIds.StateNetworkId: log(`Received State Subnetwork request`); break;
            default: log(`Received TALKREQ message on unsupported protocol ${toHexString(message.protocol)}`); return;
        }
        const messageType = message.request[0];
        log(`TALKREQUEST message received from ${srcId}`)
        switch (messageType) {
            case MessageCodes.PING: this.handlePing(srcId, message); break;
            case MessageCodes.PONG: log(`PONG message not expected in TALKREQ`); break;
            case MessageCodes.FINDNODES: this.handleFindNodes(srcId, message); break;
            case MessageCodes.NODES: log(`NODES message not expected in TALKREQ`); break;
            case MessageCodes.FINDCONTENT: this.handleFindContent(srcId, message); break;
            case MessageCodes.CONTENT: log(`CONTENT message not expected in TALKREQ`); break;
            case MessageCodes.OFFER: this.handleOffer(srcId, message); break;
            case MessageCodes.ACCEPT: log(`ACCEPT message not expected in TALKREQ`); break;
            default: log(`Unrecognized message type received`)
        }
    }

    private onTalkResp = (srcId: string, sourceId: ENR | null, message: ITalkRespMessage) => {
        log(`TALKRESPONSE message received from ${srcId}, ${message.toString()}`)
    }

    private handlePing = (srcId: string, message: ITalkReqMessage) => {
        // Check to see if node is already in state network routing table and add if not
        if (!this.stateNetworkRoutingTable.getValue(srcId)) {
            const enr = this.client.getKadValue(srcId);
            if (enr) {
                this.stateNetworkRoutingTable.add(enr);
            }
        }
        this.sendPong(srcId, message.id);
    }

    private handleFindNodes = (srcId: string, message: ITalkReqMessage) => {
        const decoded = FindNodesMessageType.deserialize(message.request.slice(1))
        log(`Received FINDNODES request from ${shortId(srcId)}`)
        log(decoded)
        this.client.sendTalkReq(srcId, Buffer.from([]), message.protocol)
    }

    private handleOffer = (srcId: string, message: ITalkReqMessage) => {
        const decoded = OfferMessageType.deserialize(message.request.slice(1))
        log(`Received OFFER request from ${shortId(srcId)}`)
        log(decoded)
        this.client.sendTalkReq(srcId, Buffer.from([]), message.protocol)
    }

    private handleFindContent = (srcId: string, message: ITalkReqMessage) => {
        const decoded = FindContentMessageType.deserialize(message.request.slice(1))
        log(`Received FINDCONTENT request from ${shortId(srcId)}`)
        log(decoded)
        this.client.sendTalkResp(srcId, message.id, Buffer.from([6, 0, 1, 2]))
    }
}
