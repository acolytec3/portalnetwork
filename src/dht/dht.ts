import { ENR, KademliaRoutingTable, NodeId } from '@chainsafe/discv5'
import { BN } from 'bn.js';

const distance = (id: string, nodeId: string): number => {
    return new BN(id).sub(new BN(nodeId)).toNumber();
}

export class OverlayRoutingTable extends KademliaRoutingTable {

    constructor(localId: NodeId, k: number) {
        super(localId, k);
    }

    nearest(id: NodeId, limit: number): ENR[] {
        const results: ENR[] = [];
        this.buckets.forEach((bucket) => {
            results.push(...bucket.values());
        });
        results.sort((a, b) => {
            return distance(id, a.nodeId) - distance(id, b.nodeId);
        });
        return results.slice(0, limit);
    }
}