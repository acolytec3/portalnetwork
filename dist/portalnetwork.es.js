
  /**
   * @license
   * author: acolytec3
   * portalnetwork.js v0.0.1
   * Released under the MIT license.
   */

import { KademliaRoutingTable } from '@chainsafe/discv5';
export { Discv5 } from '@chainsafe/discv5';
import { BN } from 'bn.js';

const distance = (id, nodeId) => {
    return new BN(id).sub(new BN(nodeId)).toNumber();
};
class OverlayRoutingTable extends KademliaRoutingTable {
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

export { OverlayRoutingTable };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGFsbmV0d29yay5lcy5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2RodC9kaHQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRU5SLCBLYWRlbWxpYVJvdXRpbmdUYWJsZSwgTm9kZUlkIH0gZnJvbSAnQGNoYWluc2FmZS9kaXNjdjUnXG5pbXBvcnQgeyBCTiB9IGZyb20gJ2JuLmpzJztcblxuY29uc3QgZGlzdGFuY2UgPSAoaWQ6IHN0cmluZywgbm9kZUlkOiBzdHJpbmcpOiBudW1iZXIgPT4ge1xuICAgIHJldHVybiBuZXcgQk4oaWQpLnN1YihuZXcgQk4obm9kZUlkKSkudG9OdW1iZXIoKTtcbn1cblxuZXhwb3J0IGNsYXNzIE92ZXJsYXlSb3V0aW5nVGFibGUgZXh0ZW5kcyBLYWRlbWxpYVJvdXRpbmdUYWJsZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihsb2NhbElkOiBOb2RlSWQsIGs6IG51bWJlcikge1xuICAgICAgICBzdXBlcihsb2NhbElkLCBrKTtcbiAgICB9XG5cbiAgICBuZWFyZXN0KGlkOiBOb2RlSWQsIGxpbWl0OiBudW1iZXIpOiBFTlJbXSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdHM6IEVOUltdID0gW107XG4gICAgICAgIHRoaXMuYnVja2V0cy5mb3JFYWNoKChidWNrZXQpID0+IHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaCguLi5idWNrZXQudmFsdWVzKCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVzdWx0cy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZGlzdGFuY2UoaWQsIGEubm9kZUlkKSAtIGRpc3RhbmNlKGlkLCBiLm5vZGVJZCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzdWx0cy5zbGljZSgwLCBsaW1pdCk7XG4gICAgfVxufSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFHQSxNQUFNLFFBQVEsR0FBRyxDQUFDLEVBQVUsRUFBRSxNQUFjO0lBQ3hDLE9BQU8sSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDckQsQ0FBQyxDQUFBO01BRVksbUJBQW9CLFNBQVEsb0JBQW9CO0lBRXpELFlBQVksT0FBZSxFQUFFLENBQVM7UUFDbEMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztLQUNyQjtJQUVELE9BQU8sQ0FBQyxFQUFVLEVBQUUsS0FBYTtRQUM3QixNQUFNLE9BQU8sR0FBVSxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNO1lBQ3hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUNwQyxDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDZCxPQUFPLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzFELENBQUMsQ0FBQztRQUNILE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDbEM7Ozs7OyJ9
