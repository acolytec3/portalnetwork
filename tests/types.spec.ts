import tape from 'tape';
import { MessageCodes, PingPongMessageType, StateNetworkCustomDataType } from '../src/wire/types';

tape('message encoding should match test vectors', (t) => {
    const enrSeq = BigInt(1);
    const customPayload = StateNetworkCustomDataType.serialize({ dataRadius: BigInt(0) });
    const payload = PingPongMessageType.serialize({
        enrSeq: enrSeq,
        customPayload: customPayload
    })
    const encodedMessage = Buffer.concat([Uint8Array.from([MessageCodes.PING]), payload])
    const testVector = "0101000000000000000c0000000000000000000000000000000000000000000000000000000000000000000000"
    t.isEqual(Buffer.from(encodedMessage).toString('hex'), testVector, 'ping message encoded correctly')
    t.end()
})