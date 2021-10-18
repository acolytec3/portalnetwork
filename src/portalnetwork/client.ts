import { Discv5, IDiscv5CreateOptions } from "@chainsafe/discv5";
import { EventEmitter } from 'events'

export class PortalNetwork extends EventEmitter {
    discv5: Discv5;

    constructor(config: IDiscv5CreateOptions) {
        super();
        this.discv5 = Discv5.create(config)
    }
}