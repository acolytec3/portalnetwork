
  /**
   * @license
   * author: acolytec3
   * portalnetwork.js v0.0.1
   * Released under the MIT license.
   */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var discv5 = require('@chainsafe/discv5');
var bn_js = require('bn.js');

const MODULO = new bn_js.BN(2).pow(new bn_js.BN(256));
const MID = new bn_js.BN(2).pow(new bn_js.BN(255));
/**
 * Calculates the distance between two ids using the distance function defined here
 * https://github.com/ethereum/portal-network-specs/blob/master/state-network.md#distance-function
 */
const distance = (id1, id2) => {
    const num1 = new bn_js.BN(id1);
    const num2 = new bn_js.BN(id2);
    let diff;
    num1.gt(num2) ? diff = num1.sub(num2) : diff = num2.sub(num1);
    diff.gt(MID) ? diff = MODULO.sub(diff) : diff;
    return diff;
};

class OverlayRoutingTable extends discv5.KademliaRoutingTable {
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

Object.defineProperty(exports, 'Discv5', {
    enumerable: true,
    get: function () { return discv5.Discv5; }
});
exports.OverlayRoutingTable = OverlayRoutingTable;
exports.distance = distance;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGFsbmV0d29yay5janMuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9zcmMvZGh0L3V0aWwudHMiLCIuLi9zcmMvc3JjL2RodC9kaHQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQk4gfSBmcm9tICdibi5qcyc7XG5cbmNvbnN0IE1PRFVMTyA9IG5ldyBCTigyKS5wb3cobmV3IEJOKDI1NikpXG5jb25zdCBNSUQgPSBuZXcgQk4oMikucG93KG5ldyBCTigyNTUpKVxuXG4vKiogXG4gKiBDYWxjdWxhdGVzIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHR3byBpZHMgdXNpbmcgdGhlIGRpc3RhbmNlIGZ1bmN0aW9uIGRlZmluZWQgaGVyZSBcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9ldGhlcmV1bS9wb3J0YWwtbmV0d29yay1zcGVjcy9ibG9iL21hc3Rlci9zdGF0ZS1uZXR3b3JrLm1kI2Rpc3RhbmNlLWZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBkaXN0YW5jZSA9IChpZDE6IHN0cmluZywgaWQyOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBudW0xID0gbmV3IEJOKGlkMSk7XG4gICAgY29uc3QgbnVtMiA9IG5ldyBCTihpZDIpO1xuXG4gICAgbGV0IGRpZmZcbiAgICBudW0xLmd0KG51bTIpID8gZGlmZiA9IG51bTEuc3ViKG51bTIpIDogZGlmZiA9IG51bTIuc3ViKG51bTEpXG4gICAgZGlmZi5ndChNSUQpID8gZGlmZiA9IE1PRFVMTy5zdWIoZGlmZikgOiBkaWZmXG4gICAgcmV0dXJuIGRpZmZcbn0iLCJpbXBvcnQgeyBFTlIsIEthZGVtbGlhUm91dGluZ1RhYmxlLCBOb2RlSWQgfSBmcm9tICdAY2hhaW5zYWZlL2Rpc2N2NSdcbmltcG9ydCB7IEJOIH0gZnJvbSAnYm4uanMnO1xuaW1wb3J0IHsgZGlzdGFuY2UgfSBmcm9tICcuL3V0aWwnXG5cblxuZXhwb3J0IGNsYXNzIE92ZXJsYXlSb3V0aW5nVGFibGUgZXh0ZW5kcyBLYWRlbWxpYVJvdXRpbmdUYWJsZSB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBpZCBpZCBvZiBub2RlIHRvIGZpbmQgbmVhcmVzdCBub2RlcyB0b1xuICAgICAqIEBwYXJhbSBsaW1pdCBtYXhpbXVtIG51bWJlciBvZiBub2RlcyB0byByZXR1cm5cbiAgICAgKiBAcmV0dXJucyBhcnJheSBvZiBgbGltaXRgIG5lYXJlc3Qgbm9kZXNcbiAgICAgKi9cbiAgICBuZWFyZXN0KGlkOiBOb2RlSWQsIGxpbWl0OiBudW1iZXIpOiBFTlJbXSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdHM6IEVOUltdID0gW107XG4gICAgICAgIHRoaXMuYnVja2V0cy5mb3JFYWNoKChidWNrZXQpID0+IHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaCguLi5idWNrZXQudmFsdWVzKCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVzdWx0cy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkaWZmID0gZGlzdGFuY2UoaWQsIGEubm9kZUlkKS5zdWIoZGlzdGFuY2UoaWQsIGIubm9kZUlkKSk7XG4gICAgICAgICAgICBpZiAoZGlmZi5pc05lZygpKSByZXR1cm4gLTE7XG4gICAgICAgICAgICBpZiAoZGlmZi5pc1plcm8oKSkgcmV0dXJuIDA7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJlc3VsdHMuc2xpY2UoMCwgbGltaXQpO1xuICAgIH1cbn0iXSwibmFtZXMiOlsiQk4iLCJLYWRlbWxpYVJvdXRpbmdUYWJsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsTUFBTSxNQUFNLEdBQUcsSUFBSUEsUUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJQSxRQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUN6QyxNQUFNLEdBQUcsR0FBRyxJQUFJQSxRQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUlBLFFBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBRXRDOzs7O01BSWEsUUFBUSxHQUFHLENBQUMsR0FBVyxFQUFFLEdBQVc7SUFDN0MsTUFBTSxJQUFJLEdBQUcsSUFBSUEsUUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLE1BQU0sSUFBSSxHQUFHLElBQUlBLFFBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUV6QixJQUFJLElBQUksQ0FBQTtJQUNSLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDN0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUE7SUFDN0MsT0FBTyxJQUFJLENBQUE7QUFDZjs7TUNaYSxtQkFBb0IsU0FBUUMsMkJBQW9COzs7Ozs7O0lBUXpELE9BQU8sQ0FBQyxFQUFVLEVBQUUsS0FBYTtRQUM3QixNQUFNLE9BQU8sR0FBVSxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNO1lBQ3hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUNwQyxDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDZCxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNoRSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQUUsT0FBTyxDQUFDLENBQUM7WUFDNUIsT0FBTyxDQUFDLENBQUM7U0FDWixDQUFDLENBQUE7UUFDRixPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ2xDOzs7Ozs7Ozs7OyJ9
