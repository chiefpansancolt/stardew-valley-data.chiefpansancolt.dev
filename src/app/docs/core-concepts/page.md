---
title: Core concepts
nextjs:
  metadata:
    title: Core concepts
    description: Understand the QueryBase pattern, terminal methods, immutable chaining, and factory functions that power every data module.
---

Every data module in stardew-valley-data follows the same patterns -- once you learn them here, you can use any module without reading its docs first. {% .lead %}

---

## The QueryBase pattern

At the heart of the package is the `QueryBase<T>` abstract class. Every query builder (CropQuery, FishQuery, VillagerQuery, and so on) extends this class. It provides five standard **terminal methods** that work identically across all modules, plus a consistent approach to filtering and sorting through immutable method chaining.

```ts
abstract class QueryBase<T extends { id: string; name: string }> {
  constructor(protected readonly data: T[]) {}

  get(): T[]
  first(): T | undefined
  find(id: string): T | undefined
  findByName(name: string): T | undefined
  count(): number
}
```

The generic constraint `{ id: string; name: string }` means every item in the dataset has at least an `id` and `name` field, which is what makes `find()` and `findByName()` work universally.

---

## Terminal methods

Terminal methods end a query chain and return results. There are five of them, and they are the same on every query builder.

### `get(): T[]`

Returns all matching results as an array. This is the most common terminal method.

```ts
import { crops } from 'stardew-valley-data'

const allCrops = crops().get()
const summerCrops = crops().bySeason('summer').get()
```

### `first(): T | undefined`

Returns the first result, or `undefined` if the dataset is empty. Useful when you expect a single result from a filtered query.

```ts
import { crops } from 'stardew-valley-data'

const firstCrop = crops().bySeason('spring').sortBySellPrice('desc').first()
// The highest-value spring crop, or undefined
```

### `find(id: string): T | undefined`

Finds an item by its exact ID. Returns `undefined` if no item matches.

```ts
import { fish } from 'stardew-valley-data'

const pufferfish = fish().find('128')
```

### `findByName(name: string): T | undefined`

Finds an item by name using a case-insensitive exact match. Returns `undefined` if no item matches.

```ts
import { villagers } from 'stardew-valley-data'

const penny = villagers().findByName('penny') // matches "Penny"
```

### `count(): number`

Returns the number of results without materializing the full array. Useful for displaying totals or performing checks.

```ts
import { crops } from 'stardew-valley-data'

const springCropCount = crops().bySeason('spring').count()
console.log(`There are ${springCropCount} crops in spring`)
```

---

## Immutable chaining

Every filter and sort method on a query builder returns a **new instance** of that builder. The original is never modified. This means you can safely branch from any point in a chain.

```ts
import { crops } from 'stardew-valley-data'

const summer = crops().bySeason('summer')

// These two queries are completely independent
const regrowing = summer.regrowing().get()
const giant = summer.giant().get()

// The original `summer` query is unchanged
const allSummer = summer.get()
```

This immutable design also means you can store intermediate queries as variables and reuse them:

```ts
import { fish } from 'stardew-valley-data'

const springFish = fish().bySeason('spring')

const rodFish = springFish.byCatchType('rod').get()
const crabPotFish = springFish.byCatchType('crab-pot').get()
const totalSpring = springFish.count()
```

---

## Factory functions

Each module exports a **factory function** that creates a fresh query builder instance. The factory function name matches the data it represents:

| Factory function | Returns         | Data                              |
| ---------------- | --------------- | --------------------------------- |
| `crops()`        | `CropQuery`     | All crops                         |
| `fish()`         | `FishQuery`     | All fish                          |
| `villagers()`    | `VillagerQuery` | All villagers                     |
| `animals()`      | `AnimalQuery`   | All animals (pets + farm animals) |
| `trees()`        | `TreeQuery`     | All trees (fruit + wild)          |
| `weapons()`      | `WeaponQuery`   | All weapons                       |
| `cooking()`      | `CookingQuery`  | All cooking recipes               |
| `minerals()`     | `MineralQuery`  | All minerals                      |
| ...              | ...             | 68 modules total                  |

### Custom source data

Every factory function accepts an optional `source` parameter, allowing you to wrap your own pre-filtered array in a query builder:

```ts
import { crops, Crop } from 'stardew-valley-data'

// Start from a custom subset
const myCrops: Crop[] = getFilteredCropsFromMyAPI()
const query = crops(myCrops)
const regrowing = query.regrowing().sortBySellPrice('desc').get()
```

This is particularly useful when you have data from an external source or want to apply the query builder to a subset you have already filtered by some custom logic.

---

## Putting it all together

Here is a complete example that demonstrates factory functions, chaining, branching, and terminal methods:

```ts
import { crops, fish, villagers } from 'stardew-valley-data'

// Build reusable base queries
const springCrops = crops().bySeason('spring')
const springFish = fish().bySeason('spring')

// Branch for different needs
const topCrop = springCrops.sortBySellPrice('desc').first()
const regrowingCrops = springCrops.regrowing().get()
const easyFish = springFish.sortByDifficulty('asc').first()

// Count items without fetching full arrays
const cropCount = springCrops.count()
const fishCount = springFish.count()

// Look up specific items by name
const penny = villagers().findByName('Penny')

console.log(`Spring has ${cropCount} crops and ${fishCount} fish`)
console.log(`Best spring crop: ${topCrop?.name}`)
console.log(`Easiest spring fish: ${easyFish?.name}`)
```

---

## Next steps

- See the [query builder](/docs/query-builder) page for detailed filter and sort usage across modules
- Learn about [TypeScript integration](/docs/typescript) for types, type guards, and generics
