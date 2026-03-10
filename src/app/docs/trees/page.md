---
title: Trees
nextjs:
  metadata:
    title: Trees
    description: Query fruit trees and wild trees in Stardew Valley with typed data and chainable filters.
---

Access fruit tree and wild tree data including produce, tapper products, sapling prices, and growth stages. {% .lead %}

## Quick Start

```js
import { trees } from 'stardew-valley-data'

// Get all trees
const allTrees = trees().get()

// Only fruit trees
const fruitTrees = trees().fruitTrees().get()

// Wild trees you can tap
const tappable = trees().tappable().get()
```

## Type Definition

Trees use a discriminated union based on the `type` field. The top-level type is `Tree = FruitTree | WildTree`.

### FruitTree

```ts
interface FruitTree {
  type: 'fruit-tree'
  id: string
  name: string
  saplingId: string
  saplingName: string
  saplingBuyPrices: SeedBuyPrice[]
  saplingSellPrice: number
  seasons: Season[]
  daysToMature: number
  description: string
  image: string
  saplingImage: string
  stages: Stage[]
  produce: FruitTreeProduce
}

interface FruitTreeProduce {
  id: string
  name: string
  sellPrice: number
  image: string
  energyHealth?: EnergyHealth
}
```

| Field | Type | Description |
| --- | --- | --- |
| `type` | `'fruit-tree'` | Discriminator for fruit trees. |
| `id` | `string` | Unique identifier. |
| `name` | `string` | Tree name (e.g. `"Peach Tree"`). |
| `saplingId` | `string` | ID of the sapling item. |
| `saplingName` | `string` | Display name of the sapling. |
| `saplingBuyPrices` | `SeedBuyPrice[]` | Array of `{ place, price }` for sapling purchase locations. |
| `saplingSellPrice` | `number` | Sell price of the sapling. |
| `seasons` | `Season[]` | Seasons the tree produces fruit. |
| `daysToMature` | `number` | Days for the sapling to become a mature tree. |
| `description` | `string` | In-game description. |
| `image` | `string` | Path to tree image asset. |
| `saplingImage` | `string` | Path to sapling image asset. |
| `stages` | `Stage[]` | Growth stage images. |
| `produce` | `FruitTreeProduce` | The fruit this tree produces, with sell price and optional energy/health data. |

### WildTree

```ts
interface WildTree {
  type: 'wild-tree'
  id: string
  name: string
  seedId: string
  seedName: string
  description: string
  image: string
  seedImage: string
  stages: Stage[]
  tapper?: WildTreeTapper
}

interface WildTreeTapper {
  id: string
  name: string
  sellPrice: number
  image: string
  energyHealth?: EnergyHealth
}
```

| Field | Type | Description |
| --- | --- | --- |
| `type` | `'wild-tree'` | Discriminator for wild trees. |
| `id` | `string` | Unique identifier. |
| `name` | `string` | Tree name (e.g. `"Oak Tree"`). |
| `seedId` | `string` | ID of the seed dropped by this tree. |
| `seedName` | `string` | Display name of the seed. |
| `description` | `string` | In-game description. |
| `image` | `string` | Path to tree image asset. |
| `seedImage` | `string` | Path to seed image asset. |
| `stages` | `Stage[]` | Growth stage images. |
| `tapper` | `WildTreeTapper \| undefined` | Product obtained when a tapper is placed on this tree. |

## Query Methods

The `trees()` function returns a `TreeQuery` instance. All methods return a new `TreeQuery` for chaining.

### Inherited Methods

| Method | Returns | Description |
| --- | --- | --- |
| `.get()` | `Tree[]` | Return all results as an array. |
| `.first()` | `Tree \| undefined` | Return the first result. |
| `.find(id)` | `Tree \| undefined` | Find a tree by exact ID. |
| `.findByName(name)` | `Tree \| undefined` | Find a tree by name (case-insensitive). |
| `.count()` | `number` | Return the number of results. |

### Filter Methods

| Method | Signature | Description |
| --- | --- | --- |
| `fruitTrees` | `fruitTrees()` | Filter to fruit trees only. |
| `wildTrees` | `wildTrees()` | Filter to wild trees only. |
| `bySeason` | `bySeason(season: Season)` | Filter fruit trees by producing season. Wild trees are excluded. |
| `tappable` | `tappable()` | Filter to wild trees that can be tapped. |

### Sort Methods

| Method | Signature | Default | Description |
| --- | --- | --- | --- |
| `sortByProduceSellPrice` | `sortByProduceSellPrice(order?: 'asc' \| 'desc')` | `'desc'` | Sort by produce sell price. Uses `produce.sellPrice` for fruit trees and `tapper.sellPrice` for wild trees (0 if untappable). |

## Examples

### Most valuable fruit trees

```js
import { trees } from 'stardew-valley-data'

const valuable = trees()
  .fruitTrees()
  .sortByProduceSellPrice()
  .get()

valuable.forEach(t => {
  console.log(`${t.name}: ${t.produce.sellPrice}g per fruit`)
})
```

### Summer-producing fruit trees

```js
const summerFruit = trees().bySeason('summer').get()
```

### All tappable wild trees

```js
const tapped = trees().tappable().get()

tapped.forEach(t => {
  if (t.type === 'wild-tree' && t.tapper) {
    console.log(`${t.name} produces ${t.tapper.name} (${t.tapper.sellPrice}g)`)
  }
})
```

### Find a tree by name

```js
const oak = trees().findByName('Oak Tree')
```
