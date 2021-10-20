import { Discv5, ENR, IDiscv5CreateOptions } from "@chainsafe/discv5";
import { ITalkReqMessage, ITalkRespMessage } from "@chainsafe/discv5/lib/message";
import { EventEmitter } from 'events'

import debug from 'debug'
import { PingPongMessageType, StateNetworkCustomDataType, MessageType as PortalNetworkMessageType, MessageCodes, SubNetwork } from "../wire/types";

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
    public sendPing = async () => {
        const payload = StateNetworkCustomDataType.serialize({ data_radius: BigInt(1) })
        const pingMsg = PingPongMessageType.serialize({
            enr_seq: Buffer.from(this.client.enr.seq.toString()).buffer,
            custom_payload: payload
        })
        this.client.broadcastTalkReq(Buffer.concat([Buffer.from([MessageCodes.PING]), Buffer.from(pingMsg)]), SubNetwork.state)
    }

    public onTalkReq = (srcId: string, sourceId: ENR | null, message: ITalkReqMessage) => {
        log(`TALKREQUEST message received from ${srcId}`)
    }

    public onTalkResp = (srcId: string, sourceId: ENR | null, message: ITalkRespMessage) => {
        log(`TALKRESPONSE message received from ${srcId}`)
        log(`Message response ${message.response.toString('hex')}`)
    }
}

