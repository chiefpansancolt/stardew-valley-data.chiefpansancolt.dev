---
title: Query builder basics
nextjs:
  metadata:
    title: Query builder basics
    description: Learn how to filter, sort, and combine operations using the chainable query builder API.
---

The query builder API lets you filter and sort any dataset with readable, chainable method calls -- no manual array manipulation required. {% .lead %}

---

## How it works

Every query builder wraps an internal array of typed data. When you call a filter or sort method, it returns a **new** query builder containing only the matching items. You finish the chain with a terminal method (`get()`, `first()`, `find()`, `findByName()`, or `count()`) to extract results.

```ts
import { crops } from 'stardew-valley-data'

const results = crops()          // Start with all crops
  .bySeason('summer')            // Filter to summer crops
  .regrowing()                   // Keep only regrowing crops
  .sortBySellPrice('desc')       // Sort by price, highest first
  .get()                         // Extract the array
```

---

## Chaining filters

Filters are additive -- each one narrows the results further. You can chain as many as you need:

```ts
import { crops } from 'stardew-valley-data'

// Summer crops sold at Pierre's that can grow into giant crops
const giantSummerCrops = crops()
  .bySeason('summer')
  .byShop('Pierre')
  .giant()
  .get()
```

### Crops example

The `CropQuery` provides filters for season, category, shop, regrowing, giant, trellis, multi-season, extra harvest, available in shop, and edibility:

```ts
import { crops } from 'stardew-valley-data'

// Fast-growing spring vegetables
const quickVeggies = crops()
  .bySeason('spring')
  .byCategory('Vegetable')
  .sortByGrowDays('asc')
  .get()

// All multi-season regrowing crops, sorted by value
const perennials = crops()
  .multiSeason()
  .regrowing()
  .sortBySellPrice('desc')
  .get()
```

### Fish example

The `FishQuery` provides filters for season, catch type, weather, and location:

```ts
import { fish } from 'stardew-valley-data'

// Rod-caught fish available on rainy spring days
const rainySpringFish = fish()
  .bySeason('spring')
  .byCatchType('rod')
  .byWeather('rainy')
  .sortByDifficulty('desc')
  .get()

// All ocean fish sorted by name
const oceanFish = fish()
  .byLocation('ocean')
  .sortByName()
  .get()
```

### Villagers example

The `VillagerQuery` provides filters for marriageable status and birthday season:

```ts
import { villagers } from 'stardew-valley-data'

// All marriageable villagers sorted by birthday
const singles = villagers()
  .marriageable()
  .sortByBirthday()
  .get()

// Spring birthdays alphabetically
const springBirthdays = villagers()
  .byBirthdaySeason('spring')
  .sortByName()
  .get()
```

### Animals example

The `AnimalQuery` provides filters for pets, farm animals, building type, harvest method, and purchasability:

```ts
import { animals } from 'stardew-valley-data'

// All coop animals
const coopAnimals = animals()
  .byBuilding('Coop')
  .get()

// Farm animals you can buy at Marnie's
const purchasable = animals()
  .farmAnimals()
  .purchasable()
  .get()
```

### Trees example

The `TreeQuery` provides filters for fruit trees, wild trees, season, and tappable trees:

```ts
import { trees } from 'stardew-valley-data'

// Fruit trees that produce in summer, by value
const summerFruit = trees()
  .bySeason('summer')
  .sortByProduceSellPrice('desc')
  .get()

// Wild trees you can tap
const tappable = trees()
  .tappable()
  .get()
```

---

## Sorting

Sort methods reorder the results without removing any items. Each sort method accepts an `order` parameter -- typically `'asc'` or `'desc'`.

```ts
import { crops } from 'stardew-valley-data'

// Cheapest crops first
const cheapest = crops().sortBySellPrice('asc').get()

// Fastest-growing crops first (default for sortByGrowDays is 'asc')
const fastest = crops().sortByGrowDays().get()
```

Sorts can be combined with filters in any order:

```ts
import { fish } from 'stardew-valley-data'

// Sort first, then filter -- the filter preserves the sort order
const sorted = fish().sortBySellPrice('desc').bySeason('summer').get()

// Filter first, then sort -- equivalent result
const filtered = fish().bySeason('summer').sortBySellPrice('desc').get()
```

---

## Combining operations

### Branching from a shared base

Since each method returns a new instance, you can branch from any intermediate query:

```ts
import { crops } from 'stardew-valley-data'

const summer = crops().bySeason('summer')

const summerFruit = summer.byCategory('Fruit').get()
const summerVeggies = summer.byCategory('Vegetable').get()
const summerCount = summer.count()
```

### Passing results between queries

You can take the output of one query and feed it into another module's factory function using the `source` parameter:

```ts
import { crops, fish } from 'stardew-valley-data'

// Get crop names, then use them to find related fish (conceptual example)
const springCropNames = crops()
  .bySeason('spring')
  .get()
  .map(c => c.name)

// Use the results in application logic
console.log(`Spring crops: ${springCropNames.join(', ')}`)
```

### Wrapping custom data in a query builder

Every factory function accepts a `source` array, so you can apply the query builder to your own data:

```ts
import { crops, Crop } from 'stardew-valley-data'

// Imagine you fetched a subset from your API
const myFavorites: Crop[] = await fetchFavoriteCrops()

// Wrap in a query builder for filtering and sorting
const sorted = crops(myFavorites)
  .regrowing()
  .sortBySellPrice('desc')
  .get()
```

---

## Collecting results

### As an array

```ts
const allCrops = crops().get()               // Crop[]
const names = crops().get().map(c => c.name)  // string[]
```

### First item only

```ts
const best = crops().sortBySellPrice('desc').first()  // Crop | undefined
```

### By ID or name

```ts
const crop = crops().find('248')              // Crop | undefined
const melon = crops().findByName('Melon')     // Crop | undefined
```

### Count

```ts
const total = crops().count()                 // number
```

---

## Common patterns

### Building a lookup table

```ts
import { villagers } from 'stardew-valley-data'

const villagerMap = new Map(
  villagers().get().map(v => [v.id, v])
)

const penny = villagerMap.get('penny_id')
```

### Conditional filtering

```ts
import { crops } from 'stardew-valley-data'

function queryCrops(season?: string, regrowing?: boolean) {
  let query = crops()

  if (season) {
    query = query.bySeason(season as any)
  }
  if (regrowing) {
    query = query.regrowing()
  }

  return query.sortBySellPrice('desc').get()
}
```

### Aggregating data

```ts
import { crops } from 'stardew-valley-data'

const springCrops = crops().bySeason('spring').get()
const totalValue = springCrops.reduce((sum, c) => sum + c.cropSellPrice, 0)
const avgValue = totalValue / springCrops.length

console.log(`Average spring crop value: ${avgValue.toFixed(0)}g`)
```

---

## Next steps

- Explore [TypeScript integration](/docs/typescript) for type-safe querying
- Learn about the cross-module [search utility](/docs/search)
- See individual module pages (e.g., [Crops](/docs/crops), [Fish](/docs/fish)) for module-specific filters and sorts
