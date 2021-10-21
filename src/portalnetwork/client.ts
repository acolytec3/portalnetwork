import { Discv5, ENR, IDiscv5CreateOptions } from "@chainsafe/discv5";
import { ITalkReqMessage, ITalkRespMessage, MessageType } from "@chainsafe/discv5/lib/message";
import { EventEmitter } from 'events'

import debug from 'debug'
import { PingPongMessageType, StateNetworkCustomDataType, MessageCodes, StateNetworkId, } from "../wire/types";

const log = debug("portalnetwork")
export class PortalNetwork extends EventEmitter {
    client: Discv5;

    constructor(config: IDiscv5CreateOptions) {
        super();
        this.client = Discv5.create(config)
        this.client.on("talkReqReceived", this.onTalkReq)
        this.client.on("talkRespReceived", this.onTalkResp)
    }

    public start = async () => {
        await this.client.start()
    }
    public enableLog = (namespaces = "portalnetwork*,discv5*") => {
        debug.enable(namespaces)
    }
    public sendPing = async (dstId: string) => {
        const payload = StateNetworkCustomDataType.serialize({ data_radius: BigInt(1) })
        const pingMsg = PingPongMessageType.serialize({
            enr_seq: this.client.enr.seq,
            custom_payload: payload
        })
        this.client.sendTalkReq(dstId, Buffer.concat([Buffer.from([MessageCodes.PING]), Buffer.from(pingMsg)]), StateNetworkId)
        log(`Sending PING to ${dstId.slice(0, 15)}... for ${StateNetworkId} subnetwork`)
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
    public onTalkReq = async (srcId: string, sourceId: ENR | null, message: ITalkReqMessage) => {

        const decoded = this.decodeMessage(message)
        log(`TALKREQUEST message received from ${srcId}`)
        console.log(message)
        if (decoded.type === MessageCodes.PING) {
            await this.sendPong(srcId, message.id)
        }
    }

    public onTalkResp = (srcId: string, sourceId: ENR | null, message: ITalkRespMessage) => {
        log(`TALKRESPONSE message received from ${srcId}, ${message}`)
        console.log(message)
    }

    private decodeMessage = (message: ITalkReqMessage | ITalkRespMessage): any => {
        if (message.type === MessageType.TALKREQ) {
            return {
                type: parseInt(message.request.slice(0, 1).toString('hex')),
                body: message.request.slice(2)
            }
        }
    }
}
