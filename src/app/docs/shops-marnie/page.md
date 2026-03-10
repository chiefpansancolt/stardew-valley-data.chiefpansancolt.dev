---
title: Marnie's Ranch
nextjs:
  metadata:
    title: Marnie's Ranch
    description: Query Marnie's Ranch shop stock including animal supplies, tools, and furniture.
---

Access the complete stock list for Marnie's Ranch with category-based filtering using the chainable `MarnieQuery` API. {% .lead %}

## Quick Start

```js
import { marnie } from 'stardew-valley-data'

// Get all Marnie items
const all = marnie().get()

// Get animal supplies sorted by price
const supplies = marnie().animalSupplies().sortByPrice().get()

// Get tools
const tools = marnie().tools().get()

// Find a specific item
const hay = marnie().findByName('Hay')
```

## Type Definition

Each item conforms to the `MarnieItem` interface:

| Field          | Type                  | Description                         |
| -------------- | --------------------- | ----------------------------------- |
| `id`           | `string`              | Unique identifier.                  |
| `name`         | `string`              | Display name of the item.           |
| `price`        | `number`              | Purchase price in gold.             |
| `description`  | `string`              | In-game description text.           |
| `image`        | `string`              | Path to the item's image.           |
| `category`     | `MarnieCategory`      | Item category.                      |
| `availability` | `string \| undefined` | Special purchase condition, if any. |

### MarnieCategory

```ts
type MarnieCategory =
  | 'animal-supply'
  | 'tool'
  | 'furniture'
  | 'catalogue'
  | 'special'
```

## Query Methods

`MarnieQuery` extends `QueryBase` and inherits five terminal methods:

| Method             | Returns                   | Description                              |
| ------------------ | ------------------------- | ---------------------------------------- |
| `get()`            | `MarnieItem[]`            | Return all results as an array.          |
| `first()`          | `MarnieItem \| undefined` | Return the first result.                 |
| `find(id)`         | `MarnieItem \| undefined` | Find an item by exact ID.                |
| `findByName(name)` | `MarnieItem \| undefined` | Find an item by name (case-insensitive). |
| `count()`          | `number`                  | Return the number of results.            |

### Filter Methods

| Method                 | Returns       | Description                                                |
| ---------------------- | ------------- | ---------------------------------------------------------- |
| `byCategory(category)` | `MarnieQuery` | Filter to items in the given category.                     |
| `animalSupplies()`     | `MarnieQuery` | Filter to animal supply items (Hay, Heater, Auto-Grabber). |
| `tools()`              | `MarnieQuery` | Filter to tools (Milk Pail, Shears).                       |
| `furniture()`          | `MarnieQuery` | Filter to furniture and decor items.                       |
| `alwaysAvailable()`    | `MarnieQuery` | Filter to items with no special purchase condition.        |

### Sort Methods

| Method                | Returns       | Description                                                      |
| --------------------- | ------------- | ---------------------------------------------------------------- |
| `sortByPrice(order?)` | `MarnieQuery` | Sort by price. Pass `'asc'` (default) or `'desc'`.               |
| `sortByName(order?)`  | `MarnieQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |

## Examples

### List all items by category

```js
import { marnie } from 'stardew-valley-data'

const categories = [
  'animal-supply',
  'tool',
  'furniture',
  'catalogue',
  'special',
]

categories.forEach((cat) => {
  const items = marnie().byCategory(cat).get()
  if (items.length > 0) {
    console.log(`\n${cat.toUpperCase()} (${items.length}):`)
    items.forEach((item) => console.log(`  ${item.name} - ${item.price}g`))
  }
})
```

### Get the most expensive item

```js
import { marnie } from 'stardew-valley-data'

const priciest = marnie().sortByPrice('desc').first()

if (priciest) {
  console.log(`${priciest.name} costs ${priciest.price}g`)
}
```

### List always-available items

```js
import { marnie } from 'stardew-valley-data'

const available = marnie().alwaysAvailable().sortByName().get()

available.forEach((item) => {
  console.log(`${item.name} - ${item.price}g (${item.category})`)
})
```
