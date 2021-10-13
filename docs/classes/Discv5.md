[portalnetwork](../README.md) / [Exports](../modules.md) / Discv5

# Class: Discv5

User-facing service one can use to set up, start and use Discv5.

The service exposes a number of user-facing operations that the user may refer to in their application:
* Adding a new static peers
* Checking the properties of a specific peer
* Performing a lookup for a peer

Additionally, the service offers events when peers are added to the peer table or discovered via lookup.

## Hierarchy

- `Discv5_base`

  ↳ **`Discv5`**

## Table of contents

### Constructors

- [constructor](Discv5.md#constructor)

### Properties

- [ \_emitType](Discv5.md# _emittype)
- [ \_emitterType](Discv5.md# _emittertype)
- [ \_eventsType](Discv5.md# _eventstype)
- [activeLookups](Discv5.md#activelookups)
- [activeNodesResponses](Discv5.md#activenodesresponses)
- [activeRequests](Discv5.md#activerequests)
- [addrVotes](Discv5.md#addrvotes)
- [config](Discv5.md#config)
- [connectedPeers](Discv5.md#connectedpeers)
- [connectionUpdated](Discv5.md#connectionupdated)
- [discovered](Discv5.md#discovered)
- [findEnr](Discv5.md#findenr)
- [kbuckets](Discv5.md#kbuckets)
- [metrics](Discv5.md#metrics)
- [nextLookupId](Discv5.md#nextlookupid)
- [onActiveRequestFailed](Discv5.md#onactiverequestfailed)
- [onAppliedEviction](Discv5.md#onappliedeviction)
- [onEstablished](Discv5.md#onestablished)
- [onFindNode](Discv5.md#onfindnode)
- [onMessage](Discv5.md#onmessage)
- [onNodes](Discv5.md#onnodes)
- [onPendingEviction](Discv5.md#onpendingeviction)
- [onPing](Discv5.md#onping)
- [onPong](Discv5.md#onpong)
- [onRequestFailed](Discv5.md#onrequestfailed)
- [onTalkReq](Discv5.md#ontalkreq)
- [onTalkResp](Discv5.md#ontalkresp)
- [onWhoAreYouRequest](Discv5.md#onwhoareyourequest)
- [pingConnectedPeers](Discv5.md#pingconnectedpeers)
- [requestEnr](Discv5.md#requestenr)
- [retrieveRequest](Discv5.md#retrieverequest)
- [sendLookup](Discv5.md#sendlookup)
- [sendPing](Discv5.md#sendping)
- [sendRequest](Discv5.md#sendrequest)
- [sessionService](Discv5.md#sessionservice)
- [started](Discv5.md#started)

### Accessors

- [bindAddress](Discv5.md#bindaddress)
- [connectedPeerCount](Discv5.md#connectedpeercount)
- [enr](Discv5.md#enr)
- [keypair](Discv5.md#keypair)

### Methods

- [addEnr](Discv5.md#addenr)
- [addListener](Discv5.md#addlistener)
- [broadcastTalkReq](Discv5.md#broadcasttalkreq)
- [emit](Discv5.md#emit)
- [enableLogs](Discv5.md#enablelogs)
- [eventNames](Discv5.md#eventnames)
- [findNode](Discv5.md#findnode)
- [getKadValue](Discv5.md#getkadvalue)
- [getMaxListeners](Discv5.md#getmaxlisteners)
- [isStarted](Discv5.md#isstarted)
- [kadValues](Discv5.md#kadvalues)
- [listenerCount](Discv5.md#listenercount)
- [listeners](Discv5.md#listeners)
- [off](Discv5.md#off)
- [on](Discv5.md#on)
- [once](Discv5.md#once)
- [peerId](Discv5.md#peerid)
- [prependListener](Discv5.md#prependlistener)
- [prependOnceListener](Discv5.md#prependoncelistener)
- [rawListeners](Discv5.md#rawlisteners)
- [removeAllListeners](Discv5.md#removealllisteners)
- [removeListener](Discv5.md#removelistener)
- [sendTalkResp](Discv5.md#sendtalkresp)
- [setMaxListeners](Discv5.md#setmaxlisteners)
- [start](Discv5.md#start)
- [stop](Discv5.md#stop)
- [create](Discv5.md#create)

## Constructors

### constructor

• **new Discv5**(`config`, `sessionService`, `metrics?`)

Default constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `IDiscv5Config` | - |
| `sessionService` | `SessionService` | the service managing sessions underneath. |
| `metrics?` | `IDiscv5Metrics` | - |

#### Overrides

Discv5\_base.constructor

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:89

## Properties

###  \_emitType

• `Optional` ** \_emitType**: `IDiscv5Events`

#### Inherited from

Discv5\_base. \_emitType

#### Defined in

node_modules/strict-event-emitter-types/types/src/index.d.ts:7

___

###  \_emitterType

• `Optional` ** \_emitterType**: `EventEmitter`

#### Inherited from

Discv5\_base. \_emitterType

#### Defined in

node_modules/strict-event-emitter-types/types/src/index.d.ts:5

___

###  \_eventsType

• `Optional` ** \_eventsType**: `IDiscv5Events`

#### Inherited from

Discv5\_base. \_eventsType

#### Defined in

node_modules/strict-event-emitter-types/types/src/index.d.ts:6

___

### activeLookups

• `Private` **activeLookups**: `any`

All the iterative lookups we are currently performing with their ID

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:61

___

### activeNodesResponses

• `Private` **activeNodesResponses**: `any`

Tracks responses received across NODES responses.

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:70

___

### activeRequests

• `Private` **activeRequests**: `any`

RPC requests that have been sent and are awaiting a response.
Some requests are linked to a lookup (spanning multiple req/resp trips)

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:66

___

### addrVotes

• `Private` **addrVotes**: `any`

A map of votes that nodes have made about our external IP address

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:83

___

### config

• `Private` **config**: `any`

Configuration

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:48

___

### connectedPeers

• `Private` **connectedPeers**: `any`

List of peers we have established sessions with and an interval id
the interval handler pings the associated node

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:75

___

### connectionUpdated

• `Private` **connectionUpdated**: `any`

Update the conection status of a node in the routing table

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:164

___

### discovered

• `Private` **discovered**: `any`

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:172

___

### findEnr

• `Private` **findEnr**: `any`

Returns an ENR if one is known for the given NodeId

This includes ENRs from any ongoing lookups not yet in the kad table

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:170

___

### kbuckets

• `Private` **kbuckets**: `any`

Storage of the ENR record for each node

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:57

___

### metrics

• `Private` `Optional` **metrics**: `any`

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:84

___

### nextLookupId

• `Private` **nextLookupId**: `any`

Id for the next lookup that we start

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:79

___

### onActiveRequestFailed

• `Private` **onActiveRequestFailed**: `any`

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:189

___

### onAppliedEviction

• `Private` **onAppliedEviction**: `any`

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:174

___

### onEstablished

• `Private` **onEstablished**: `any`

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:175

___

### onFindNode

• `Private` **onFindNode**: `any`

Sends a NODES response, given a list of found ENRs.
This function splits the nodes up into multiple responses to ensure the response stays below
the maximum packet size

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:184

___

### onMessage

• `Private` **onMessage**: `any`

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:176

___

### onNodes

• `Private` **onNodes**: `any`

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:185

___

### onPendingEviction

• `Private` **onPendingEviction**: `any`

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:173

___

### onPing

• `Private` **onPing**: `any`

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:177

___

### onPong

• `Private` **onPong**: `any`

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:178

___

### onRequestFailed

• `Private` **onRequestFailed**: `any`

A session could not be established or an RPC request timed out

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:193

___

### onTalkReq

• `Private` **onTalkReq**: `any`

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:187

___

### onTalkResp

• `Private` **onTalkResp**: `any`

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:188

___

### onWhoAreYouRequest

• `Private` **onWhoAreYouRequest**: `any`

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:186

___

### pingConnectedPeers

• `Private` **pingConnectedPeers**: `any`

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:142

___

### requestEnr

• `Private` **requestEnr**: `any`

Request an external node's ENR

This logic doesn't fit into a standard request, we likely don't know the ENR,
and would like to send this as a response, with request logic built in.

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:149

___

### retrieveRequest

• `Private` **retrieveRequest**: `any`

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:171

___

### sendLookup

• `Private` **sendLookup**: `any`

Constructs and sends a request to the session service given a target and lookup peer

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:153

___

### sendPing

• `Private` **sendPing**: `any`

Sends a PING request to a node

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:141

___

### sendRequest

• `Private` **sendRequest**: `any`

Sends generic RPC requests.
Each request gets added to known outputs, awaiting a response

Returns true if the request was sent successfully

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:160

___

### sessionService

• `Private` **sessionService**: `any`

Session service that establishes sessions with peers

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:53

___

### started

• `Private` **started**: `any`

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:49

## Accessors

### bindAddress

• `get` **bindAddress**(): `Multiaddr`

#### Returns

`Multiaddr`

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:115

___

### connectedPeerCount

• `get` **connectedPeerCount**(): `number`

#### Returns

`number`

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:119

___

### enr

• `get` **enr**(): `ENR`

#### Returns

`ENR`

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:118

___

### keypair

• `get` **keypair**(): `IKeypair`

#### Returns

`IKeypair`

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:116

## Methods

### addEnr

▸ **addEnr**(`enr`): `void`

Adds a known ENR of a peer participating in Discv5 to the routing table.

This allows pre-populating the kademlia routing table with known addresses,
so that they can be used immediately in following DHT operations involving one of these peers,
without having to dial them upfront.

#### Parameters

| Name | Type |
| :------ | :------ |
| `enr` | `ENRInput` |

#### Returns

`void`

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:114

___

### addListener

▸ **addListener**<`P`, `T`\>(`event`, `listener`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends keyof `IDiscv5Events` |
| `T` | `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `P` |
| `listener` | (...`args`: `ListenerType`<`IDiscv5Events`[`P`]\>) => `void` |

#### Returns

`T`

#### Inherited from

Discv5\_base.addListener

#### Defined in

node_modules/strict-event-emitter-types/types/src/index.d.ts:17

▸ **addListener**(`event`, `listener`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | typeof `assignmentCompatibilityHack` |
| `listener` | (...`args`: `any`[]) => `any` |

#### Returns

`void`

#### Inherited from

Discv5\_base.addListener

#### Defined in

node_modules/strict-event-emitter-types/types/src/index.d.ts:18

___

### broadcastTalkReq

▸ **broadcastTalkReq**(`payload`, `protocol`, `timeout?`): `Promise`<`Buffer`\>

Broadcast TALKREQ message to all nodes in routing table and returns response

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `Buffer` |
| `protocol` | `string` \| `Uint8Array` |
| `timeout?` | `number` |

#### Returns

`Promise`<`Buffer`\>

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:132

___

### emit

▸ **emit**<`P`, `T`\>(`event`, ...`args`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends keyof `IDiscv5Events` |
| `T` | `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `P` |
| `...args` | `ListenerType`<`IDiscv5Events`[`P`]\> |

#### Returns

`T`

#### Inherited from

Discv5\_base.emit

#### Defined in

node_modules/strict-event-emitter-types/types/src/index.d.ts:27

▸ **emit**(`event`, ...`args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | typeof `assignmentCompatibilityHack` |
| `...args` | `any`[] |

#### Returns

`void`

#### Inherited from

Discv5\_base.emit

#### Defined in

node_modules/strict-event-emitter-types/types/src/index.d.ts:28

___

### enableLogs

▸ **enableLogs**(): `void`

#### Returns

`void`

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:137

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

Discv5\_base.eventNames

#### Defined in

node_modules/@types/node/events.d.ts:614

___

### findNode

▸ **findNode**(`target`): `Promise`<`ENR`[]\>

Starts an iterative FIND_NODE lookup

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `string` |

#### Returns

`Promise`<`ENR`[]\>

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:128

___

### getKadValue

▸ **getKadValue**(`nodeId`): `undefined` \| `ENR`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeId` | `string` |

#### Returns

`undefined` \| `ENR`

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:120

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

Returns the current max listener value for the `EventEmitter` which is either
set by `emitter.setMaxListeners(n)` or defaults to {@link defaultMaxListeners}.

**`since`** v1.0.0

#### Returns

`number`

#### Inherited from

Discv5\_base.getMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:471

___

### isStarted

▸ **isStarted**(): `boolean`

#### Returns

`boolean`

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:106

___

### kadValues

▸ **kadValues**(): `ENR`[]

Return all ENRs of nodes currently contained in buckets of the kad routing table

#### Returns

`ENR`[]

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:124

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

Discv5\_base.listenerCount

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

Discv5\_base.listeners

#### Defined in

node_modules/@types/node/events.d.ts:484

___

### off

▸ **off**(`eventName`, `listener`): `EventEmitter`

Alias for `emitter.removeListener()`.

**`since`** v10.0.0

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

`EventEmitter`

#### Inherited from

Discv5\_base.off

#### Defined in

node_modules/@types/node/events.d.ts:444

___

### on

▸ **on**<`P`, `T`\>(`event`, `listener`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends keyof `IDiscv5Events` |
| `T` | `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `P` |
| `listener` | (...`args`: `ListenerType`<`IDiscv5Events`[`P`]\>) => `void` |

#### Returns

`T`

#### Inherited from

Discv5\_base.on

#### Defined in

node_modules/strict-event-emitter-types/types/src/index.d.ts:15

▸ **on**(`event`, `listener`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | typeof `assignmentCompatibilityHack` |
| `listener` | (...`args`: `any`[]) => `any` |

#### Returns

`void`

#### Inherited from

Discv5\_base.on

#### Defined in

node_modules/strict-event-emitter-types/types/src/index.d.ts:16

___

### once

▸ **once**<`P`, `T`\>(`event`, `listener`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends keyof `IDiscv5Events` |
| `T` | `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `P` |
| `listener` | (...`args`: `ListenerType`<`IDiscv5Events`[`P`]\>) => `void` |

#### Returns

`T`

#### Inherited from

Discv5\_base.once

#### Defined in

node_modules/strict-event-emitter-types/types/src/index.d.ts:25

▸ **once**(`event`, `listener`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | typeof `assignmentCompatibilityHack` |
| `listener` | (...`args`: `any`[]) => `any` |

#### Returns

`void`

#### Inherited from

Discv5\_base.once

#### Defined in

node_modules/strict-event-emitter-types/types/src/index.d.ts:26

___

### peerId

▸ **peerId**(): `Promise`<`PeerId`\>

#### Returns

`Promise`<`PeerId`\>

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:117

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): `EventEmitter`

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

`EventEmitter`

#### Inherited from

Discv5\_base.prependListener

#### Defined in

node_modules/@types/node/events.d.ts:579

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): `EventEmitter`

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

`EventEmitter`

#### Inherited from

Discv5\_base.prependOnceListener

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

Discv5\_base.rawListeners

#### Defined in

node_modules/@types/node/events.d.ts:514

___

### removeAllListeners

▸ **removeAllListeners**(`event?`): `EventEmitter`

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

`EventEmitter`

#### Inherited from

Discv5\_base.removeAllListeners

#### Defined in

node_modules/@types/node/events.d.ts:455

___

### removeListener

▸ **removeListener**<`P`, `T`\>(`event`, `listener`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `P` | extends keyof `IDiscv5Events` |
| `T` | `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `P` |
| `listener` | (...`args`: `any`[]) => `any` |

#### Returns

`T`

#### Inherited from

Discv5\_base.removeListener

#### Defined in

node_modules/strict-event-emitter-types/types/src/index.d.ts:21

▸ **removeListener**(`event`, `listener`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | typeof `assignmentCompatibilityHack` |
| `listener` | (...`args`: `any`[]) => `any` |

#### Returns

`void`

#### Inherited from

Discv5\_base.removeListener

#### Defined in

node_modules/strict-event-emitter-types/types/src/index.d.ts:22

___

### sendTalkResp

▸ **sendTalkResp**(`srcId`, `requestId`, `payload`): `Promise`<`void`\>

Send TALKRESP message to requesting node

#### Parameters

| Name | Type |
| :------ | :------ |
| `srcId` | `string` |
| `requestId` | `bigint` |
| `payload` | `Uint8Array` |

#### Returns

`Promise`<`void`\>

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:136

___

### setMaxListeners

▸ **setMaxListeners**(`n`): `EventEmitter`

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

`EventEmitter`

#### Inherited from

Discv5\_base.setMaxListeners

#### Defined in

node_modules/@types/node/events.d.ts:465

___

### start

▸ **start**(): `Promise`<`void`\>

Starts the service and adds all initial bootstrap peers to be considered.

#### Returns

`Promise`<`void`\>

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:101

___

### stop

▸ **stop**(): `Promise`<`void`\>

Stops the service, closing any underlying networking activity.

#### Returns

`Promise`<`void`\>

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:105

___

### create

▸ `Static` **create**(`__namedParameters`): [`Discv5`](Discv5.md)

Convenience method to create a new discv5 service.

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `IDiscv5CreateOptions` |

#### Returns

[`Discv5`](Discv5.md)

#### Defined in

node_modules/@chainsafe/discv5/lib/service/service.d.ts:97
