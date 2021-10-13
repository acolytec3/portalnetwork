
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGFsbmV0d29yay5janMuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9kaHQvZGh0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVOUiwgS2FkZW1saWFSb3V0aW5nVGFibGUsIE5vZGVJZCB9IGZyb20gJ0BjaGFpbnNhZmUvZGlzY3Y1J1xuaW1wb3J0IHsgQk4gfSBmcm9tICdibi5qcyc7XG5cbmNvbnN0IGRpc3RhbmNlID0gKGlkOiBzdHJpbmcsIG5vZGVJZDogc3RyaW5nKTogbnVtYmVyID0+IHtcbiAgICByZXR1cm4gbmV3IEJOKGlkKS5zdWIobmV3IEJOKG5vZGVJZCkpLnRvTnVtYmVyKCk7XG59XG5cbmV4cG9ydCBjbGFzcyBPdmVybGF5Um91dGluZ1RhYmxlIGV4dGVuZHMgS2FkZW1saWFSb3V0aW5nVGFibGUge1xuXG4gICAgY29uc3RydWN0b3IobG9jYWxJZDogTm9kZUlkLCBrOiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIobG9jYWxJZCwgayk7XG4gICAgfVxuXG4gICAgbmVhcmVzdChpZDogTm9kZUlkLCBsaW1pdDogbnVtYmVyKTogRU5SW10ge1xuICAgICAgICBjb25zdCByZXN1bHRzOiBFTlJbXSA9IFtdO1xuICAgICAgICB0aGlzLmJ1Y2tldHMuZm9yRWFjaCgoYnVja2V0KSA9PiB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2goLi4uYnVja2V0LnZhbHVlcygpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJlc3VsdHMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGRpc3RhbmNlKGlkLCBhLm5vZGVJZCkgLSBkaXN0YW5jZShpZCwgYi5ub2RlSWQpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdHMuc2xpY2UoMCwgbGltaXQpO1xuICAgIH1cbn0iXSwibmFtZXMiOlsiQk4iLCJLYWRlbWxpYVJvdXRpbmdUYWJsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsTUFBTSxRQUFRLEdBQUcsQ0FBQyxFQUFVLEVBQUUsTUFBYztJQUN4QyxPQUFPLElBQUlBLFFBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSUEsUUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDckQsQ0FBQyxDQUFBO01BRVksbUJBQW9CLFNBQVFDLDJCQUFvQjtJQUV6RCxZQUFZLE9BQWUsRUFBRSxDQUFTO1FBQ2xDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDckI7SUFFRCxPQUFPLENBQUMsRUFBVSxFQUFFLEtBQWE7UUFDN0IsTUFBTSxPQUFPLEdBQVUsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTTtZQUN4QixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7U0FDcEMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ2QsT0FBTyxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMxRCxDQUFDLENBQUM7UUFDSCxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ2xDOzs7Ozs7Ozs7In0=
