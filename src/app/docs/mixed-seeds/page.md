---
title: Mixed Seeds
nextjs:
  metadata:
    title: Mixed Seeds
    description: Query Stardew Valley mixed seed data including seasonal crop production and buy prices.
---

Access mixed seed data with seasonal crop production mappings and purchase price information. {% .lead %}

## Quick Start

```js
import { mixedSeeds } from 'stardew-valley-data'

// All mixed seeds
const all = mixedSeeds().get()

// Seeds that produce crops in spring
const springSeeds = mixedSeeds().byProduces('spring').get()

// Seeds that can be purchased
const buyable = mixedSeeds().withBuyPrices().get()
```

## Type Definition

```ts
interface MixedSeed {
  id: string
  name: string
  sellPrice: number
  description: string
  image: string
  buyPrices: SeedBuyPrice[]
  produces: MixedSeedProduces
}

type MixedSeedProduces = Partial<Record<Season, string[]>>
```

### Field Reference

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier. |
| `name` | `string` | Display name. |
| `sellPrice` | `number` | Base sell price in gold. |
| `description` | `string` | In-game description text. |
| `image` | `string` | Path to the image asset. |
| `buyPrices` | `SeedBuyPrice[]` | Array of `{ place, price }` listing purchase locations and costs. |
| `produces` | `MixedSeedProduces` | Mapping of season to crop names that the seed can produce. Keys are season strings; values are string arrays of crop names. Not all seasons may be present. |

### Supporting Types

```ts
interface SeedBuyPrice {
  place: string
  price: number
}

type Season = 'spring' | 'summer' | 'fall' | 'winter' | 'ginger island'
```

## Query Methods

The `mixedSeeds()` function returns a `MixedSeedQuery` instance. All methods return a new `MixedSeedQuery` for chaining.

### Inherited Methods

| Method | Returns | Description |
| --- | --- | --- |
| `.get()` | `MixedSeed[]` | Return all results as an array. |
| `.first()` | `MixedSeed \| undefined` | Return the first result. |
| `.find(id)` | `MixedSeed \| undefined` | Find by exact ID. |
| `.findByName(name)` | `MixedSeed \| undefined` | Find by name (case-insensitive). |
| `.count()` | `number` | Return the number of results. |

### Filter Methods

| Method | Signature | Description |
| --- | --- | --- |
| `byProduces` | `byProduces(season: Season)` | Filter to mixed seeds that can produce crops in the given season. |
| `withBuyPrices` | `withBuyPrices()` | Filter to mixed seeds that have at least one purchase price listed. |

## Examples

### What can mixed seeds grow in summer?

```js
import { mixedSeeds } from 'stardew-valley-data'

const summerSeeds = mixedSeeds().byProduces('summer').get()

summerSeeds.forEach(seed => {
  const crops = seed.produces.summer
  console.log(`${seed.name} can grow: ${crops?.join(', ')}`)
})
```

### Purchasable mixed seeds

```js
const buyable = mixedSeeds().withBuyPrices().get()

buyable.forEach(seed => {
  seed.buyPrices.forEach(bp => {
    console.log(`${seed.name} at ${bp.place}: ${bp.price}g`)
  })
})
```
