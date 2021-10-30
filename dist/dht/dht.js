"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateNetworkRoutingTable = void 0;
const discv5_1 = require("@chainsafe/discv5");
const util_1 = require("./util");
class StateNetworkRoutingTable extends discv5_1.KademliaRoutingTable {
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
            const diff = (0, util_1.distance)(id, a.nodeId).sub((0, util_1.distance)(id, b.nodeId));
            if (diff.isNeg())
                return -1;
            if (diff.isZero())
                return 0;
            return 1;
        });
        return results.slice(0, limit);
    }
}
exports.StateNetworkRoutingTable = StateNetworkRoutingTable;
