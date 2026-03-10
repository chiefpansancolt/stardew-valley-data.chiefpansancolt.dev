---
title: Oasis
nextjs:
  metadata:
    title: Oasis
    description: Query Sandy's Oasis shop stock including seeds, food, clothing, and day-rotating items.
---

Access the complete stock list for Sandy's Oasis shop in the Calico Desert with category and day-of-week filtering using the chainable `OasisQuery` API. {% .lead %}

## Quick Start

```js
import { oasis } from 'stardew-valley-data'

// Get all oasis items
const all = oasis().get()

// Get seeds only
const seeds = oasis().seeds().get()

// Get items available on Saturday
const saturday = oasis().byDay('Saturday').get()

// Get permanent stock sorted by price
const permanent = oasis().permanent().sortByPrice().get()
```

## Type Definition

Each item conforms to the `OasisItem` interface:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier. |
| `name` | `string` | Display name of the item. |
| `price` | `number` | Purchase price in gold. |
| `description` | `string` | In-game description text. |
| `image` | `string` | Path to the item's image. |
| `category` | `OasisCategory` | Item category. |
| `day` | `OasisDay \| undefined` | Day of the week when available (undefined for permanent stock). |
| `availability` | `string \| undefined` | Special purchase condition, if any. |

### OasisCategory

```ts
type OasisCategory = 'seed' | 'food' | 'furniture' | 'clothing' | 'special'
```

### OasisDay

```ts
type OasisDay =
  | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday'
  | 'Friday' | 'Saturday' | 'Sunday'
```

## Query Methods

`OasisQuery` extends `QueryBase` and inherits five terminal methods:

| Method | Returns | Description |
| --- | --- | --- |
| `get()` | `OasisItem[]` | Return all results as an array. |
| `first()` | `OasisItem \| undefined` | Return the first result. |
| `find(id)` | `OasisItem \| undefined` | Find an item by exact ID. |
| `findByName(name)` | `OasisItem \| undefined` | Find an item by name (case-insensitive). |
| `count()` | `number` | Return the number of results. |

### Filter Methods

| Method | Returns | Description |
| --- | --- | --- |
| `seeds()` | `OasisQuery` | Filter to seeds only. |
| `food()` | `OasisQuery` | Filter to food items only. |
| `clothing()` | `OasisQuery` | Filter to clothing items only. |
| `byCategory(category)` | `OasisQuery` | Filter to items in the given category. |
| `permanent()` | `OasisQuery` | Filter to items always in stock (no day restriction). |
| `daily()` | `OasisQuery` | Filter to day-specific rotating items only. |
| `byDay(day)` | `OasisQuery` | Filter to all items available on the given day (permanent + that day's item). |
| `alwaysAvailable()` | `OasisQuery` | Filter to items with no special purchase condition. |

### Sort Methods

| Method | Returns | Description |
| --- | --- | --- |
| `sortByPrice(order?)` | `OasisQuery` | Sort by price. Pass `'asc'` (default) or `'desc'`. |
| `sortByName(order?)` | `OasisQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |

## Examples

### List all seeds sorted by price

```js
import { oasis } from 'stardew-valley-data'

const seeds = oasis().seeds().sortByPrice().get()

seeds.forEach((seed) => {
  console.log(`${seed.name} - ${seed.price}g`)
})
```

### Show the daily rotation

```js
import { oasis } from 'stardew-valley-data'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

days.forEach((day) => {
  const dailyItems = oasis().daily().get().filter((i) => i.day === day)
  dailyItems.forEach((item) => {
    console.log(`${day}: ${item.name} - ${item.price}g`)
  })
})
```

### Get clothing and furniture items

```js
import { oasis } from 'stardew-valley-data'

const clothing = oasis().clothing().sortByName().get()
const furniture = oasis().byCategory('furniture').sortByName().get()

console.log(`Clothing: ${clothing.length} items`)
console.log(`Furniture: ${furniture.length} items`)
```
