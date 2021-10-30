/// <reference types="node" />
import { Discv5, IDiscv5CreateOptions } from "@chainsafe/discv5";
import { EventEmitter } from 'events';
import { StateNetworkRoutingTable } from "..";
export declare class PortalNetwork extends EventEmitter {
    client: Discv5;
    stateNetworkRoutingTable: StateNetworkRoutingTable;
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
    /**
     * Sends a Portal Network Wire Protocol FINDNODES request to a peer requesting other node ENRs
     * @param dstId node id of peer
     * @param distances distances as defined by subnetwork for node ENRs being requested
     */
    sendFindNodes: (dstId: string, distances: Uint16Array) => void;
    private sendPong;
    private onTalkReq;
    private onTalkResp;
    private decodeMessage;
    private handlePing;
    private handleFindNodes;
    private handleOffer;
    private handleFindContent;
}
//# sourceMappingURL=client.d.ts.map