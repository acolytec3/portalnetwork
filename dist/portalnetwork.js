
  /**
   * @license
   * author: acolytec3
   * portalnetwork.js v0.0.1
   * Released under the MIT license.
   */

import { KademliaRoutingTable, NodeId, ENR } from '@chainsafe/discv5';
export { Discv5 } from '@chainsafe/discv5';

declare class OverlayRoutingTable extends KademliaRoutingTable {
    constructor(localId: NodeId, k: number);
    nearest(id: NodeId, limit: number): ENR[];
}

export { OverlayRoutingTable };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9ydGFsbmV0d29yay5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIifQ==
