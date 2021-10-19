import { Discv5, ENR, IDiscv5CreateOptions } from "@chainsafe/discv5";
import { ITalkReqMessage, ITalkRespMessage } from "@chainsafe/discv5/lib/message";
import { EventEmitter } from 'events'

import debug from 'debug'
import { PingMessageType } from "../wire/types";

const log = debug("portalnetwork")
export class PortalNetwork extends EventEmitter {
    client: Discv5;

    constructor(config: IDiscv5CreateOptions) {
        super();
        this.client = Discv5.create(config)
        this.client.on("talkReqReceived", this.onTalkReq)
        this.client.on("talkRespReceived", this.onTalkResp)
    }

    public sendPing = async () => {
    }

    public onTalkReq = (srcId: string, sourceId: ENR | null, message: ITalkReqMessage) => {
        log(`TALKREQUEST message received from ${srcId}`)
    }

    public onTalkResp = (srcId: string, sourceId: ENR | null, message: ITalkRespMessage) => {
        log(`TALKRESPONSE message received from ${srcId}`)
    }
}