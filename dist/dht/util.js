"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distance = void 0;
const tslib_1 = require("tslib");
const bn_js_1 = (0, tslib_1.__importDefault)(require("bn.js"));
const BN = bn_js_1.default;
const MODULO = new BN(2).pow(new BN(256));
const MID = new BN(2).pow(new BN(255));
/**
 * Calculates the distance between two ids using the distance function defined here
 * https://github.com/ethereum/portal-network-specs/blob/master/state-network.md#distance-function
 */
const distance = (id1, id2) => {
    const num1 = new BN(id1);
    const num2 = new BN(id2);
    let diff;
    num1.gt(num2) ? diff = num1.sub(num2) : diff = num2.sub(num1);
    diff.gt(MID) ? diff = MODULO.sub(diff) : diff;
    return diff;
};
exports.distance = distance;
