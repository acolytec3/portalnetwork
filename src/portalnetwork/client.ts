import { Discv5, ENR, fromHex, IDiscv5CreateOptions } from "@chainsafe/discv5";
import { ITalkReqMessage, ITalkRespMessage, MessageType } from "@chainsafe/discv5/lib/message";
import { EventEmitter } from 'events'

import debug from 'debug'
import { PingPongMessageType, StateNetworkCustomDataType, MessageCodes, SubNetworkIds, PingMessage, } from "../wire/types";
import { fromHexString, toHexString } from "@chainsafe/ssz";

const log = debug("portalnetwork")

type MessageProps = {
    type: Number,
    body: PingMessage | undefined
}
export class PortalNetwork extends EventEmitter {
    client: Discv5;

    constructor(config: IDiscv5CreateOptions) {
        super();
        this.client = Discv5.create(config)
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
        const payload = StateNetworkCustomDataType.serialize({ data_radius: BigInt(1) })
        const pingMsg = PingPongMessageType.serialize({
            enr_seq: this.client.enr.seq,
            custom_payload: payload
        })
        this.client.sendTalkReq(dstId, Buffer.concat([Buffer.from([MessageCodes.PING]), Buffer.from(pingMsg)]), fromHexString(SubNetworkIds.StateNetworkId))
            .then((res) => {
                if (parseInt(res.slice(0, 1).toString('hex')) === MessageCodes.PONG) {
                    log(`Received PONG from ${dstId.slice(0, 15)}...`)
                    const decoded = PingPongMessageType.deserialize(res.slice(1))
                    log(decoded)
                }
            })
            .catch((err) => {
                log(`Error during PING request to ${dstId.slice(0, 15)}...: ${err.toString()}`)
            })
        log(`Sending PING to ${dstId.slice(0, 15)}... for ${SubNetworkIds.StateNetworkId} subnetwork`)
    }

    private sendPong = async (srcId: string, reqId: bigint) => {
        const payload = StateNetworkCustomDataType.serialize({ data_radius: BigInt(1) })
        const pongMsg = PingPongMessageType.serialize({
            enr_seq: this.client.enr.seq,
            custom_payload: payload
        })
        log('PONG payload ', Buffer.concat([Buffer.from([MessageCodes.PONG]), Buffer.from(pongMsg)]))
        this.client.sendTalkResp(srcId, reqId, Buffer.concat([Buffer.from([MessageCodes.PONG]), Buffer.from(pongMsg)]))
    }

    private onTalkReq = async (srcId: string, sourceId: ENR | null, message: ITalkReqMessage) => {
        switch (toHexString(message.protocol)) {
            case SubNetworkIds.StateNetworkId: log(`Received State Subnetwork request`); break;
            default: log(`Received TALKREQ message on unsupported protocol ${toHexString(message.protocol)}`); return;
        }
        const decoded = this.decodeMessage(message)
        console.log(decoded.type)
        console.log(decoded.type === MessageCodes.PING)
        log(`TALKREQUEST message received from ${srcId}`)
        switch (decoded.type) {
            case MessageCodes.PING: this.sendPong(srcId, message.id); break;
            case MessageCodes.PONG: log(`PONG message not expected in TALKREQ`); break;
            case MessageCodes.FINDNODES: this.handleFindNodes(decoded.body); break;
            case MessageCodes.NODES: log(`NODES message not expected in TALKREQ`); break;
            case MessageCodes.FINDCONTENT: this.handleFindContent(decoded.body); break;
            case MessageCodes.CONTENT: log(`CONTENT message not expected in TALKREQ`); break;
            case MessageCodes.OFFER: this.handleOffer(decoded.body); break;
            case MessageCodes.ACCEPT: log(`ACCEPT message not expected in TALKREQ`); break;
            default: log(`Unrecognized message type received`)
        }
    }

    private onTalkResp = (srcId: string, sourceId: ENR | null, message: ITalkRespMessage) => {
        log(`TALKRESPONSE message received from ${srcId}, ${message.toString()}`)
    }

    private decodeMessage = (message: ITalkReqMessage | ITalkRespMessage): MessageProps => {
        if (message.type === MessageType.TALKREQ) {
            return {
                type: parseInt(message.request.slice(0, 1).toString('hex')),
                body: PingPongMessageType.deserialize(message.request.slice(1)) as PingMessage
            }
        } else {
            return {
                type: 0,
                body: undefined
            }
        }
    }

    private handleFindNodes = (body: any) => {
        throw new Error("Method not implemented.");
    }

    private handleOffer = (body: any) => {
        throw new Error("Method not implemented.");
    }

    private handleFindContent = (body: any) => {
        throw new Error("Method not implemented.");
    }
}
