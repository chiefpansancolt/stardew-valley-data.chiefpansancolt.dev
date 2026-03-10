---
title: Perfection
nextjs:
  metadata:
    title: Perfection
    description: Query Stardew Valley perfection tracker categories with weights and requirements using the PerfectionQuery API.
---

Access the Stardew Valley perfection tracker data, including all categories, their requirements, and percentage weights that sum to 100% completion using the `PerfectionQuery` API. {% .lead %}

## Quick Start

```js
import { perfection } from 'stardew-valley-data'

// Get all perfection categories
const all = perfection().get()

// Check the total weight (should be 100)
const total = perfection().totalWeight()

// Find a specific category
const shipping = perfection().findByName('Produce & Forage Shipped')

// Count the number of perfection categories
const count = perfection().count()
```

## Type Definition

Each perfection category conforms to the `PerfectionCategory` interface:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier for the category. |
| `name` | `string` | Display name of the perfection category. |
| `requirement` | `string` | Description of what must be completed. |
| `count` | `number` | Number of items or tasks to complete in this category. |
| `unit` | `string` | The unit of measurement (e.g., `"items"`, `"fish"`, `"friends"`). |
| `weight` | `number` | Percentage weight toward the 100% perfection total. |

## Query Methods

`PerfectionQuery` extends `QueryBase` and inherits five terminal methods shared by all query builders:

| Method | Returns | Description |
| --- | --- | --- |
| `get()` | `PerfectionCategory[]` | Return all results as an array. |
| `first()` | `PerfectionCategory \| undefined` | Return the first result. |
| `find(id)` | `PerfectionCategory \| undefined` | Find a category by exact ID. |
| `findByName(name)` | `PerfectionCategory \| undefined` | Find a category by name (case-insensitive). |
| `count()` | `number` | Return the number of results. |

### Additional Methods

| Method | Returns | Description |
| --- | --- | --- |
| `totalWeight()` | `number` | Returns the sum of all category weights in the current query. For the full dataset this equals 100. |

## Examples

### Display all perfection categories with weights

```js
import { perfection } from 'stardew-valley-data'

const categories = perfection().get()

categories.forEach((cat) => {
  console.log(`${cat.name}: ${cat.weight}% (${cat.count} ${cat.unit})`)
})

console.log(`Total: ${perfection().totalWeight()}%`)
```

### Look up a specific category

```js
import { perfection } from 'stardew-valley-data'

const category = perfection().findByName('Golden Walnuts')

if (category) {
  console.log(`${category.name}`)
  console.log(`Requirement: ${category.requirement}`)
  console.log(`Count: ${category.count} ${category.unit}`)
  console.log(`Weight: ${category.weight}%`)
}
```

### Build a perfection progress tracker

```js
import { perfection } from 'stardew-valley-data'

const categories = perfection().get()

// Example: track player progress as a map of category ID to completed count
const playerProgress = {
  'shipping': 100,
  'obelisks': 4,
  // ... more categories
}

let totalPercent = 0

categories.forEach((cat) => {
  const completed = playerProgress[cat.id] ?? 0
  const percent = (completed / cat.count) * cat.weight
  totalPercent += Math.min(percent, cat.weight)
  console.log(`${cat.name}: ${completed}/${cat.count} (${percent.toFixed(1)}%)`)
})

console.log(`Overall Perfection: ${totalPercent.toFixed(1)}%`)
```

### Verify total weight

```js
import { perfection } from 'stardew-valley-data'

const total = perfection().totalWeight()
console.log(`Total perfection weight: ${total}%`) // Should be 100
```
