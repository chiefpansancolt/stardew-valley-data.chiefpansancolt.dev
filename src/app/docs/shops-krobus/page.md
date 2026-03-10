---
title: Krobus
nextjs:
  metadata:
    title: Krobus
    description: Query Krobus's sewer shop stock including permanent items, daily rotating stock, and stock limits.
---

Access the complete stock list for Krobus's shop in the sewers with permanent and daily rotating stock filtering using the chainable `KrobusQuery` API. {% .lead %}

## Quick Start

```js
import { krobus } from 'stardew-valley-data'

// Get all Krobus items
const all = krobus().get()

// Get permanent stock
const permanent = krobus().permanent().get()

// Get items available on Thursday
const thursday = krobus().byDay('Thursday').get()

// Get recipe items sorted by price
const recipes = krobus().recipes().sortByPrice().get()
```

## Type Definition

Each item conforms to the `KrobusItem` interface:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier. |
| `name` | `string` | Display name of the item. |
| `price` | `number` | Purchase price in gold. |
| `description` | `string` | In-game description text. |
| `image` | `string` | Path to the item's image. |
| `stockType` | `KrobusStockType` | Whether the item is permanent or daily rotating. |
| `day` | `KrobusDay \| undefined` | Day of the week when available (only for daily stock). |
| `stockLimit` | `number` | Maximum quantity you can purchase. |
| `isRecipe` | `boolean` | Whether this item is a recipe. |
| `availability` | `string \| undefined` | Special purchase condition, if any. |

### KrobusStockType

```ts
type KrobusStockType = 'permanent' | 'daily'
```

### KrobusDay

```ts
type KrobusDay = 'Monday' | 'Tuesday' | 'Thursday' | 'Friday' | 'Sunday'
```

## Query Methods

`KrobusQuery` extends `QueryBase` and inherits five terminal methods:

| Method | Returns | Description |
| --- | --- | --- |
| `get()` | `KrobusItem[]` | Return all results as an array. |
| `first()` | `KrobusItem \| undefined` | Return the first result. |
| `find(id)` | `KrobusItem \| undefined` | Find an item by exact ID. |
| `findByName(name)` | `KrobusItem \| undefined` | Find an item by name (case-insensitive). |
| `count()` | `number` | Return the number of results. |

### Filter Methods

| Method | Returns | Description |
| --- | --- | --- |
| `permanent()` | `KrobusQuery` | Filter to year-round permanent stock only. |
| `daily()` | `KrobusQuery` | Filter to daily rotating items only. |
| `byDay(day)` | `KrobusQuery` | Filter to items available on the given day (permanent + that day's rotating item). |
| `recipes()` | `KrobusQuery` | Filter to recipe items only. |
| `alwaysAvailable()` | `KrobusQuery` | Filter to items with no special purchase condition. |

### Sort Methods

| Method | Returns | Description |
| --- | --- | --- |
| `sortByPrice(order?)` | `KrobusQuery` | Sort by price. Pass `'asc'` (default) or `'desc'`. |
| `sortByName(order?)` | `KrobusQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |

## Examples

### Show the daily rotation schedule

```js
import { krobus } from 'stardew-valley-data'

const days = ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Sunday']

days.forEach((day) => {
  const dailyItem = krobus().daily().get().find((i) => i.day === day)
  if (dailyItem) {
    console.log(`${day}: ${dailyItem.name} - ${dailyItem.price}g (limit: ${dailyItem.stockLimit})`)
  }
})
```

### List items with stock limits

```js
import { krobus } from 'stardew-valley-data'

krobus().sortByName().get().forEach((item) => {
  console.log(`${item.name} - ${item.price}g (max ${item.stockLimit})`)
})
```

### Find all recipes

```js
import { krobus } from 'stardew-valley-data'

const recipes = krobus().recipes().sortByPrice().get()

recipes.forEach((r) => {
  console.log(`${r.name} - ${r.price}g`)
})
```
