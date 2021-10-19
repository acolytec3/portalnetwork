import { Discv5 } from "@chainsafe/discv5";
import { EventEmitter } from 'events';
import debug from 'debug';
const log = debug("portalnetwork");
export class PortalNetwork extends EventEmitter {
    client;
    constructor(config) {
        super();
        this.client = Discv5.create(config);
        this.client.on("talkReqReceived", this.onTalkReq);
        this.client.on("talkRespReceived", this.onTalkResp);
    }
    sendPing = async () => {
    };
    onTalkReq = (srcId, sourceId, message) => {
        log(`TALKREQUEST message received from ${srcId}`);
    };
    onTalkResp = (srcId, sourceId, message) => {
        log(`TALKRESPONSE message received from ${srcId}`);
    };
}
