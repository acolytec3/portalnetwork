/// <reference types="node" />
import { Discv5, IDiscv5CreateOptions } from "@chainsafe/discv5";
import { EventEmitter } from 'events';
export declare class PortalNetwork extends EventEmitter {
    client: Discv5;
    constructor(config: IDiscv5CreateOptions);
    /**
     * Starts the portal network client
     */
    start: () => Promise<void>;
    /**
     *
     * @param namespaces comma separated list of logging namespaces
     * defaults to "portalnetwork*, discv5*"
     */
    enableLog: (namespaces?: string) => void;
    /**
     *
     * Sends a Portal Network Wire Protocol PING message to a specified node
     * @param dstId the nodeId of the peer to send a ping to
     */
    sendPing: (dstId: string) => void;
    private sendPong;
    private onTalkReq;
    private onTalkResp;
    private decodeMessage;
    private handleFindNodes;
    private handleOffer;
    private handleFindContent;
}
//# sourceMappingURL=client.d.ts.map