---
title: Pierre's General Store
nextjs:
  metadata:
    title: Pierre's General Store
    description: Query Pierre's General Store stock including seasonal seeds, saplings, ingredients, fertilizers, and recipes.
---

Access the complete stock list for Pierre's General Store with seasonal, category, and availability filtering using the chainable `PierreQuery` API. {% .lead %}

## Quick Start

```js
import { pierre } from 'stardew-valley-data'

// Get all Pierre items
const all = pierre().get()

// Get spring items sorted by price
const spring = pierre().bySeason('spring').sortByPrice().get()

// Get seeds only
const seeds = pierre().seeds().get()

// Get always-available items
const available = pierre().alwaysAvailable().get()
```

## Type Definition

Each item conforms to the `PierreItem` interface:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier. |
| `name` | `string` | Display name of the item. |
| `price` | `number` | Purchase price in gold. |
| `description` | `string` | In-game description text. |
| `image` | `string` | Path to the item's image. |
| `seasons` | `Season[]` | Seasons when available. Empty array means year-round. |
| `category` | `PierreCategory` | Item category. |
| `availability` | `string \| undefined` | Special purchase condition, if any. |

### PierreCategory

```ts
type PierreCategory = 'seed' | 'sapling' | 'ingredient' | 'fertilizer' | 'recipe' | 'special'
```

### Season

```ts
type Season = 'spring' | 'summer' | 'fall' | 'winter' | 'ginger island'
```

## Query Methods

`PierreQuery` extends `QueryBase` and inherits five terminal methods:

| Method | Returns | Description |
| --- | --- | --- |
| `get()` | `PierreItem[]` | Return all results as an array. |
| `first()` | `PierreItem \| undefined` | Return the first result. |
| `find(id)` | `PierreItem \| undefined` | Find an item by exact ID. |
| `findByName(name)` | `PierreItem \| undefined` | Find an item by name (case-insensitive). |
| `count()` | `number` | Return the number of results. |

### Filter Methods

| Method | Returns | Description |
| --- | --- | --- |
| `bySeason(season)` | `PierreQuery` | Filter to items available in the given season (includes permanent and multi-season items). |
| `permanent()` | `PierreQuery` | Filter to year-round permanent stock only (no seasonal seeds). |
| `seeds()` | `PierreQuery` | Filter to seasonal seed stock only. |
| `saplings()` | `PierreQuery` | Filter to fruit tree saplings only. |
| `ingredients()` | `PierreQuery` | Filter to cooking ingredients only. |
| `fertilizers()` | `PierreQuery` | Filter to fertilizers and farming supplies only. |
| `recipes()` | `PierreQuery` | Filter to recipe items only. |
| `byCategory(category)` | `PierreQuery` | Filter by category. |
| `alwaysAvailable()` | `PierreQuery` | Filter to items with no special purchase condition. |

### Sort Methods

| Method | Returns | Description |
| --- | --- | --- |
| `sortByPrice(order?)` | `PierreQuery` | Sort by price. Pass `'asc'` (default) or `'desc'`. |
| `sortByName(order?)` | `PierreQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |

## Examples

### List spring seeds sorted by price

```js
import { pierre } from 'stardew-valley-data'

const springSeeds = pierre()
  .bySeason('spring')
  .seeds()
  .sortByPrice()
  .get()

springSeeds.forEach((seed) => {
  console.log(`${seed.name} - ${seed.price}g`)
})
```

### Get all fruit tree saplings

```js
import { pierre } from 'stardew-valley-data'

const saplings = pierre().saplings().sortByPrice().get()

saplings.forEach((s) => {
  console.log(`${s.name} - ${s.price}g`)
})
```

### Compare seasonal availability

```js
import { pierre } from 'stardew-valley-data'

const seasons = ['spring', 'summer', 'fall', 'winter']

seasons.forEach((season) => {
  const count = pierre().bySeason(season).count()
  console.log(`${season}: ${count} items available`)
})
```

### Find recipes that require special conditions

```js
import { pierre } from 'stardew-valley-data'

const specialRecipes = pierre()
  .recipes()
  .get()
  .filter((r) => r.availability !== undefined)

specialRecipes.forEach((r) => {
  console.log(`${r.name} - ${r.price}g (requires: ${r.availability})`)
})
```
