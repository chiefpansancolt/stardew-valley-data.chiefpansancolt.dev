---
title: Volcano Dungeon Shop
nextjs:
  metadata:
    title: Volcano Dungeon Shop
    description: Query the Volcano Dungeon Dwarf shop stock with mixed currencies including gold, Cinder Shards, and Diamonds.
---

Access the complete stock list for the Volcano Dungeon Dwarf shop with currency and category filtering using the chainable `VolcanoShopQuery` API. {% .lead %}

## Quick Start

```js
import { volcanoShop } from 'stardew-valley-data'

// Get all volcano shop items
const all = volcanoShop().get()

// Get items purchasable with Cinder Shards
const cinderItems = volcanoShop().cinderShardItems().get()

// Get consumables sorted by price
const consumables = volcanoShop().consumables().sortByPrice().get()

// Get gold-priced items
const goldItems = volcanoShop().goldItems().get()
```

## Type Definition

Each item conforms to the `VolcanoShopItem` interface:

| Field          | Type                  | Description                               |
| -------------- | --------------------- | ----------------------------------------- |
| `id`           | `string`              | Unique identifier.                        |
| `name`         | `string`              | Display name of the item.                 |
| `price`        | `number`              | Purchase price in the specified currency. |
| `currency`     | `VolcanoShopCurrency` | Currency used for purchase.               |
| `description`  | `string`              | In-game description text.                 |
| `image`        | `string`              | Path to the item's image.                 |
| `category`     | `VolcanoShopCategory` | Item category.                            |
| `availability` | `string \| undefined` | Special availability condition, if any.   |

### VolcanoShopCurrency

```ts
type VolcanoShopCurrency = 'gold' | 'cinder-shard' | 'diamond'
```

### VolcanoShopCategory

```ts
type VolcanoShopCategory = 'footwear' | 'book' | 'consumable' | 'hat' | 'food'
```

## Query Methods

`VolcanoShopQuery` extends `QueryBase` and inherits five terminal methods:

| Method             | Returns                        | Description                              |
| ------------------ | ------------------------------ | ---------------------------------------- |
| `get()`            | `VolcanoShopItem[]`            | Return all results as an array.          |
| `first()`          | `VolcanoShopItem \| undefined` | Return the first result.                 |
| `find(id)`         | `VolcanoShopItem \| undefined` | Find an item by exact ID.                |
| `findByName(name)` | `VolcanoShopItem \| undefined` | Find an item by name (case-insensitive). |
| `count()`          | `number`                       | Return the number of results.            |

### Filter Methods

| Method                 | Returns            | Description                                             |
| ---------------------- | ------------------ | ------------------------------------------------------- |
| `byCurrency(currency)` | `VolcanoShopQuery` | Filter to items purchased with the specified currency.  |
| `goldItems()`          | `VolcanoShopQuery` | Filter to items purchased with gold.                    |
| `cinderShardItems()`   | `VolcanoShopQuery` | Filter to items purchased with Cinder Shards.           |
| `diamondItems()`       | `VolcanoShopQuery` | Filter to items purchased with Diamonds.                |
| `byCategory(category)` | `VolcanoShopQuery` | Filter by item category.                                |
| `consumables()`        | `VolcanoShopQuery` | Filter to consumable items only.                        |
| `food()`               | `VolcanoShopQuery` | Filter to food items only.                              |
| `alwaysAvailable()`    | `VolcanoShopQuery` | Filter to items with no special availability condition. |

### Sort Methods

| Method                | Returns            | Description                                                      |
| --------------------- | ------------------ | ---------------------------------------------------------------- |
| `sortByPrice(order?)` | `VolcanoShopQuery` | Sort by price. Pass `'asc'` (default) or `'desc'`.               |
| `sortByName(order?)`  | `VolcanoShopQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |

## Examples

### List items grouped by currency

```js
import { volcanoShop } from 'stardew-valley-data'

const currencies = ['gold', 'cinder-shard', 'diamond']

currencies.forEach((currency) => {
  const items = volcanoShop().byCurrency(currency).sortByPrice().get()
  console.log(`\n${currency.toUpperCase()} (${items.length}):`)
  items.forEach((item) => console.log(`  ${item.name} - ${item.price}`))
})
```

### Find the cheapest Cinder Shard item

```js
import { volcanoShop } from 'stardew-valley-data'

const cheapest = volcanoShop().cinderShardItems().sortByPrice().first()

if (cheapest) {
  console.log(`${cheapest.name} costs ${cheapest.price} Cinder Shards`)
}
```

### List all footwear

```js
import { volcanoShop } from 'stardew-valley-data'

const footwear = volcanoShop().byCategory('footwear').sortByName().get()

footwear.forEach((item) => {
  console.log(`${item.name} - ${item.price} ${item.currency}`)
})
```
