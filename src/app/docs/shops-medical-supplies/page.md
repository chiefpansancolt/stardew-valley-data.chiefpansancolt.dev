---
title: Medical Supplies
nextjs:
  metadata:
    title: Medical Supplies
    description: Query Harvey's Clinic medical supplies including energy and health restoration values.
---

Access the complete stock list for Harvey's Clinic medical supplies with energy and health data using the chainable `MedicalSupplyQuery` API. {% .lead %}

## Quick Start

```js
import { medicalSupplies } from 'stardew-valley-data'

// Get all medical supplies
const all = medicalSupplies().get()

// Sort by price, cheapest first
const sorted = medicalSupplies().sortByPrice().get()

// Find a specific item
const item = medicalSupplies().findByName('Energy Tonic')
```

## Type Definition

Each item conforms to the `MedicalSupply` interface:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier. |
| `name` | `string` | Display name of the item. |
| `price` | `number` | Purchase price in gold. |
| `description` | `string` | In-game description text. |
| `energy` | `number` | Energy restored when consumed. |
| `health` | `number` | Health restored when consumed. |
| `image` | `string` | Path to the item's image. |

## Query Methods

`MedicalSupplyQuery` extends `QueryBase` and inherits five terminal methods:

| Method | Returns | Description |
| --- | --- | --- |
| `get()` | `MedicalSupply[]` | Return all results as an array. |
| `first()` | `MedicalSupply \| undefined` | Return the first result. |
| `find(id)` | `MedicalSupply \| undefined` | Find an item by exact ID. |
| `findByName(name)` | `MedicalSupply \| undefined` | Find an item by name (case-insensitive). |
| `count()` | `number` | Return the number of results. |

### Sort Methods

| Method | Returns | Description |
| --- | --- | --- |
| `sortByPrice(order?)` | `MedicalSupplyQuery` | Sort by price. Pass `'asc'` (default) or `'desc'`. |
| `sortByName(order?)` | `MedicalSupplyQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |

## Examples

### List all items with energy and health values

```js
import { medicalSupplies } from 'stardew-valley-data'

medicalSupplies().sortByPrice().get().forEach((item) => {
  console.log(`${item.name} - ${item.price}g | +${item.energy} energy, +${item.health} health`)
})
```

### Find the best value healing item

```js
import { medicalSupplies } from 'stardew-valley-data'

const items = medicalSupplies().get()

const bestValue = items.reduce((best, item) => {
  const ratio = item.health / item.price
  const bestRatio = best.health / best.price
  return ratio > bestRatio ? item : best
})

console.log(`Best health/gold ratio: ${bestValue.name} (${bestValue.health} HP for ${bestValue.price}g)`)
```
