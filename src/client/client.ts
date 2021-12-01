import { Discv5, ENR, IDiscv5CreateOptions } from "@chainsafe/discv5";
import { ITalkReqMessage, ITalkRespMessage } from "@chainsafe/discv5/lib/message";
import { EventEmitter } from 'events'

import debug from 'debug'
import { StateNetworkCustomDataType, MessageCodes, SubNetworkIds, FindNodesMessageType, FindNodesMessage, NodesMessageType, NodesMessage, PortalWireMessageType, OfferMessageType, FindContentMessageType, FindContentMessage, ContentMessageType, enrs, OfferMessage, AcceptMessage } from "../wire";
import { fromHexString, toHexString, Union } from "@chainsafe/ssz";
import { StateNetworkRoutingTable } from "..";
import { shortId } from "../util";
import { bufferToPacket, PacketType, UtpProtocol } from '../wire/utp'

const _log = debug("portalnetwork")


export class PortalNetwork extends EventEmitter {
    client: Discv5;
    stateNetworkRoutingTable: StateNetworkRoutingTable;
    uTP: UtpProtocol;
    
    constructor(config: IDiscv5CreateOptions) {
        super();
        this.client = Discv5.create(config)
        this.stateNetworkRoutingTable = new StateNetworkRoutingTable(this.client.enr.nodeId, 5)
        this.client.on("talkReqReceived", this.onTalkReq)
        this.client.on("talkRespReceived", this.onTalkResp)
        this.uTP = new UtpProtocol(this.client);
    }
    
    log = (msg: any ) => {
        _log(msg)
        typeof msg === 'string'
        ? this.emit("log", msg)
        : this.emit("log", `Payload: SSZ Union<${Object.entries(msg).map(([k,v]) => {return `${k}: ${v}`}).toString()}>`)
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
    public enableLog = (namespaces: string = "portalnetwork*,discv5:service*,<uTP>*") => {
        debug.enable(namespaces)
    }

    /**
     * 
     * Sends a Portal Network Wire Protocol PING message to a specified node
     * @param dstId the nodeId of the peer to send a ping to
     */
    public sendPing = (dstId: string) => {
        const payload = StateNetworkCustomDataType.serialize({ dataRadius: BigInt(1) })
        const pingMsg = PortalWireMessageType.serialize({
            selector: MessageCodes.PING, value: {
            enrSeq: this.client.enr.seq,
            customPayload: payload
            }
        })
        this.client.sendTalkReq(dstId, Buffer.from(pingMsg), fromHexString(SubNetworkIds.StateNetworkId))
            .then((res) => {
                if (parseInt(res.slice(0, 1).toString('hex')) === MessageCodes.PONG) {
                    this.log(`Received PONG from ${shortId(dstId)}`)
                    const decoded = PortalWireMessageType.deserialize(res)
                    this.log(decoded)
                } else {
                    this.log(`Received invalid response from ${shortId(dstId)} to PING request`)
                }
            })
            .catch((err) => {
                this.log(`Error during PING request to ${shortId(dstId)}: ${err.toString()}`)
            })
        this.log(`Sending PING to ${shortId(dstId)} for ${SubNetworkIds.StateNetworkId} subnetwork`)
    }

    /**
     * Sends a Portal Network Wire Protocol FINDNODES request to a peer requesting other node ENRs
     * @param dstId node id of peer
     * @param distances distances as defined by subnetwork for node ENRs being requested
     */
    public sendFindNodes = (dstId: string, distances: Uint16Array) => {
        const findNodesMsg: FindNodesMessage = { distances: distances }
        const payload = PortalWireMessageType.serialize({ selector: MessageCodes.FINDNODES, value: findNodesMsg })
        this.client.sendTalkReq(dstId, Buffer.from(payload), fromHexString(SubNetworkIds.StateNetworkId))
            .then(res => {
                if (parseInt(res.slice(0, 1).toString('hex')) === MessageCodes.NODES) {
                    this.log(`Received NODES from ${shortId(dstId)}`);
                    const decoded = PortalWireMessageType.deserialize(res);
                    const msg = decoded.value as NodesMessage;
                    this.log(`Received ${msg.total} ENRs from ${shortId(dstId)}`);
                    if (msg.total > 0) {
                        this.log(ENR.decode(Buffer.from(msg.enrs[0])).nodeId)
                    }
                }
            })
        this.log(`Sending FINDNODES to ${shortId(dstId)} for ${SubNetworkIds.StateNetworkId} subnetwork`)
    }

    public sendFindContent = (dstId: string, key: Uint8Array) => {
        const findContentMsg: FindContentMessage = { contentKey: key };
        const payload = PortalWireMessageType.serialize({ selector: MessageCodes.FINDCONTENT, value: findContentMsg });
        this.client.sendTalkReq(dstId, Buffer.from(payload), fromHexString(SubNetworkIds.StateNetworkId))
            .then(res => {
                if (parseInt(res.slice(0, 1).toString('hex')) === MessageCodes.CONTENT) {
                    this.log(`Received FOUNDCONTENT from ${shortId(dstId)}`);
                    // TODO: Switch this to use PortalWireMessageType.deserialize if type inference can be worked out
                    const decoded = ContentMessageType.deserialize(res.slice(1))
                    this.log(decoded)
                }
            })
        this.log(`Sending FINDCONTENT to ${shortId(dstId)} for ${SubNetworkIds.StateNetworkId} subnetwork`)
    }

    public sendOffer = (dstId: string, contentKeys: Uint8Array[]) => {
        const offerMsg: OfferMessage = {
            contentKeys
        }
        const payload = PortalWireMessageType.serialize({ selector: MessageCodes.OFFER, value: offerMsg })
        this.client.sendTalkReq(dstId, Buffer.from(payload), fromHexString(SubNetworkIds.StateNetworkId))
            .then(async (res) => {
                const decoded = PortalWireMessageType.deserialize(res);
                if (decoded.selector === MessageCodes.ACCEPT) {
                    this.log(`Received ACCEPT message from ${shortId(dstId)}`);
                    this.log(decoded.value);
                    // TODO: Add code to initiate uTP streams with serving of requested content
                    await this.sendUtpStreamRequest(dstId)
                }
            })
        }
        
    public sendUtpStreamRequest = async (dstId: string) => {
            // Initiate a uTP stream request with a SYN packet
            await this.uTP.initiateSyn(dstId)
    }

    private sendPong = async (srcId: string, reqId: bigint) => {
        const customPayload = StateNetworkCustomDataType.serialize({ dataRadius: BigInt(1) })
        const payload = {
            enrSeq: this.client.enr.seq,
            customPayload: customPayload
        }
        const pongMsg = PortalWireMessageType.serialize({
            selector: MessageCodes.PONG,
            value: payload
        })
        this.client.sendTalkResp(srcId, reqId, Buffer.from(pongMsg))
        const peerENR = this.client.getKadValue(srcId);
    }

    private onTalkReq = async (srcId: string, sourceId: ENR | null, message: ITalkReqMessage) => {
        switch (toHexString(message.protocol)) {
            case SubNetworkIds.StateNetworkId: this.log(`Received State Subnetwork request`); break;
            case SubNetworkIds.UTPNetworkId: this.log(`Received uTP packet`); this.handleUTPStreamRequest(srcId, message); return;
            default: this.log(`Received TALKREQ message on unsupported protocol ${toHexString(message.protocol)}`); return;

        }

        const messageType = message.request[0];
        this.log(`TALKREQUEST message received from ${srcId}`)
        switch (messageType) {
            case MessageCodes.PING: this.handlePing(srcId, message); break;
            case MessageCodes.PONG: this.log(`PONG message not expected in TALKREQ`); break;
            case MessageCodes.FINDNODES: this.handleFindNodes(srcId, message); break;
            case MessageCodes.NODES: this.log(`NODES message not expected in TALKREQ`); break;
            case MessageCodes.FINDCONTENT: this.handleFindContent(srcId, message); break;
            case MessageCodes.CONTENT: this.log(`CONTENT message not expected in TALKREQ`); break;
            case MessageCodes.OFFER: this.handleOffer(srcId, message); break;
            case MessageCodes.ACCEPT: this.log(`ACCEPT message not expected in TALKREQ`); break;
            default: this.log(`Unrecognized message type received`)
        }
    }

    private onTalkResp = (srcId: string, sourceId: ENR | null, message: ITalkRespMessage) => {
        this.log(`TALKRESPONSE message received from ${srcId}, ${message.toString()}`)
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
        const decoded = PortalWireMessageType.deserialize(message.request)
        this.log(`Received FINDNODES request from ${shortId(srcId)}`)
        this.log(decoded)
        const payload = decoded.value as FindNodesMessage;
        if (payload.distances.length > 0) {
            let nodesPayload: NodesMessage = {
                total: 0,
                enrs: []
            };
            // Send the client's ENR if a node at distance 0 is requested
            if (typeof payload.distances.find((res) => res === 0) === 'number')
                nodesPayload = {
                    total: 1,
                    enrs: [this.client.enr.encode()]
                }
            // TODO: Return known nodes in State Network DHT at specified distances
            const encodedPayload = PortalWireMessageType.serialize({ selector: MessageCodes.NODES, value: nodesPayload })
            this.client.sendTalkResp(srcId, message.id, encodedPayload);
        } else {
            this.client.sendTalkResp(srcId, message.id, Buffer.from([]))
        }

    }

    private handleOffer = async (srcId: string, message: ITalkReqMessage) => {
        const decoded = PortalWireMessageType.deserialize(message.request)
        this.log(`Received OFFER request from ${shortId(srcId)}`)
        this.log(decoded)
        const msg = decoded.value as OfferMessage;
        if (msg.contentKeys.length > 0) {
            await this.sendAccept(srcId, message)
        } else {
            this.client.sendTalkResp(srcId, message.id, Buffer.from([]))
        }
    }
    
    private sendAccept = async (srcId: string, message: ITalkReqMessage) => {
        const connectionId = await this.uTP.initiateSyn(srcId);
        const payload: AcceptMessage = {
            connectionId: new Uint8Array(2).fill(connectionId),
            contentKeys: [true]
        }
        const encodedPayload = PortalWireMessageType.serialize({ selector: MessageCodes.ACCEPT, value: payload });
        this.client.sendTalkResp(srcId, message.id, Buffer.from(encodedPayload))
        

    }

    private handleFindContent = (srcId: string, message: ITalkReqMessage) => {
        const decoded = PortalWireMessageType.deserialize(message.request)
        this.log(`Received FINDCONTENT request from ${shortId(srcId)}`)
        this.log(decoded)
        // Sends the node's ENR as the CONTENT response (dummy data to verify the union serialization is working)
        const msg: enrs = [this.client.enr.encode()]
        // TODO: Switch this line to use PortalWireMessageType.serialize
        const payload = ContentMessageType.serialize({ selector: 2, value: msg })
        this.client.sendTalkResp(srcId, message.id, Buffer.concat([Buffer.from([MessageCodes.CONTENT]), Buffer.from(payload)]))
    }

    private handleUTPStreamRequest = async (srcId: string, message: ITalkReqMessage) => {

        const packet = bufferToPacket(message.request)
        switch (packet.header.pType) {

            case PacketType.ST_SYN: await this.uTP.handleIncomingSyn(packet, srcId); break;
            case PacketType.ST_DATA: await this.uTP.handleIncomingData(packet, srcId); break;
            case PacketType.ST_STATE: this.log('got STATE packet'); break;
            case PacketType.ST_RESET: this.log('got RESET packet'); break;
            case PacketType.ST_FIN: await this.uTP.handleFin(packet, srcId); this.log('got FIN packet'); break;
        }
    }

}

