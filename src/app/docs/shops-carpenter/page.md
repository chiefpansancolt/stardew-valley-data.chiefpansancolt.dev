---
title: Carpenter
nextjs:
  metadata:
    title: Carpenter
    description: Query Robin's Carpenter Shop stock including materials, recipes, furniture, and day-specific rotating items.
---

Access the complete stock list for Robin's Carpenter Shop with category filters, day-of-week rotation, and recipe filtering using the chainable `CarpenterQuery` API. {% .lead %}

## Quick Start

```js
import { carpenter } from 'stardew-valley-data'

// Get all carpenter items
const all = carpenter().get()

// Get only recipes
const recipes = carpenter().recipes().get()

// Get items available on Monday, sorted by price
const monday = carpenter().byDay('Monday').sortByPrice().get()
```

## Type Definition

Each item conforms to the `CarpenterItem` interface:

| Field          | Type                        | Description                                                     |
| -------------- | --------------------------- | --------------------------------------------------------------- |
| `id`           | `string`                    | Unique identifier.                                              |
| `name`         | `string`                    | Display name of the item.                                       |
| `price`        | `number`                    | Purchase price in gold.                                         |
| `description`  | `string`                    | In-game description text.                                       |
| `image`        | `string`                    | Path to the item's image.                                       |
| `category`     | `CarpenterCategory`         | Item category.                                                  |
| `day`          | `CarpenterDay \| undefined` | Day of the week when available (undefined for permanent stock). |
| `isRecipe`     | `boolean`                   | Whether this item is a crafting recipe.                         |
| `availability` | `string \| undefined`       | Special purchase condition, if any.                             |

### CarpenterCategory

```ts
type CarpenterCategory = 'material' | 'recipe' | 'furniture' | 'craftable'
```

### CarpenterDay

```ts
type CarpenterDay =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'
```

## Query Methods

`CarpenterQuery` extends `QueryBase` and inherits five terminal methods:

| Method             | Returns                      | Description                              |
| ------------------ | ---------------------------- | ---------------------------------------- |
| `get()`            | `CarpenterItem[]`            | Return all results as an array.          |
| `first()`          | `CarpenterItem \| undefined` | Return the first result.                 |
| `find(id)`         | `CarpenterItem \| undefined` | Find an item by exact ID.                |
| `findByName(name)` | `CarpenterItem \| undefined` | Find an item by name (case-insensitive). |
| `count()`          | `number`                     | Return the number of results.            |

### Filter Methods

| Method                 | Returns          | Description                                                                      |
| ---------------------- | ---------------- | -------------------------------------------------------------------------------- |
| `byCategory(category)` | `CarpenterQuery` | Filter to items in the given category.                                           |
| `recipes()`            | `CarpenterQuery` | Filter to crafting recipe items only.                                            |
| `materials()`          | `CarpenterQuery` | Filter to materials (Wood and Stone).                                            |
| `byDay(day)`           | `CarpenterQuery` | Filter to items available on the given day. Permanent items are always included. |
| `permanent()`          | `CarpenterQuery` | Filter to items always available (not day-specific).                             |
| `alwaysAvailable()`    | `CarpenterQuery` | Filter to items with no special purchase condition.                              |

### Sort Methods

| Method                | Returns          | Description                                                      |
| --------------------- | ---------------- | ---------------------------------------------------------------- |
| `sortByPrice(order?)` | `CarpenterQuery` | Sort by price. Pass `'asc'` (default) or `'desc'`.               |
| `sortByName(order?)`  | `CarpenterQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |

## Examples

### List all furniture sorted by price

```js
import { carpenter } from 'stardew-valley-data'

const furniture = carpenter().byCategory('furniture').sortByPrice().get()

furniture.forEach((item) => {
  console.log(`${item.name} - ${item.price}g`)
})
```

### Find day-specific items for each day

```js
import { carpenter } from 'stardew-valley-data'

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
  const count = carpenter().byDay(day).count()
  console.log(`${day}: ${count} items available`)
})
```

### Get all permanent recipes

```js
import { carpenter } from 'stardew-valley-data'

const permanentRecipes = carpenter().permanent().recipes().sortByName().get()

permanentRecipes.forEach((r) => {
  console.log(`${r.name} - ${r.price}g`)
})
```
