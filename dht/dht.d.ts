import { ENR, KademliaRoutingTable, NodeId } from '@chainsafe/discv5';
export declare class OverlayRoutingTable extends KademliaRoutingTable {
    /**
     *
     * @param id id of node to find nearest nodes to
     * @param limit maximum number of nodes to return
     * @returns array of `limit` nearest nodes
     */
    nearest(id: NodeId, limit: number): ENR[];
}
//# sourceMappingURL=dht.d.ts.map