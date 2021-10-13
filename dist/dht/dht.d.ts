import { ENR, KademliaRoutingTable, NodeId } from '@chainsafe/discv5';
export declare class OverlayRoutingTable extends KademliaRoutingTable {
    constructor(localId: NodeId, k: number);
    nearest(id: NodeId, limit: number): ENR[];
}
//# sourceMappingURL=dht.d.ts.map