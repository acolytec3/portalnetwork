import { Discv5 } from "@chainsafe/discv5";
import { MessageType } from "@chainsafe/discv5/lib/message";
import { EventEmitter } from 'events';
import debug from 'debug';
import { PingPongMessageType, StateNetworkCustomDataType, MessageCodes, StateNetworkId, } from "../wire/types";
import { fromHexString } from "@chainsafe/ssz";
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
            enr_seq: this.client.enr.seq,
            custom_payload: payload
        });
        this.client.sendTalkReq(dstId, Buffer.concat([Buffer.from([MessageCodes.PING]), Buffer.from(pingMsg)]), fromHexString(StateNetworkId))
            .then((res) => {
            if (parseInt(res.slice(0, 1).toString('hex')) === MessageCodes.PONG) {
                log(`Received PONG from ${dstId.slice(0, 15)}... with response ${res.slice(2).toString()}`);
            }
        })
            .catch((err) => {
            log(`Error during PING request to ${dstId.slice(0, 15)}...: Error Message ${err.toString()}`);
        });
        log(`Sending PING to ${dstId.slice(0, 15)}... for ${StateNetworkId} subnetwork`);
    };
    sendPong = async (srcId, reqId) => {
        const payload = StateNetworkCustomDataType.serialize({ data_radius: BigInt(1) });
        const pongMsg = PingPongMessageType.serialize({
            enr_seq: this.client.enr.seq,
            custom_payload: payload
        });
        log('PONG payload ', Buffer.concat([Buffer.from([MessageCodes.PONG]), Buffer.from(pongMsg)]));
        this.client.sendTalkResp(srcId, reqId, Buffer.concat([Buffer.from([MessageCodes.PONG]), Buffer.from(pongMsg)]));
    };
    onTalkReq = async (srcId, sourceId, message) => {
        switch (message.protocol.toString('hex')) {
            case StateNetworkId:
        }
        const decoded = this.decodeMessage(message);
        log(`TALKREQUEST message received from ${srcId}`);
        console.log(message);
        if (decoded.type === MessageCodes.PING) {
            await this.sendPong(srcId, message.id);
        }
    };
    onTalkResp = (srcId, sourceId, message) => {
        log(`TALKRESPONSE message received from ${srcId}, ${message.toString()}`);
    };
    decodeMessage = (message) => {
        if (message.type === MessageType.TALKREQ) {
            return {
                type: parseInt(message.request.slice(0, 1).toString('hex')),
                body: message.request.slice(2)
            };
        }
    };
}
