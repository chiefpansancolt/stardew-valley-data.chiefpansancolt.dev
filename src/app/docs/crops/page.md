---
title: Crops
nextjs:
  metadata:
    title: Crops
    description: Query and filter Stardew Valley crop data by season, category, shop, and more.
---

Access every plantable crop in Stardew Valley with full growing details, seed prices, and harvest information. {% .lead %}

## Quick Start

```js
import { crops } from 'stardew-valley-data'

// Get all crops
const allCrops = crops().get()

// Summer crops sorted by sell price
const bestSummer = crops().bySeason('summer').sortBySellPrice().get()

// Find a specific crop
const melon = crops().findByName('Melon')
```

## Type Definition

Each crop object has the following shape:

```ts
interface Crop {
  id: string
  name: string
  category: string
  seasons: Season[]
  growDays: number
  regrowDays: number | null
  seedId: string
  seedName: string
  seedBuyPrices: SeedBuyPrice[]
  seedSellPrice: number
  cropSellPrice: number
  harvestQuantity: HarvestQuantity
  trellis: boolean
  giant: boolean
  description: string
  image: string
  seedImage: string
  giantImage?: string
  stages: Stage[]
  energyHealth?: EnergyHealth
  farmingXP?: number
}
```

### Field Reference

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier for the crop. |
| `name` | `string` | Display name (e.g. `"Melon"`). |
| `category` | `string` | Category label such as `"Vegetable"` or `"Fruit"`. |
| `seasons` | `Season[]` | Seasons the crop can grow in (`'spring'`, `'summer'`, `'fall'`, `'winter'`, `'ginger island'`). |
| `growDays` | `number` | Total days from planting to first harvest. |
| `regrowDays` | `number \| null` | Days between subsequent harvests, or `null` if the crop does not regrow. |
| `seedId` | `string` | ID of the seed item. |
| `seedName` | `string` | Display name of the seed. |
| `seedBuyPrices` | `SeedBuyPrice[]` | Array of `{ place, price }` objects listing where the seed can be purchased. |
| `seedSellPrice` | `number` | Sell price of the seed. |
| `cropSellPrice` | `number` | Base sell price of the harvested crop. |
| `harvestQuantity` | `HarvestQuantity` | Object with `min` and `max` harvest amounts. |
| `trellis` | `boolean` | Whether the crop requires a trellis (blocks walking). |
| `giant` | `boolean` | Whether the crop can grow into a giant crop. |
| `description` | `string` | In-game description text. |
| `image` | `string` | Path to the crop image asset. |
| `seedImage` | `string` | Path to the seed image asset. |
| `giantImage` | `string \| undefined` | Path to the giant crop image, if applicable. |
| `stages` | `Stage[]` | Array of `{ name, image }` objects for each growth stage. |
| `energyHealth` | `EnergyHealth \| undefined` | Energy and health restored when eaten, if edible. |
| `farmingXP` | `number \| undefined` | Farming XP gained on harvest. |

## Query Methods

The `crops()` function returns a `CropQuery` instance. All filter and sort methods return a new `CropQuery`, so you can chain them in any order.

### Inherited Methods

These terminal methods are available on every query builder:

| Method | Returns | Description |
| --- | --- | --- |
| `.get()` | `Crop[]` | Return all results as an array. |
| `.first()` | `Crop \| undefined` | Return the first result. |
| `.find(id)` | `Crop \| undefined` | Find a crop by exact ID. |
| `.findByName(name)` | `Crop \| undefined` | Find a crop by name (case-insensitive). |
| `.count()` | `number` | Return the number of results. |

### Filter Methods

| Method | Signature | Description |
| --- | --- | --- |
| `bySeason` | `bySeason(season: Season)` | Filter to crops available in the given season. |
| `byCategory` | `byCategory(category: string)` | Filter by category (e.g. `'Vegetable'`, `'Fruit'`). |
| `byShop` | `byShop(shop: string)` | Filter to crops whose seed is sold at the given shop (case-insensitive). |
| `regrowing` | `regrowing()` | Filter to crops that regrow after harvesting. |
| `giant` | `giant()` | Filter to crops that can become giant crops. |
| `trellis` | `trellis()` | Filter to crops that require a trellis. |
| `multiSeason` | `multiSeason()` | Filter to crops available in more than one season. |
| `extraHarvest` | `extraHarvest()` | Filter to crops that can yield more than one item per harvest. |
| `availableInShop` | `availableInShop()` | Filter to crops whose seeds can be purchased from a shop. |
| `eatable` | `eatable()` | Filter to crops that are edible (have energy/health values). |

### Sort Methods

| Method | Signature | Default | Description |
| --- | --- | --- | --- |
| `sortBySellPrice` | `sortBySellPrice(order?: 'asc' \| 'desc')` | `'desc'` | Sort by crop sell price. |
| `sortByGrowDays` | `sortByGrowDays(order?: 'asc' \| 'desc')` | `'asc'` | Sort by total grow days. |

## Examples

### Best regrowing crops for summer

```js
import { crops } from 'stardew-valley-data'

const regrowers = crops()
  .bySeason('summer')
  .regrowing()
  .sortBySellPrice()
  .get()

regrowers.forEach(c => {
  console.log(`${c.name}: ${c.cropSellPrice}g (regrows in ${c.regrowDays} days)`)
})
```

### Find all giant crops

```js
const giantCrops = crops().giant().get()
// Returns crops like Cauliflower, Melon, Pumpkin, etc.
```

### Crops available at Pierre's shop

```js
const pierreCrops = crops().byShop("Pierre's").get()
console.log(`Pierre sells seeds for ${pierreCrops.length} crops`)
```

### Multi-season crops sorted by grow time

```js
const multiSeason = crops()
  .multiSeason()
  .sortByGrowDays()
  .get()
```
