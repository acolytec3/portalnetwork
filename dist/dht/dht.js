import { KademliaRoutingTable } from '@chainsafe/discv5';
import { distance } from './util';
export class StateNetworkRoutingTable extends KademliaRoutingTable {
    /**
     *
     * @param id id of node to find nearest nodes to
     * @param limit maximum number of nodes to return
     * @returns array of `limit` nearest nodes
     */
    nearest(id, limit) {
        const results = [];
        this.buckets.forEach((bucket) => {
            results.push(...bucket.values());
        });
        results.sort((a, b) => {
            const diff = distance(id, a.nodeId).sub(distance(id, b.nodeId));
            if (diff.isNeg())
                return -1;
            if (diff.isZero())
                return 0;
            return 1;
        });
        return results.slice(0, limit);
    }
}
