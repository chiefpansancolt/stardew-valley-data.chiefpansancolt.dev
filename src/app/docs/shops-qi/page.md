---
title: Qi's Walnut Room
nextjs:
  metadata:
    title: Qi's Walnut Room
    description: Query Qi's Walnut Room shop stock including items purchased with Qi Gems and Golden Walnuts.
---

Access the complete stock list for Qi's Walnut Room with currency-based filtering using the chainable `QiStockQuery` API. {% .lead %}

## Quick Start

```js
import { qiStock } from 'stardew-valley-data'

// Get all Qi shop items
const all = qiStock().get()

// Get items purchasable with Qi Gems
const qiGemItems = qiStock().byCurrency('qi-gem').get()

// Get recipe unlocks sorted by cost
const recipes = qiStock().recipes().sortByCost().get()

// Get non-recipe items
const items = qiStock().items().get()
```

## Type Definition

Each item conforms to the `QiStockItem` interface:

| Field          | Type                  | Description                              |
| -------------- | --------------------- | ---------------------------------------- |
| `id`           | `string`              | Unique identifier.                       |
| `name`         | `string`              | Display name of the item.                |
| `cost`         | `number`              | Purchase cost in the specified currency. |
| `currency`     | `QiCurrency`          | Currency used for purchase.              |
| `quantity`     | `number`              | Quantity received per purchase.          |
| `description`  | `string`              | In-game description text.                |
| `image`        | `string`              | Path to the item's image.                |
| `isRecipe`     | `boolean`             | Whether this item is a recipe unlock.    |
| `availability` | `string \| undefined` | Special availability condition, if any.  |
| `note`         | `string \| undefined` | Additional notes about the item.         |

### QiCurrency

```ts
type QiCurrency = 'qi-gem' | 'golden-walnut'
```

## Query Methods

`QiStockQuery` extends `QueryBase` and inherits five terminal methods:

| Method             | Returns                    | Description                              |
| ------------------ | -------------------------- | ---------------------------------------- |
| `get()`            | `QiStockItem[]`            | Return all results as an array.          |
| `first()`          | `QiStockItem \| undefined` | Return the first result.                 |
| `find(id)`         | `QiStockItem \| undefined` | Find an item by exact ID.                |
| `findByName(name)` | `QiStockItem \| undefined` | Find an item by name (case-insensitive). |
| `count()`          | `number`                   | Return the number of results.            |

### Filter Methods

| Method                 | Returns        | Description                                             |
| ---------------------- | -------------- | ------------------------------------------------------- |
| `byCurrency(currency)` | `QiStockQuery` | Filter to items purchased with the given currency.      |
| `recipes()`            | `QiStockQuery` | Filter to recipe unlocks only.                          |
| `items()`              | `QiStockQuery` | Filter to non-recipe items only.                        |
| `alwaysAvailable()`    | `QiStockQuery` | Filter to items with no special availability condition. |

### Sort Methods

| Method               | Returns        | Description                                                      |
| -------------------- | -------------- | ---------------------------------------------------------------- |
| `sortByCost(order?)` | `QiStockQuery` | Sort by cost. Pass `'asc'` (default) or `'desc'`.                |
| `sortByName(order?)` | `QiStockQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |

## Examples

### List all Qi Gem items sorted by cost

```js
import { qiStock } from 'stardew-valley-data'

const qiGemItems = qiStock().byCurrency('qi-gem').sortByCost().get()

qiGemItems.forEach((item) => {
  console.log(`${item.name} - ${item.cost} Qi Gems (x${item.quantity})`)
})
```

### Show recipes versus regular items

```js
import { qiStock } from 'stardew-valley-data'

const recipeCount = qiStock().recipes().count()
const itemCount = qiStock().items().count()

console.log(`Recipes: ${recipeCount}`)
console.log(`Items: ${itemCount}`)
```

### Find the most expensive item

```js
import { qiStock } from 'stardew-valley-data'

const priciest = qiStock().sortByCost('desc').first()

if (priciest) {
  console.log(`${priciest.name} costs ${priciest.cost} ${priciest.currency}`)
  if (priciest.note) console.log(`Note: ${priciest.note}`)
}
```
