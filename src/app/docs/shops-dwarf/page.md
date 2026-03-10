---
title: Dwarf
nextjs:
  metadata:
    title: Dwarf
    description: Query the Dwarf's shop stock in the Mines including bombs, consumables, and crafting recipes.
---

Access the complete stock list for the Dwarf's shop in the Mines with category-based filtering using the chainable `DwarfShopQuery` API. {% .lead %}

## Quick Start

```js
import { dwarfShop } from 'stardew-valley-data'

// Get all dwarf shop items
const all = dwarfShop().get()

// Get explosives sorted by price
const bombs = dwarfShop().explosives().sortByPrice().get()

// Find a specific item
const item = dwarfShop().findByName('Mega Bomb')
```

## Type Definition

Each item conforms to the `DwarfShopItem` interface:

| Field         | Type                | Description               |
| ------------- | ------------------- | ------------------------- |
| `id`          | `string`            | Unique identifier.        |
| `name`        | `string`            | Display name of the item. |
| `description` | `string`            | In-game description text. |
| `price`       | `number`            | Purchase price in gold.   |
| `image`       | `string`            | Path to the item's image. |
| `category`    | `DwarfShopCategory` | Item category.            |

### DwarfShopCategory

```ts
type DwarfShopCategory =
  | 'explosive'
  | 'food'
  | 'consumable'
  | 'recipe'
  | 'decoration'
  | 'scarecrow'
  | 'book'
```

## Query Methods

`DwarfShopQuery` extends `QueryBase` and inherits five terminal methods:

| Method             | Returns                      | Description                              |
| ------------------ | ---------------------------- | ---------------------------------------- |
| `get()`            | `DwarfShopItem[]`            | Return all results as an array.          |
| `first()`          | `DwarfShopItem \| undefined` | Return the first result.                 |
| `find(id)`         | `DwarfShopItem \| undefined` | Find an item by exact ID.                |
| `findByName(name)` | `DwarfShopItem \| undefined` | Find an item by name (case-insensitive). |
| `count()`          | `number`                     | Return the number of results.            |

### Filter Methods

| Method                 | Returns          | Description                                               |
| ---------------------- | ---------------- | --------------------------------------------------------- |
| `byCategory(category)` | `DwarfShopQuery` | Filter to items in the given category.                    |
| `explosives()`         | `DwarfShopQuery` | Filter to explosive items (Cherry Bomb, Bomb, Mega Bomb). |
| `consumables()`        | `DwarfShopQuery` | Filter to consumable items (Life Elixir, Oil of Garlic).  |
| `recipes()`            | `DwarfShopQuery` | Filter to crafting recipe items.                          |

### Sort Methods

| Method                | Returns          | Description                                                      |
| --------------------- | ---------------- | ---------------------------------------------------------------- |
| `sortByPrice(order?)` | `DwarfShopQuery` | Sort by price. Pass `'asc'` (default) or `'desc'`.               |
| `sortByName(order?)`  | `DwarfShopQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |

## Examples

### List items by category

```js
import { dwarfShop } from 'stardew-valley-data'

const categories = [
  'explosive',
  'food',
  'consumable',
  'recipe',
  'decoration',
  'scarecrow',
  'book',
]

categories.forEach((cat) => {
  const items = dwarfShop().byCategory(cat).get()
  if (items.length > 0) {
    console.log(`\n${cat.toUpperCase()} (${items.length}):`)
    items.forEach((item) => console.log(`  ${item.name} - ${item.price}g`))
  }
})
```

### Find the cheapest explosive

```js
import { dwarfShop } from 'stardew-valley-data'

const cheapest = dwarfShop().explosives().sortByPrice().first()

if (cheapest) {
  console.log(`${cheapest.name} is the cheapest bomb at ${cheapest.price}g`)
}
```
