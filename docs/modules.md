[portalnetwork](README.md) / Exports

# portalnetwork

## Table of contents

### Classes

- [Discv5](classes/Discv5.md)
- [OverlayRoutingTable](classes/OverlayRoutingTable.md)

### Functions

- [distance](modules.md#distance)

## Functions

### distance

▸ `Const` **distance**(`id1`, `id2`): `BN`

Calculates the distance between two ids using the distance function defined here
https://github.com/ethereum/portal-network-specs/blob/master/state-network.md#distance-function

#### Parameters

| Name | Type |
| :------ | :------ |
| `id1` | `string` |
| `id2` | `string` |

#### Returns

`BN`

#### Defined in

[src/dht/util.ts:10](https://github.com/acolytec3/portalnetwork/blob/5a2a82a/src/dht/util.ts#L10)
