/// <reference types="node" />
import { Discv5, IDiscv5CreateOptions } from "@chainsafe/discv5";
import { EventEmitter } from 'events';
export declare class PortalNetwork extends EventEmitter {
    client: Discv5;
    constructor(config: IDiscv5CreateOptions);
}
//# sourceMappingURL=client.d.ts.map