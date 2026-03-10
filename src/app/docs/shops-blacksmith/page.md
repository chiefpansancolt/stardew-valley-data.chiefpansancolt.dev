---
title: Blacksmith
nextjs:
  metadata:
    title: Blacksmith
    description: Query Clint's Blacksmith shop stock including ores, coal, and upgrade materials with year-based pricing.
---

Access the complete stock list for Clint's Blacksmith shop with year-based pricing using the chainable `BlacksmithQuery` API. {% .lead %}

## Quick Start

```js
import { blacksmith } from 'stardew-valley-data'

// Get all blacksmith items
const all = blacksmith().get()

// Find an item by name
const coal = blacksmith().findByName('Coal')

// Sort by Year 1 price, cheapest first
const sorted = blacksmith().sortByPrice(1, 'asc').get()
```

## Type Definition

Each item conforms to the `BlacksmithItem` interface:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier. |
| `name` | `string` | Display name of the item. |
| `description` | `string` | In-game description text. |
| `priceYear1` | `number` | Purchase price during Year 1. |
| `priceYear2` | `number` | Purchase price during Year 2 and beyond. |
| `image` | `string` | Path to the item's image. |

## Query Methods

`BlacksmithQuery` extends `QueryBase` and inherits five terminal methods shared by all query builders:

| Method | Returns | Description |
| --- | --- | --- |
| `get()` | `BlacksmithItem[]` | Return all results as an array. |
| `first()` | `BlacksmithItem \| undefined` | Return the first result. |
| `find(id)` | `BlacksmithItem \| undefined` | Find an item by exact ID. |
| `findByName(name)` | `BlacksmithItem \| undefined` | Find an item by name (case-insensitive). |
| `count()` | `number` | Return the number of results. |

### Sort Methods

| Method | Returns | Description |
| --- | --- | --- |
| `sortByPrice(year?, order?)` | `BlacksmithQuery` | Sort by price for the given year (`1` or `2`, default `1`). Pass `'asc'` (default) or `'desc'`. |
| `sortByName(order?)` | `BlacksmithQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |

## Examples

### Compare Year 1 and Year 2 prices

```js
import { blacksmith } from 'stardew-valley-data'

blacksmith().get().forEach((item) => {
  const diff = item.priceYear2 - item.priceYear1
  console.log(`${item.name}: ${item.priceYear1}g -> ${item.priceYear2}g (${diff > 0 ? '+' : ''}${diff}g)`)
})
```

### Find the most expensive item by Year 2 price

```js
import { blacksmith } from 'stardew-valley-data'

const priciest = blacksmith().sortByPrice(2, 'desc').first()

if (priciest) {
  console.log(`${priciest.name} costs ${priciest.priceYear2}g in Year 2+`)
}
```
