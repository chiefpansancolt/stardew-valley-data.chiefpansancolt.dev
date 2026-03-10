---
title: Island Trader
nextjs:
  metadata:
    title: Island Trader
    description: Query the Island Trader's barter stock on Ginger Island including day-rotating items and trade costs.
---

Access the complete barter stock for the Island Trader on Ginger Island, where items are traded for goods rather than gold, using the chainable `IslandTraderQuery` API. {% .lead %}

## Quick Start

```js
import { islandTrader } from 'stardew-valley-data'

// Get all island trader items
const all = islandTrader().get()

// Get permanent (non-rotating) items
const permanent = islandTrader().permanent().get()

// Get items available on Tuesday
const tuesday = islandTrader().byDay('Tuesday').get()

// Get recipe trades only
const recipes = islandTrader().recipes().get()
```

## Type Definition

Each item conforms to the `IslandTraderItem` interface:

| Field            | Type                           | Description                                                     |
| ---------------- | ------------------------------ | --------------------------------------------------------------- |
| `id`             | `string`                       | Unique identifier.                                              |
| `name`           | `string`                       | Display name of the item received.                              |
| `description`    | `string`                       | In-game description text.                                       |
| `image`          | `string`                       | Path to the item's image.                                       |
| `tradeItemId`    | `string`                       | ID of the item required for the trade.                          |
| `tradeItemName`  | `string`                       | Display name of the trade item.                                 |
| `tradeItemImage` | `string`                       | Path to the trade item's image.                                 |
| `tradeAmount`    | `number`                       | Quantity of the trade item required.                            |
| `day`            | `IslandTraderDay \| undefined` | Day of the week when available (undefined for permanent stock). |
| `isRecipe`       | `boolean \| undefined`         | Whether this trade yields a recipe.                             |
| `availability`   | `string \| undefined`          | Special availability condition, if any.                         |

### IslandTraderDay

```ts
type IslandTraderDay =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'
```

## Query Methods

`IslandTraderQuery` extends `QueryBase` and inherits five terminal methods:

| Method             | Returns                         | Description                              |
| ------------------ | ------------------------------- | ---------------------------------------- |
| `get()`            | `IslandTraderItem[]`            | Return all results as an array.          |
| `first()`          | `IslandTraderItem \| undefined` | Return the first result.                 |
| `find(id)`         | `IslandTraderItem \| undefined` | Find an item by exact ID.                |
| `findByName(name)` | `IslandTraderItem \| undefined` | Find an item by name (case-insensitive). |
| `count()`          | `number`                        | Return the number of results.            |

### Filter Methods

| Method                     | Returns             | Description                                                                            |
| -------------------------- | ------------------- | -------------------------------------------------------------------------------------- |
| `permanent()`              | `IslandTraderQuery` | Filter to items always in stock (no day restriction and no special availability).      |
| `daily()`                  | `IslandTraderQuery` | Filter to day-specific rotating items only.                                            |
| `byDay(day)`               | `IslandTraderQuery` | Filter to all items available on the given day (permanent + that day's rotating item). |
| `recipes()`                | `IslandTraderQuery` | Filter to recipe items only.                                                           |
| `byTradeItem(tradeItemId)` | `IslandTraderQuery` | Filter to items traded for the specified trade item (by item ID).                      |
| `alwaysAvailable()`        | `IslandTraderQuery` | Filter to items with no special availability condition.                                |

### Sort Methods

| Method                      | Returns             | Description                                                      |
| --------------------------- | ------------------- | ---------------------------------------------------------------- |
| `sortByTradeAmount(order?)` | `IslandTraderQuery` | Sort by trade amount. Pass `'asc'` (default) or `'desc'`.        |
| `sortByName(order?)`        | `IslandTraderQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |

## Examples

### List the daily rotating stock

```js
import { islandTrader } from 'stardew-valley-data'

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

days.forEach((day) => {
  const items = islandTrader().byDay(day).get()
  console.log(`${day}: ${items.length} items available`)
})
```

### Find the most expensive trade

```js
import { islandTrader } from 'stardew-valley-data'

const expensive = islandTrader().sortByTradeAmount('desc').first()

if (expensive) {
  console.log(
    `${expensive.name} costs ${expensive.tradeAmount}x ${expensive.tradeItemName}`,
  )
}
```

### Get all recipe trades sorted by name

```js
import { islandTrader } from 'stardew-valley-data'

const recipes = islandTrader().recipes().sortByName().get()

recipes.forEach((r) => {
  console.log(`${r.name}: ${r.tradeAmount}x ${r.tradeItemName}`)
})
```
