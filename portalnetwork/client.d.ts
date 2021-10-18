/// <reference types="node" />
import { Discv5, IDiscv5CreateOptions } from "@chainsafe/discv5";
import { EventEmitter } from 'events';
export declare class PortalNetwork extends EventEmitter {
    discv5: Discv5;
    constructor(config: IDiscv5CreateOptions);
}
//# sourceMappingURL=client.d.ts.map