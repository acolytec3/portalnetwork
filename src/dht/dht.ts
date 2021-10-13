import { ENR, KademliaRoutingTable, NodeId } from '@chainsafe/discv5'
import { BN } from 'bn.js';
import { distance } from './util'


export class OverlayRoutingTable extends KademliaRoutingTable {
    nearest(id: NodeId, limit: number): ENR[] {
        const results: ENR[] = [];
        this.buckets.forEach((bucket) => {
            results.push(...bucket.values());
        });
        results.sort((a, b) => {
            const diff = distance(id, a.nodeId).sub(distance(id, b.nodeId));
            if (diff.isNeg()) return -1;
            if (diff.isZero()) return 0;
            return 1;
        })
        return results.slice(0, limit);
    }
}