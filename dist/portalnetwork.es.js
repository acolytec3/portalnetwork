
  /**
   * @license
   * author: acolytec3
   * portalnetwork.js v0.0.1
   * Released under the MIT license.
   */

import { KademliaRoutingTable } from '@chainsafe/discv5';
export { Discv5 } from '@chainsafe/discv5';
import { BN } from 'bn.js';

const MODULO = new BN(2).pow(new BN(256));
const MID = new BN(2).pow(new BN(255));
/**
 * Calculates the distance between two ids using the distance function defined here
 * https://github.com/ethereum/portal-network-specs/blob/master/state-network.md#distance-function
 */
const distance = (id1, id2) => {
    const num1 = new BN(id1);
    const num2 = new BN(id2);
    let diff;
    num1.gt(num2) ? diff = num1.sub(num2) : diff = num2.sub(num1);
    diff.gt(MID) ? diff = MODULO.sub(diff) : diff;
    return diff;
};

class OverlayRoutingTable extends KademliaRoutingTable {
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

export { OverlayRoutingTable, distance };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGFsbmV0d29yay5lcy5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL3NyYy9kaHQvdXRpbC50cyIsIi4uL3NyYy9zcmMvZGh0L2RodC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCTiB9IGZyb20gJ2JuLmpzJztcblxuY29uc3QgTU9EVUxPID0gbmV3IEJOKDIpLnBvdyhuZXcgQk4oMjU2KSlcbmNvbnN0IE1JRCA9IG5ldyBCTigyKS5wb3cobmV3IEJOKDI1NSkpXG5cbi8qKiBcbiAqIENhbGN1bGF0ZXMgdGhlIGRpc3RhbmNlIGJldHdlZW4gdHdvIGlkcyB1c2luZyB0aGUgZGlzdGFuY2UgZnVuY3Rpb24gZGVmaW5lZCBoZXJlIFxuICogaHR0cHM6Ly9naXRodWIuY29tL2V0aGVyZXVtL3BvcnRhbC1uZXR3b3JrLXNwZWNzL2Jsb2IvbWFzdGVyL3N0YXRlLW5ldHdvcmsubWQjZGlzdGFuY2UtZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IGRpc3RhbmNlID0gKGlkMTogc3RyaW5nLCBpZDI6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IG51bTEgPSBuZXcgQk4oaWQxKTtcbiAgICBjb25zdCBudW0yID0gbmV3IEJOKGlkMik7XG5cbiAgICBsZXQgZGlmZlxuICAgIG51bTEuZ3QobnVtMikgPyBkaWZmID0gbnVtMS5zdWIobnVtMikgOiBkaWZmID0gbnVtMi5zdWIobnVtMSlcbiAgICBkaWZmLmd0KE1JRCkgPyBkaWZmID0gTU9EVUxPLnN1YihkaWZmKSA6IGRpZmZcbiAgICByZXR1cm4gZGlmZlxufSIsImltcG9ydCB7IEVOUiwgS2FkZW1saWFSb3V0aW5nVGFibGUsIE5vZGVJZCB9IGZyb20gJ0BjaGFpbnNhZmUvZGlzY3Y1J1xuaW1wb3J0IHsgQk4gfSBmcm9tICdibi5qcyc7XG5pbXBvcnQgeyBkaXN0YW5jZSB9IGZyb20gJy4vdXRpbCdcblxuXG5leHBvcnQgY2xhc3MgT3ZlcmxheVJvdXRpbmdUYWJsZSBleHRlbmRzIEthZGVtbGlhUm91dGluZ1RhYmxlIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIGlkIGlkIG9mIG5vZGUgdG8gZmluZCBuZWFyZXN0IG5vZGVzIHRvXG4gICAgICogQHBhcmFtIGxpbWl0IG1heGltdW0gbnVtYmVyIG9mIG5vZGVzIHRvIHJldHVyblxuICAgICAqIEByZXR1cm5zIGFycmF5IG9mIGBsaW1pdGAgbmVhcmVzdCBub2Rlc1xuICAgICAqL1xuICAgIG5lYXJlc3QoaWQ6IE5vZGVJZCwgbGltaXQ6IG51bWJlcik6IEVOUltdIHtcbiAgICAgICAgY29uc3QgcmVzdWx0czogRU5SW10gPSBbXTtcbiAgICAgICAgdGhpcy5idWNrZXRzLmZvckVhY2goKGJ1Y2tldCkgPT4ge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKC4uLmJ1Y2tldC52YWx1ZXMoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXN1bHRzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRpZmYgPSBkaXN0YW5jZShpZCwgYS5ub2RlSWQpLnN1YihkaXN0YW5jZShpZCwgYi5ub2RlSWQpKTtcbiAgICAgICAgICAgIGlmIChkaWZmLmlzTmVnKCkpIHJldHVybiAtMTtcbiAgICAgICAgICAgIGlmIChkaWZmLmlzWmVybygpKSByZXR1cm4gMDtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gcmVzdWx0cy5zbGljZSgwLCBsaW1pdCk7XG4gICAgfVxufSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFFQSxNQUFNLE1BQU0sR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUN6QyxNQUFNLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUV0Qzs7OztNQUlhLFFBQVEsR0FBRyxDQUFDLEdBQVcsRUFBRSxHQUFXO0lBQzdDLE1BQU0sSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLE1BQU0sSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXpCLElBQUksSUFBSSxDQUFBO0lBQ1IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM3RCxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQTtJQUM3QyxPQUFPLElBQUksQ0FBQTtBQUNmOztNQ1phLG1CQUFvQixTQUFRLG9CQUFvQjs7Ozs7OztJQVF6RCxPQUFPLENBQUMsRUFBVSxFQUFFLEtBQWE7UUFDN0IsTUFBTSxPQUFPLEdBQVUsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTTtZQUN4QixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDcEMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ2QsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEUsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxDQUFDO1NBQ1osQ0FBQyxDQUFBO1FBQ0YsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNsQzs7Ozs7In0=
