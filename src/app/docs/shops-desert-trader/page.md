---
title: Desert Trader
nextjs:
  metadata:
    title: Desert Trader
    description: Query the Desert Trader's barter stock including day-rotating items and trade costs.
---

Access the complete barter stock for the Desert Trader in the Calico Desert, where items are traded for goods rather than gold, using the chainable `DesertTraderQuery` API. {% .lead %}

## Quick Start

```js
import { desertTrader } from 'stardew-valley-data'

// Get all desert trader items
const all = desertTrader().get()

// Get permanent (non-rotating) items
const permanent = desertTrader().permanent().get()

// Get items available on Wednesday
const wednesday = desertTrader().byDay('Wednesday').get()

// Get recipe trades only
const recipes = desertTrader().recipes().get()
```

## Type Definition

Each item conforms to the `DesertTraderItem` interface:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier. |
| `name` | `string` | Display name of the item received. |
| `description` | `string` | In-game description text. |
| `image` | `string` | Path to the item's image. |
| `tradeItemId` | `string` | ID of the item required for the trade. |
| `tradeItemName` | `string` | Display name of the trade item. |
| `tradeItemImage` | `string` | Path to the trade item's image. |
| `tradeAmount` | `number` | Quantity of the trade item required. |
| `day` | `DesertTraderDay \| undefined` | Day of the week when available (undefined for permanent stock). |
| `isRecipe` | `boolean \| undefined` | Whether this trade yields a recipe. |
| `availability` | `string \| undefined` | Special purchase condition, if any. |

### DesertTraderDay

```ts
type DesertTraderDay =
  | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday'
  | 'Friday' | 'Saturday' | 'Sunday'
```

## Query Methods

`DesertTraderQuery` extends `QueryBase` and inherits five terminal methods:

| Method | Returns | Description |
| --- | --- | --- |
| `get()` | `DesertTraderItem[]` | Return all results as an array. |
| `first()` | `DesertTraderItem \| undefined` | Return the first result. |
| `find(id)` | `DesertTraderItem \| undefined` | Find an item by exact ID. |
| `findByName(name)` | `DesertTraderItem \| undefined` | Find an item by name (case-insensitive). |
| `count()` | `number` | Return the number of results. |

### Filter Methods

| Method | Returns | Description |
| --- | --- | --- |
| `permanent()` | `DesertTraderQuery` | Filter to items always in stock (no day restriction). |
| `daily()` | `DesertTraderQuery` | Filter to day-specific rotating items only. |
| `byDay(day)` | `DesertTraderQuery` | Filter to all items available on the given day (permanent + that day's rotating item). |
| `recipes()` | `DesertTraderQuery` | Filter to recipe items only. |
| `byTradeItem(tradeItemId)` | `DesertTraderQuery` | Filter to items traded for the specified trade item (by item ID). |
| `alwaysAvailable()` | `DesertTraderQuery` | Filter to items with no special availability condition. |

### Sort Methods

| Method | Returns | Description |
| --- | --- | --- |
| `sortByTradeAmount(order?)` | `DesertTraderQuery` | Sort by trade amount. Pass `'asc'` (default) or `'desc'`. |
| `sortByName(order?)` | `DesertTraderQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |

## Examples

### List the daily rotating stock

```js
import { desertTrader } from 'stardew-valley-data'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

days.forEach((day) => {
  const items = desertTrader().byDay(day).get()
  console.log(`${day}: ${items.length} items available`)
})
```

### Find all trades requiring a specific item

```js
import { desertTrader } from 'stardew-valley-data'

const omniGeodeTrades = desertTrader().byTradeItem('omni_geode').get()

omniGeodeTrades.forEach((item) => {
  console.log(`${item.tradeAmount}x ${item.tradeItemName} -> ${item.name}`)
})
```

### Get recipes sorted by trade cost

```js
import { desertTrader } from 'stardew-valley-data'

const recipes = desertTrader()
  .recipes()
  .sortByTradeAmount()
  .get()

recipes.forEach((r) => {
  console.log(`${r.name}: ${r.tradeAmount}x ${r.tradeItemName}`)
})
```
