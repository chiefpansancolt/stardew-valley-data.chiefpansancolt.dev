---
title: Willy's Fish Shop
nextjs:
  metadata:
    title: Willy's Fish Shop
    description: Query Willy's Fish Shop stock including fishing rods, bait, tackle, and equipment with fishing level requirements.
---

Access the complete stock list for Willy's Fish Shop with category filtering, fishing level requirements, and sorting using the chainable `WillyQuery` API. {% .lead %}

## Quick Start

```js
import { willy } from 'stardew-valley-data'

// Get all Willy shop items
const all = willy().get()

// Get fishing rods sorted by price
const rods = willy().rods().sortByPrice().get()

// Get items available at fishing level 6
const level6 = willy().byFishingLevel(6).get()

// Get all bait types
const bait = willy().bait().get()
```

## Type Definition

Each item conforms to the `WillyItem` interface:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier. |
| `name` | `string` | Display name of the item. |
| `price` | `number` | Purchase price in gold. |
| `description` | `string` | In-game description text. |
| `image` | `string` | Path to the item's image. |
| `category` | `WillyCategory` | Item category. |
| `fishingLevelRequired` | `number \| undefined` | Minimum fishing level needed to purchase. |
| `availability` | `string \| undefined` | Special purchase condition, if any. |

### WillyCategory

```ts
type WillyCategory = 'rod' | 'bait' | 'tackle' | 'equipment' | 'recipe' | 'furniture'
```

## Query Methods

`WillyQuery` extends `QueryBase` and inherits five terminal methods:

| Method | Returns | Description |
| --- | --- | --- |
| `get()` | `WillyItem[]` | Return all results as an array. |
| `first()` | `WillyItem \| undefined` | Return the first result. |
| `find(id)` | `WillyItem \| undefined` | Find an item by exact ID. |
| `findByName(name)` | `WillyItem \| undefined` | Find an item by name (case-insensitive). |
| `count()` | `number` | Return the number of results. |

### Filter Methods

| Method | Returns | Description |
| --- | --- | --- |
| `rods()` | `WillyQuery` | Filter to fishing rods only. |
| `bait()` | `WillyQuery` | Filter to bait items only. |
| `tackle()` | `WillyQuery` | Filter to tackle items only. |
| `byCategory(category)` | `WillyQuery` | Filter to items in the given category. |
| `byFishingLevel(level)` | `WillyQuery` | Filter to items requiring the given fishing level or lower. |
| `alwaysAvailable()` | `WillyQuery` | Filter to items with no special purchase condition. |

### Sort Methods

| Method | Returns | Description |
| --- | --- | --- |
| `sortByPrice(order?)` | `WillyQuery` | Sort by price. Pass `'asc'` (default) or `'desc'`. |
| `sortByName(order?)` | `WillyQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |
| `sortByFishingLevel(order?)` | `WillyQuery` | Sort by fishing level required. Pass `'asc'` (default) or `'desc'`. |

## Examples

### List all rods by fishing level

```js
import { willy } from 'stardew-valley-data'

const rods = willy().rods().sortByFishingLevel().get()

rods.forEach((rod) => {
  console.log(`${rod.name} - ${rod.price}g (level ${rod.fishingLevelRequired ?? 0})`)
})
```

### Show items available at each fishing level

```js
import { willy } from 'stardew-valley-data'

for (let level = 0; level <= 10; level++) {
  const count = willy().byFishingLevel(level).count()
  console.log(`Fishing level ${level}: ${count} items available`)
}
```

### Get all tackle sorted by price

```js
import { willy } from 'stardew-valley-data'

const tackle = willy().tackle().sortByPrice().get()

tackle.forEach((t) => {
  console.log(`${t.name} - ${t.price}g`)
})
```

### Find items with special availability

```js
import { willy } from 'stardew-valley-data'

const special = willy()
  .get()
  .filter((item) => item.availability !== undefined)

special.forEach((item) => {
  console.log(`${item.name} - requires: ${item.availability}`)
})
```
