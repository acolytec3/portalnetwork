import _BN from 'bn.js';
const BN = _BN;
const MODULO = new BN(2).pow(new BN(256));
const MID = new BN(2).pow(new BN(255));
/**
 * Calculates the distance between two ids using the distance function defined here
 * https://github.com/ethereum/portal-network-specs/blob/master/state-network.md#distance-function
 */
export const distance = (id1, id2) => {
    const num1 = new BN(id1);
    const num2 = new BN(id2);
    let diff;
    diff = num1.gt(num2) ? num1.sub(num2) :  num2.sub(num1);
    diff = diff.gt(MID) ? MODULO.sub(diff) : diff;
    return diff;
};
