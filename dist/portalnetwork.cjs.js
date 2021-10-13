
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

const distance = (id, nodeId) => {
    return new bn_js.BN(id).sub(new bn_js.BN(nodeId)).toNumber();
};
class OverlayRoutingTable extends discv5.KademliaRoutingTable {
    constructor(localId, k) {
        super(localId, k);
    }
    nearest(id, limit) {
        const results = [];
        this.buckets.forEach((bucket) => {
            results.push(...bucket.values());
        });
        results.sort((a, b) => {
            return distance(id, a.nodeId) - distance(id, b.nodeId);
        });
        return results.slice(0, limit);
    }
}

Object.defineProperty(exports, 'Discv5', {
    enumerable: true,
    get: function () { return discv5.Discv5; }
});
exports.OverlayRoutingTable = OverlayRoutingTable;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGFsbmV0d29yay5janMuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9zcmMvZGh0L2RodC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFTlIsIEthZGVtbGlhUm91dGluZ1RhYmxlLCBOb2RlSWQgfSBmcm9tICdAY2hhaW5zYWZlL2Rpc2N2NSdcbmltcG9ydCB7IEJOIH0gZnJvbSAnYm4uanMnO1xuXG5jb25zdCBkaXN0YW5jZSA9IChpZDogc3RyaW5nLCBub2RlSWQ6IHN0cmluZyk6IG51bWJlciA9PiB7XG4gICAgcmV0dXJuIG5ldyBCTihpZCkuc3ViKG5ldyBCTihub2RlSWQpKS50b051bWJlcigpO1xufVxuXG5leHBvcnQgY2xhc3MgT3ZlcmxheVJvdXRpbmdUYWJsZSBleHRlbmRzIEthZGVtbGlhUm91dGluZ1RhYmxlIHtcblxuICAgIGNvbnN0cnVjdG9yKGxvY2FsSWQ6IE5vZGVJZCwgazogbnVtYmVyKSB7XG4gICAgICAgIHN1cGVyKGxvY2FsSWQsIGspO1xuICAgIH1cblxuICAgIG5lYXJlc3QoaWQ6IE5vZGVJZCwgbGltaXQ6IG51bWJlcik6IEVOUltdIHtcbiAgICAgICAgY29uc3QgcmVzdWx0czogRU5SW10gPSBbXTtcbiAgICAgICAgdGhpcy5idWNrZXRzLmZvckVhY2goKGJ1Y2tldCkgPT4ge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKC4uLmJ1Y2tldC52YWx1ZXMoKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXN1bHRzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBkaXN0YW5jZShpZCwgYS5ub2RlSWQpIC0gZGlzdGFuY2UoaWQsIGIubm9kZUlkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHRzLnNsaWNlKDAsIGxpbWl0KTtcbiAgICB9XG59Il0sIm5hbWVzIjpbIkJOIiwiS2FkZW1saWFSb3V0aW5nVGFibGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUdBLE1BQU0sUUFBUSxHQUFHLENBQUMsRUFBVSxFQUFFLE1BQWM7SUFDeEMsT0FBTyxJQUFJQSxRQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUlBLFFBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ3JELENBQUMsQ0FBQTtNQUVZLG1CQUFvQixTQUFRQywyQkFBb0I7SUFFekQsWUFBWSxPQUFlLEVBQUUsQ0FBUztRQUNsQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ3JCO0lBRUQsT0FBTyxDQUFDLEVBQVUsRUFBRSxLQUFhO1FBQzdCLE1BQU0sT0FBTyxHQUFVLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU07WUFDeEIsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQ3BDLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNkLE9BQU8sUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDMUQsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNsQzs7Ozs7Ozs7OyJ9
