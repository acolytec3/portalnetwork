import { Discv5 } from "@chainsafe/discv5";
import { EventEmitter } from 'events';
export class PortalNetwork extends EventEmitter {
    discv5;
    constructor(config) {
        super();
        this.discv5 = Discv5.create(config);
    }
}
