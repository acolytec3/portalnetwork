import { Discv5 } from "@chainsafe/discv5";
import { EventEmitter } from 'events';
export class PortalNetwork extends EventEmitter {
    client;
    constructor(config) {
        super();
        this.client = Discv5.create(config);
    }
}
