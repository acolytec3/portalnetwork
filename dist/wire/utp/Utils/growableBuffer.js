"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init_GCB = exports.GrowableCircularBuffer = exports.some = exports.none = exports.Option = void 0;
const math_1 = require("./math");
class Option {
    has;
    value;
    constructor(options) {
        this.has = options.has;
        this.value = options.value;
    }
    get() {
        return this.value;
    }
    unsafeGet() {
        return this.value;
    }
    isSome() {
        return this.has;
    }
    isNone() {
        return !this.has;
    }
    either(otherwise) {
        return this.has && this.value ? this.value : otherwise;
    }
}
exports.Option = Option;
function none(kind) {
    return new Option({ has: false });
}
exports.none = none;
function some(value) {
    return new Option({ has: true, value: value });
}
exports.some = some;
class GrowableCircularBuffer {
    items;
    mask;
    constructor(options) {
        this.items = options?.items || new Array();
        this.mask = options?.mask || 0;
    }
    get(i) {
        return this.items[i & this.mask];
    }
    putImpl(i, elem) {
        this.items[i & this.mask] = elem;
    }
    put(i, elem) {
        this.putImpl(i, some(elem));
    }
    delete(i) {
        this.putImpl(i, none());
    }
    hasKey(i) {
        return this.get(i).isSome();
    }
    exists(i, check) {
        let maybeElem = this.get(i);
        if (maybeElem.isSome()) {
            let elem = maybeElem.unsafeGet();
            return check(elem);
        }
        else {
            return false;
        }
    }
    contents(i) {
        return this.items[i & this.mask].get();
    }
    len() {
        return this.mask + 1;
    }
    //   # Increase size until is next power of 2 which consists given index
    getNextSize(currentSize, index) {
        var newSize = currentSize;
        while (true) {
            newSize = newSize * 2;
            if (index < newSize) {
                break;
            }
        }
        return newSize;
    }
    // # Item contains the element we want to make space for
    // # index is the index in the list.
    ensureSize(item, index) {
        if (index > this.mask) {
            let currentSize = this.mask + 1;
            let newSize = this.getNextSize(currentSize, index);
            let newMask = newSize - 1;
            var newSeq = new Array(newSize);
            var i = 0;
            while (i <= this.mask) {
                let idx = item - index + i;
                newSeq[idx & newMask] = this.get(idx);
                i++;
            }
            this.items = newSeq;
            this.mask = newMask;
        }
    }
    [Symbol.iterator]() {
        let i = 0;
        return {
            next: () => ({
                done: i >= this.len(),
                value: this.items[i++],
            }),
        };
    }
}
exports.GrowableCircularBuffer = GrowableCircularBuffer;
function init_GCB(size = 16) {
    let powOfTwoSize = (0, math_1.nextPowerOf2)(size);
    let gcb = new GrowableCircularBuffer({
        items: new Array(size),
        mask: powOfTwoSize - 1,
    });
    return gcb;
}
exports.init_GCB = init_GCB;
