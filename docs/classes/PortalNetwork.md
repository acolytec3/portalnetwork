[portalnetwork](../README.md) / [Exports](../modules.md) / PortalNetwork

# Class: PortalNetwork

## Hierarchy

- `EventEmitter`

  ↳ **`PortalNetwork`**

## Table of contents

### Constructors

- [constructor](PortalNetwork.md#constructor)

### Properties

- [client](PortalNetwork.md#client)
- [stateNetworkRoutingTable](PortalNetwork.md#statenetworkroutingtable)
- [uTP](PortalNetwork.md#utp)
- [captureRejectionSymbol](PortalNetwork.md#capturerejectionsymbol)
- [captureRejections](PortalNetwork.md#capturerejections)
- [defaultMaxListeners](PortalNetwork.md#defaultmaxlisteners)
- [errorMonitor](PortalNetwork.md#errormonitor)

### Methods

- [addListener](PortalNetwork.md#addlistener)
- [emit](PortalNetwork.md#emit)
- [enableLog](PortalNetwork.md#enablelog)
- [eventNames](PortalNetwork.md#eventnames)
- [getMaxListeners](PortalNetwork.md#getmaxlisteners)
- [handleFindContent](PortalNetwork.md#handlefindcontent)
- [handleFindNodes](PortalNetwork.md#handlefindnodes)
- [handleOffer](PortalNetwork.md#handleoffer)
- [handlePing](PortalNetwork.md#handleping)
- [handleUTPStreamRequest](PortalNetwork.md#handleutpstreamrequest)
- [listenerCount](PortalNetwork.md#listenercount)
- [listeners](PortalNetwork.md#listeners)
- [log](PortalNetwork.md#log)
- [off](PortalNetwork.md#off)
- [on](PortalNetwork.md#on)
- [onTalkReq](PortalNetwork.md#ontalkreq)
- [onTalkResp](PortalNetwork.md#ontalkresp)
- [once](PortalNetwork.md#once)
- [prependListener](PortalNetwork.md#prependlistener)
- [prependOnceListener](PortalNetwork.md#prependoncelistener)
- [rawListeners](PortalNetwork.md#rawlisteners)
- [removeAllListeners](PortalNetwork.md#removealllisteners)
- [removeListener](PortalNetwork.md#removelistener)
- [sendAccept](PortalNetwork.md#sendaccept)
- [sendFindContent](PortalNetwork.md#sendfindcontent)
- [sendFindNodes](PortalNetwork.md#sendfindnodes)
- [sendOffer](PortalNetwork.md#sendoffer)
- [sendPing](PortalNetwork.md#sendping)
- [sendPong](PortalNetwork.md#sendpong)
- [sendUtpStreamRequest](PortalNetwork.md#sendutpstreamrequest)
- [setMaxListeners](PortalNetwork.md#setmaxlisteners)
- [start](PortalNetwork.md#start)
- [getEventListeners](PortalNetwork.md#geteventlisteners)
- [listenerCount](PortalNetwork.md#listenercount)
- [on](PortalNetwork.md#on)
- [once](PortalNetwork.md#once)

## Constructors

### constructor

• **new PortalNetwork**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `IDiscv5CreateOptions` |

#### Overrides

EventEmitter.constructor

#### Defined in

[src/portalnetwork/client.ts:20](https://github.com/ethereumjs/portalnetwork/blob/52c3050/src/portalnetwork/client.ts#L20)

## Properties

### client

• **client**: `Discv5`

#### Defined in

[src/portalnetwork/client.ts:16](https://github.com/ethereumjs/portalnetwork/blob/52c3050/src/portalnetwork/client.ts#L16)

___

### stateNetworkRoutingTable

• **stateNetworkRoutingTable**: [`StateNetworkRoutingTable`](StateNetworkRoutingTable.md)

#### Defined in

[src/portalnetwork/client.ts:17](https://github.com/ethereumjs/portalnetwork/blob/52c3050/src/portalnetwork/client.ts#L17)

___

### uTP

• **uTP**: `UtpProtocol`

#### Defined in

[src/portalnetwork/client.ts:18](https://github.com/ethereumjs/portalnetwork/blob/52c3050/src/portalnetwork/client.ts#L18)

___

### captureRejectionSymbol

▪ `Static` `Readonly` **captureRejectionSymbol**: typeof [`captureRejectionSymbol`](PortalNetwork.md#capturerejectionsymbol)

#### Inherited from

EventEmitter.captureRejectionSymbol

#### Defined in

node_modules/@types/node/events.d.ts:273

___

### captureRejections

▪ `Static` **captureRejections**: `boolean`

Sets or gets the default captureRejection value for all emitters.

#### Inherited from

EventEmitter.captureRejections

#### Defined in

node_modules/@types/node/events.d.ts:278

___

### defaultMaxListeners

▪ `Static` **defaultMaxListeners**: `number`

#### Inherited from

EventEmitter.defaultMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:279

___

### errorMonitor

▪ `Static` `Readonly` **errorMonitor**: typeof [`errorMonitor`](PortalNetwork.md#errormonitor)

This symbol shall be used to install a listener for only monitoring `'error'`
events. Listeners installed using this symbol are called before the regular
`'error'` listeners are called.

Installing a listener using this symbol does not change the behavior once an
`'error'` event is emitted, therefore the process will still crash if no
regular `'error'` listener is installed.

#### Inherited from

EventEmitter.errorMonitor

#### Defined in

node_modules/@types/node/events.d.ts:272

## Methods

### addListener

▸ **addListener**(`eventName`, `listener`): [`PortalNetwork`](PortalNetwork.md)

Alias for `emitter.on(eventName, listener)`.

**`since`** v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`PortalNetwork`](PortalNetwork.md)

#### Inherited from

EventEmitter.addListener

#### Defined in

node_modules/@types/node/events.d.ts:299

___

### emit

▸ **emit**(`eventName`, ...`args`): `boolean`

Synchronously calls each of the listeners registered for the event named`eventName`, in the order they were registered, passing the supplied arguments
to each.

Returns `true` if the event had listeners, `false` otherwise.

```js
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// First listener
myEmitter.on('event', function firstListener() {
  console.log('Helloooo! first listener');
});
// Second listener
myEmitter.on('event', function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
myEmitter.on('event', function thirdListener(...args) {
  const parameters = args.join(', ');
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners('event'));

myEmitter.emit('event', 1, 2, 3, 4, 5);

// Prints:
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
```

**`since`** v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `...args` | `any`[] |

#### Returns

`boolean`

#### Inherited from

EventEmitter.emit

#### Defined in

node_modules/@types/node/events.d.ts:555

___

### enableLog

▸ **enableLog**(`namespaces?`): `void`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `namespaces` | `string` | `"portalnetwork*,discv5:service*,<uTP>*"` | comma separated list of logging namespaces defaults to "portalnetwork*, discv5*" |

#### Returns

`void`

#### Defined in

[src/portalnetwork/client.ts:47](https://github.com/ethereumjs/portalnetwork/blob/52c3050/src/portalnetwork/client.ts#L47)

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol`)[]

Returns an array listing the events for which the emitter has registered
listeners. The values in the array are strings or `Symbol`s.

```js
const EventEmitter = require('events');
const myEE = new EventEmitter();
myEE.on('foo', () => {});
myEE.on('bar', () => {});

const sym = Symbol('symbol');
myEE.on(sym, () => {});

console.log(myEE.eventNames());
// Prints: [ 'foo', 'bar', Symbol(symbol) ]
```

**`since`** v6.0.0

#### Returns

(`string` \| `symbol`)[]

#### Inherited from

EventEmitter.eventNames

#### Defined in

node_modules/@types/node/events.d.ts:614

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to [defaultMaxListeners](PortalNetwork.md#defaultmaxlisteners).

**`since`** v1.0.0

#### Returns

`number`

#### Inherited from

EventEmitter.getMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:471

___

### handleFindContent

▸ `Private` **handleFindContent**(`srcId`, `message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `srcId` | `string` |
| `message` | `ITalkReqMessage` |

#### Returns

`void`

#### Defined in

[src/portalnetwork/client.ts:241](https://github.com/ethereumjs/portalnetwork/blob/52c3050/src/portalnetwork/client.ts#L241)

___

### handleFindNodes

▸ `Private` **handleFindNodes**(`srcId`, `message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `srcId` | `string` |
| `message` | `ITalkReqMessage` |

#### Returns

`void`

#### Defined in

[src/portalnetwork/client.ts:192](https://github.com/ethereumjs/portalnetwork/blob/52c3050/src/portalnetwork/client.ts#L192)

___

### handleOffer

▸ `Private` **handleOffer**(`srcId`, `message`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `srcId` | `string` |
| `message` | `ITalkReqMessage` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/portalnetwork/client.ts:217](https://github.com/ethereumjs/portalnetwork/blob/52c3050/src/portalnetwork/client.ts#L217)

___

### handlePing

▸ `Private` **handlePing**(`srcId`, `message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `srcId` | `string` |
| `message` | `ITalkReqMessage` |

#### Returns

`void`

#### Defined in

[src/portalnetwork/client.ts:181](https://github.com/ethereumjs/portalnetwork/blob/52c3050/src/portalnetwork/client.ts#L181)

___

### handleUTPStreamRequest

▸ `Private` **handleUTPStreamRequest**(`srcId`, `message`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `srcId` | `string` |
| `message` | `ITalkReqMessage` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/portalnetwork/client.ts:252](https://github.com/ethereumjs/portalnetwork/blob/52c3050/src/portalnetwork/client.ts#L252)

___

### listenerCount

▸ **listenerCount**(`eventName`): `number`

Returns the number of listeners listening to the event named `eventName`.

**`since`** v3.2.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event being listened for |

#### Returns

`number`

#### Inherited from

EventEmitter.listenerCount

#### Defined in

node_modules/@types/node/events.d.ts:561

___

### listeners

▸ **listeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
console.log(util.inspect(server.listeners('connection')));
// Prints: [ [Function] ]
```

**`since`** v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

EventEmitter.listeners

#### Defined in

node_modules/@types/node/events.d.ts:484

___

### log

▸ **log**(`msg`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `any` |

#### Returns

`void`

#### Defined in

[src/portalnetwork/client.ts:29](https://github.com/ethereumjs/portalnetwork/blob/52c3050/src/portalnetwork/client.ts#L29)

___

### off

▸ **off**(`eventName`, `listener`): [`PortalNetwork`](PortalNetwork.md)

Alias for `emitter.removeListener()`.

**`since`** v10.0.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`PortalNetwork`](PortalNetwork.md)

#### Inherited from

EventEmitter.off

#### Defined in

node_modules/@types/node/events.d.ts:444

___

### on

▸ **on**(`eventName`, `listener`): [`PortalNetwork`](PortalNetwork.md)

Adds the `listener` function to the end of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
const myEE = new EventEmitter();
myEE.on('foo', () => console.log('a'));
myEE.prependListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

**`since`** v0.1.101

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`PortalNetwork`](PortalNetwork.md)

#### Inherited from

EventEmitter.on

#### Defined in

node_modules/@types/node/events.d.ts:330

___

### onTalkReq

▸ `Private` **onTalkReq**(`srcId`, `sourceId`, `message`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `srcId` | `string` |
| `sourceId` | ``null`` \| `ENR` |
| `message` | `ITalkReqMessage` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/portalnetwork/client.ts:154](https://github.com/ethereumjs/portalnetwork/blob/52c3050/src/portalnetwork/client.ts#L154)

___

### onTalkResp

▸ `Private` **onTalkResp**(`srcId`, `sourceId`, `message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `srcId` | `string` |
| `sourceId` | ``null`` \| `ENR` |
| `message` | `ITalkRespMessage` |

#### Returns

`void`

#### Defined in

[src/portalnetwork/client.ts:177](https://github.com/ethereumjs/portalnetwork/blob/52c3050/src/portalnetwork/client.ts#L177)

___

### once

▸ **once**(`eventName`, `listener`): [`PortalNetwork`](PortalNetwork.md)

Adds a **one-time**`listener` function for the event named `eventName`. The
next time `eventName` is triggered, this listener is removed and then invoked.

```js
server.once('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependOnceListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
const myEE = new EventEmitter();
myEE.once('foo', () => console.log('a'));
myEE.prependOnceListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

**`since`** v0.3.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`PortalNetwork`](PortalNetwork.md)

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/@types/node/events.d.ts:359

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [`PortalNetwork`](PortalNetwork.md)

Adds the `listener` function to the _beginning_ of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.prependListener('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`since`** v6.0.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`PortalNetwork`](PortalNetwork.md)

#### Inherited from

EventEmitter.prependListener

#### Defined in

node_modules/@types/node/events.d.ts:579

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [`PortalNetwork`](PortalNetwork.md)

Adds a **one-time**`listener` function for the event named `eventName` to the_beginning_ of the listeners array. The next time `eventName` is triggered, this
listener is removed, and then invoked.

```js
server.prependOnceListener('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`since`** v6.0.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

[`PortalNetwork`](PortalNetwork.md)

#### Inherited from

EventEmitter.prependOnceListener

#### Defined in

node_modules/@types/node/events.d.ts:595

___

### rawListeners

▸ **rawListeners**(`eventName`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`,
including any wrappers (such as those created by `.once()`).

```js
const emitter = new EventEmitter();
emitter.once('log', () => console.log('log once'));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];

// Logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();

// Logs "log once" to the console and removes the listener
logFnWrapper();

emitter.on('log', () => console.log('log persistently'));
// Will return a new Array with a single function bound by `.on()` above
const newListeners = emitter.rawListeners('log');

// Logs "log persistently" twice
newListeners[0]();
emitter.emit('log');
```

**`since`** v9.4.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

EventEmitter.rawListeners

#### Defined in

node_modules/@types/node/events.d.ts:514

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): [`PortalNetwork`](PortalNetwork.md)

Removes all listeners, or those of the specified `eventName`.

It is bad practice to remove listeners added elsewhere in the code,
particularly when the `EventEmitter` instance was created by some other
component or module (e.g. sockets or file streams).

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`since`** v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `string` \| `symbol` |

#### Returns

[`PortalNetwork`](PortalNetwork.md)

#### Inherited from

EventEmitter.removeAllListeners

#### Defined in

node_modules/@types/node/events.d.ts:455

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`PortalNetwork`](PortalNetwork.md)

Removes the specified `listener` from the listener array for the event named`eventName`.

```js
const callback = (stream) => {
  console.log('someone connected!');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
```

`removeListener()` will remove, at most, one instance of a listener from the
listener array. If any single listener has been added multiple times to the
listener array for the specified `eventName`, then `removeListener()` must be
called multiple times to remove each instance.

Once an event is emitted, all listeners attached to it at the
time of emitting are called in order. This implies that any`removeListener()` or `removeAllListeners()` calls _after_ emitting and_before_ the last listener finishes execution will
not remove them from`emit()` in progress. Subsequent events behave as expected.

```js
const myEmitter = new MyEmitter();

const callbackA = () => {
  console.log('A');
  myEmitter.removeListener('event', callbackB);
};

const callbackB = () => {
  console.log('B');
};

myEmitter.on('event', callbackA);

myEmitter.on('event', callbackB);

// callbackA removes listener callbackB but it will still be called.
// Internal listener array at time of emit [callbackA, callbackB]
myEmitter.emit('event');
// Prints:
//   A
//   B

// callbackB is now removed.
// Internal listener array [callbackA]
myEmitter.emit('event');
// Prints:
//   A
```

Because listeners are managed using an internal array, calling this will
change the position indices of any listener registered _after_ the listener
being removed. This will not impact the order in which listeners are called,
but it means that any copies of the listener array as returned by
the `emitter.listeners()` method will need to be recreated.

When a single function has been added as a handler multiple times for a single
event (as in the example below), `removeListener()` will remove the most
recently added instance. In the example the `once('ping')`listener is removed:

```js
const ee = new EventEmitter();

function pong() {
  console.log('pong');
}

ee.on('ping', pong);
ee.once('ping', pong);
ee.removeListener('ping', pong);

ee.emit('ping');
ee.emit('ping');
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`since`** v0.1.26

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

[`PortalNetwork`](PortalNetwork.md)

#### Inherited from

EventEmitter.removeListener

#### Defined in

node_modules/@types/node/events.d.ts:439

___

### sendAccept

▸ `Private` **sendAccept**(`srcId`, `message`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `srcId` | `string` |
| `message` | `ITalkReqMessage` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/portalnetwork/client.ts:229](https://github.com/ethereumjs/portalnetwork/blob/52c3050/src/portalnetwork/client.ts#L229)

___

### sendFindContent

▸ **sendFindContent**(`dstId`, `key`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dstId` | `string` |
| `key` | `Uint8Array` |

#### Returns

`void`

#### Defined in

[src/portalnetwork/client.ts:103](https://github.com/ethereumjs/portalnetwork/blob/52c3050/src/portalnetwork/client.ts#L103)

___

### sendFindNodes

▸ **sendFindNodes**(`dstId`, `distances`): `void`

Sends a Portal Network Wire Protocol FINDNODES request to a peer requesting other node ENRs

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dstId` | `string` | node id of peer |
| `distances` | `Uint16Array` | distances as defined by subnetwork for node ENRs being requested |

#### Returns

`void`

#### Defined in

[src/portalnetwork/client.ts:85](https://github.com/ethereumjs/portalnetwork/blob/52c3050/src/portalnetwork/client.ts#L85)

___

### sendOffer

▸ **sendOffer**(`dstId`, `contentKeys`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dstId` | `string` |
| `contentKeys` | `Uint8Array`[] |

#### Returns

`void`

#### Defined in

[src/portalnetwork/client.ts:118](https://github.com/ethereumjs/portalnetwork/blob/52c3050/src/portalnetwork/client.ts#L118)

___

### sendPing

▸ **sendPing**(`dstId`): `void`

Sends a Portal Network Wire Protocol PING message to a specified node

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dstId` | `string` | the nodeId of the peer to send a ping to |

#### Returns

`void`

#### Defined in

[src/portalnetwork/client.ts:56](https://github.com/ethereumjs/portalnetwork/blob/52c3050/src/portalnetwork/client.ts#L56)

___

### sendPong

▸ `Private` **sendPong**(`srcId`, `reqId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `srcId` | `string` |
| `reqId` | `bigint` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/portalnetwork/client.ts:140](https://github.com/ethereumjs/portalnetwork/blob/52c3050/src/portalnetwork/client.ts#L140)

___

### sendUtpStreamRequest

▸ **sendUtpStreamRequest**(`dstId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dstId` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/portalnetwork/client.ts:135](https://github.com/ethereumjs/portalnetwork/blob/52c3050/src/portalnetwork/client.ts#L135)

___

### setMaxListeners

▸ **setMaxListeners**(`n`): [`PortalNetwork`](PortalNetwork.md)

By default `EventEmitter`s will print a warning if more than `10` listeners are
added for a particular event. This is a useful default that helps finding
memory leaks. The `emitter.setMaxListeners()` method allows the limit to be
modified for this specific `EventEmitter` instance. The value can be set to`Infinity` (or `0`) to indicate an unlimited number of listeners.

Returns a reference to the `EventEmitter`, so that calls can be chained.

**`since`** v0.3.5

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `number` |

#### Returns

[`PortalNetwork`](PortalNetwork.md)

#### Inherited from

EventEmitter.setMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:465

___

### start

▸ **start**(): `Promise`<`void`\>

Starts the portal network client

#### Returns

`Promise`<`void`\>

#### Defined in

[src/portalnetwork/client.ts:38](https://github.com/ethereumjs/portalnetwork/blob/52c3050/src/portalnetwork/client.ts#L38)

___

### getEventListeners

▸ `Static` **getEventListeners**(`emitter`, `name`): `Function`[]

Returns a copy of the array of listeners for the event named `eventName`.

For `EventEmitter`s this behaves exactly the same as calling `.listeners` on
the emitter.

For `EventTarget`s this is the only way to get the event listeners for the
event target. This is useful for debugging and diagnostic purposes.

```js
const { getEventListeners, EventEmitter } = require('events');

{
  const ee = new EventEmitter();
  const listener = () => console.log('Events are fun');
  ee.on('foo', listener);
  getEventListeners(ee, 'foo'); // [listener]
}
{
  const et = new EventTarget();
  const listener = () => console.log('Events are fun');
  et.addEventListener('foo', listener);
  getEventListeners(et, 'foo'); // [listener]
}
```

**`since`** v15.2.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `DOMEventTarget` \| `EventEmitter` |
| `name` | `string` \| `symbol` |

#### Returns

`Function`[]

#### Inherited from

EventEmitter.getEventListeners

#### Defined in

node_modules/@types/node/events.d.ts:262

___

### listenerCount

▸ `Static` **listenerCount**(`emitter`, `eventName`): `number`

A class method that returns the number of listeners for the given `eventName`registered on the given `emitter`.

```js
const { EventEmitter, listenerCount } = require('events');
const myEmitter = new EventEmitter();
myEmitter.on('event', () => {});
myEmitter.on('event', () => {});
console.log(listenerCount(myEmitter, 'event'));
// Prints: 2
```

**`since`** v0.9.12

**`deprecated`** Since v3.2.0 - Use `listenerCount` instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | The emitter to query |
| `eventName` | `string` \| `symbol` | The event name |

#### Returns

`number`

#### Inherited from

EventEmitter.listenerCount

#### Defined in

node_modules/@types/node/events.d.ts:234

___

### on

▸ `Static` **on**(`emitter`, `eventName`, `options?`): `AsyncIterableIterator`<`any`\>

```js
const { on, EventEmitter } = require('events');

(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo')) {
    // The execution of this inner block is synchronous and it
    // processes one event at a time (even with await). Do not use
    // if concurrent execution is required.
    console.log(event); // prints ['bar'] [42]
  }
  // Unreachable here
})();
```

Returns an `AsyncIterator` that iterates `eventName` events. It will throw
if the `EventEmitter` emits `'error'`. It removes all listeners when
exiting the loop. The `value` returned by each iteration is an array
composed of the emitted event arguments.

An `AbortSignal` can be used to cancel waiting on events:

```js
const { on, EventEmitter } = require('events');
const ac = new AbortController();

(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo', { signal: ac.signal })) {
    // The execution of this inner block is synchronous and it
    // processes one event at a time (even with await). Do not use
    // if concurrent execution is required.
    console.log(event); // prints ['bar'] [42]
  }
  // Unreachable here
})();

process.nextTick(() => ac.abort());
```

**`since`** v13.6.0, v12.16.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `emitter` | `EventEmitter` | - |
| `eventName` | `string` | The name of the event being listened for |
| `options?` | `StaticEventEmitterOptions` | - |

#### Returns

`AsyncIterableIterator`<`any`\>

that iterates `eventName` events emitted by the `emitter`

#### Inherited from

EventEmitter.on

#### Defined in

node_modules/@types/node/events.d.ts:217

___

### once

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

Creates a `Promise` that is fulfilled when the `EventEmitter` emits the given
event or that is rejected if the `EventEmitter` emits `'error'` while waiting.
The `Promise` will resolve with an array of all the arguments emitted to the
given event.

This method is intentionally generic and works with the web platform [EventTarget](https://dom.spec.whatwg.org/#interface-eventtarget) interface, which has no special`'error'` event
semantics and does not listen to the `'error'` event.

```js
const { once, EventEmitter } = require('events');

async function run() {
  const ee = new EventEmitter();

  process.nextTick(() => {
    ee.emit('myevent', 42);
  });

  const [value] = await once(ee, 'myevent');
  console.log(value);

  const err = new Error('kaboom');
  process.nextTick(() => {
    ee.emit('error', err);
  });

  try {
    await once(ee, 'myevent');
  } catch (err) {
    console.log('error happened', err);
  }
}

run();
```

The special handling of the `'error'` event is only used when `events.once()`is used to wait for another event. If `events.once()` is used to wait for the
'`error'` event itself, then it is treated as any other kind of event without
special handling:

```js
const { EventEmitter, once } = require('events');

const ee = new EventEmitter();

once(ee, 'error')
  .then(([err]) => console.log('ok', err.message))
  .catch((err) => console.log('error', err.message));

ee.emit('error', new Error('boom'));

// Prints: ok boom
```

An `AbortSignal` can be used to cancel waiting for the event:

```js
const { EventEmitter, once } = require('events');

const ee = new EventEmitter();
const ac = new AbortController();

async function foo(emitter, event, signal) {
  try {
    await once(emitter, event, { signal });
    console.log('event emitted!');
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Waiting for the event was canceled!');
    } else {
      console.error('There was an error', error.message);
    }
  }
}

foo(ee, 'foo', ac.signal);
ac.abort(); // Abort waiting for the event
ee.emit('foo'); // Prints: Waiting for the event was canceled!
```

**`since`** v11.13.0, v10.16.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `NodeEventTarget` |
| `eventName` | `string` \| `symbol` |
| `options?` | `StaticEventEmitterOptions` |

#### Returns

`Promise`<`any`[]\>

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/@types/node/events.d.ts:157

▸ `Static` **once**(`emitter`, `eventName`, `options?`): `Promise`<`any`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `emitter` | `DOMEventTarget` |
| `eventName` | `string` |
| `options?` | `StaticEventEmitterOptions` |

#### Returns

`Promise`<`any`[]\>

#### Inherited from

EventEmitter.once

#### Defined in

node_modules/@types/node/events.d.ts:158
