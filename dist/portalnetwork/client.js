import { Discv5 } from "@chainsafe/discv5";
import { EventEmitter } from 'events';
import debug from 'debug';
import { PingPongMessageType, StateNetworkCustomDataType, MessageCodes, StateNetworkId, } from "../wire/types";
const log = debug("portalnetwork");
export class PortalNetwork extends EventEmitter {
    client;
    constructor(config) {
        super();
        this.client = Discv5.create(config);
        this.client.on("talkReqReceived", this.onTalkReq);
        this.client.on("talkRespReceived", this.onTalkResp);
    }
    start = async () => {
        await this.client.start();
    };
    enableLog = (namespaces = "portalnetwork*,discv5*") => {
        debug.enable(namespaces);
    };
    sendPing = async (dstId) => {
        const payload = StateNetworkCustomDataType.serialize({ data_radius: BigInt(1) });
        const pingMsg = PingPongMessageType.serialize({
            enr_seq: Buffer.from(this.client.enr.seq.toString()).buffer,
            custom_payload: payload
        });
        this.client.sendTalkReq(dstId, Buffer.concat([Buffer.from([MessageCodes.PING]), Buffer.from(pingMsg)]), StateNetworkId);
    };
    onTalkReq = (srcId, sourceId, message) => {
        log(`TALKREQUEST message received from ${srcId}`);
    };
    onTalkResp = (srcId, sourceId, message) => {
        log(`TALKRESPONSE message received from ${srcId}`);
        log(`Message response ${message.response.toString('hex')}`);
    };
}
