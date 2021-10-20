/// <reference types="node" />
import { Discv5, ENR, IDiscv5CreateOptions } from "@chainsafe/discv5";
import { ITalkReqMessage, ITalkRespMessage } from "@chainsafe/discv5/lib/message";
import { EventEmitter } from 'events';
export declare class PortalNetwork extends EventEmitter {
    client: Discv5;
    constructor(config: IDiscv5CreateOptions);
    start: () => Promise<void>;
    enableLog: (namespaces?: string) => void;
    sendPing: (dstId: string) => Promise<void>;
    onTalkReq: (srcId: string, sourceId: ENR | null, message: ITalkReqMessage) => void;
    onTalkResp: (srcId: string, sourceId: ENR | null, message: ITalkRespMessage) => void;
}
//# sourceMappingURL=client.d.ts.map