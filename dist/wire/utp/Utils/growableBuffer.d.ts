export interface IOptionOptions<T> {
    has: boolean;
    value?: T;
}
export declare class Option<T> {
    has: boolean;
    value?: T;
    constructor(options: IOptionOptions<T>);
    get(): T;
    unsafeGet(): T;
    isSome(): boolean;
    isNone(): boolean;
    either(otherwise: T): T;
}
export declare function none<T>(kind?: TypedPropertyDescriptor<T>): Option<T>;
export declare function some<T>(value: T): Option<T>;
export interface IGCBOptions<A> {
    items?: Option<A>[];
    mask?: number;
}
export declare class GrowableCircularBuffer<A> {
    items: Option<A>[];
    mask: number;
    constructor(options?: IGCBOptions<A>);
    get(i: number): Option<A>;
    putImpl(i: number, elem: Option<A>): void;
    put(i: number, elem: A): void;
    delete(i: number): void;
    hasKey(i: number): boolean;
    exists(i: number, check: {
        (x: A): boolean;
    }): boolean;
    contents(i: number): A;
    len(): number;
    getNextSize(currentSize: number, index: number): number;
    ensureSize(item: number, index: number): void;
    [Symbol.iterator](): {
        next: () => {
            done: boolean;
            value: Option<A>;
        };
    };
}
export declare function init_GCB<A>(size?: number): GrowableCircularBuffer<A>;
//# sourceMappingURL=growableBuffer.d.ts.map