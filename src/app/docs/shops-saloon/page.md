---
title: Stardrop Saloon
nextjs:
  metadata:
    title: Stardrop Saloon
    description: Query the Stardrop Saloon shop stock including food, drinks, and cooking recipes from Gus.
---

Access the complete stock list for the Stardrop Saloon with category-based filtering using the chainable `SaloonQuery` API. {% .lead %}

## Quick Start

```js
import { saloon } from 'stardew-valley-data'

// Get all saloon items
const all = saloon().get()

// Get food items sorted by price
const food = saloon().food().sortByPrice().get()

// Get cooking recipes
const recipes = saloon().recipes().get()

// Find a specific item
const item = saloon().findByName('Pizza')
```

## Type Definition

Each item conforms to the `SaloonItem` interface:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier. |
| `name` | `string` | Display name of the item. |
| `price` | `number` | Purchase price in gold. |
| `description` | `string` | In-game description text. |
| `image` | `string` | Path to the item's image. |
| `category` | `SaloonCategory` | Item category. |
| `availability` | `string \| undefined` | Special purchase condition, if any. |

### SaloonCategory

```ts
type SaloonCategory = 'food' | 'recipe'
```

## Query Methods

`SaloonQuery` extends `QueryBase` and inherits five terminal methods:

| Method | Returns | Description |
| --- | --- | --- |
| `get()` | `SaloonItem[]` | Return all results as an array. |
| `first()` | `SaloonItem \| undefined` | Return the first result. |
| `find(id)` | `SaloonItem \| undefined` | Find an item by exact ID. |
| `findByName(name)` | `SaloonItem \| undefined` | Find an item by name (case-insensitive). |
| `count()` | `number` | Return the number of results. |

### Filter Methods

| Method | Returns | Description |
| --- | --- | --- |
| `food()` | `SaloonQuery` | Filter to food and drink items only. |
| `recipes()` | `SaloonQuery` | Filter to cooking recipe items only. |
| `byCategory(category)` | `SaloonQuery` | Filter by category. |
| `alwaysAvailable()` | `SaloonQuery` | Filter to items with no special purchase condition. |

### Sort Methods

| Method | Returns | Description |
| --- | --- | --- |
| `sortByPrice(order?)` | `SaloonQuery` | Sort by price. Pass `'asc'` (default) or `'desc'`. |
| `sortByName(order?)` | `SaloonQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |

## Examples

### List all food items sorted by price

```js
import { saloon } from 'stardew-valley-data'

const food = saloon().food().sortByPrice().get()

food.forEach((item) => {
  console.log(`${item.name} - ${item.price}g`)
})
```

### List all cooking recipes

```js
import { saloon } from 'stardew-valley-data'

const recipes = saloon().recipes().sortByName().get()

recipes.forEach((r) => {
  console.log(`${r.name} - ${r.price}g`)
})
```

### Find items with special availability conditions

```js
import { saloon } from 'stardew-valley-data'

const special = saloon()
  .get()
  .filter((item) => item.availability !== undefined)

special.forEach((item) => {
  console.log(`${item.name} - requires: ${item.availability}`)
})
```
