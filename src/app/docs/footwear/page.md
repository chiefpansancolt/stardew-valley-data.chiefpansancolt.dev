---
title: Footwear
nextjs:
  metadata:
    title: Footwear
    description: Query Stardew Valley footwear data including boots and shoes with defense and immunity stats.
---

Access every piece of footwear in Stardew Valley with sorting by name, defense, or immunity. {% .lead %}

## Quick Start

```js
import { footwear } from 'stardew-valley-data'

// Get all footwear
const allFootwear = footwear().get()

// Find specific boots
const spaceBoots = footwear().findByName('Space Boots')

// Get footwear sorted by defense
const bestDefense = footwear().sortByDefense('desc').get()
```

## Type Definition

The `Footwear` type represents a single pair of boots or shoes.

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier |
| `name` | `string` | Display name |
| `description` | `string` | In-game description |
| `defense` | `number` | Defense stat bonus |
| `immunity` | `number` | Immunity stat bonus |
| `obtain` | `string` | How to obtain this footwear |
| `image` | `string` | Relative path to the footwear image |

## Query Methods

Create a query with the `footwear()` function. Every sort method returns a new `FootwearQuery`, so you can chain calls in any order.

### Sort Methods

| Method | Signature | Description |
| --- | --- | --- |
| `sortByName` | `sortByName(order?: 'asc' \| 'desc'): FootwearQuery` | Sort alphabetically by name. Default: `'asc'`. |
| `sortByDefense` | `sortByDefense(order?: 'asc' \| 'desc'): FootwearQuery` | Sort by defense stat. Default: `'desc'` (highest defense first). |
| `sortByImmunity` | `sortByImmunity(order?: 'asc' \| 'desc'): FootwearQuery` | Sort by immunity stat. Default: `'desc'` (highest immunity first). |

### Terminal Methods

These methods are inherited from the base query and return actual values instead of a new query.

| Method | Signature | Description |
| --- | --- | --- |
| `get` | `get(): Footwear[]` | Return all results as an array. |
| `first` | `first(): Footwear \| undefined` | Return the first result, or `undefined` if empty. |
| `find` | `find(id: string): Footwear \| undefined` | Find an item by its exact ID. |
| `findByName` | `findByName(name: string): Footwear \| undefined` | Find an item by name (case-insensitive exact match). |
| `count` | `count(): number` | Return the number of results. |

## Examples

### Get the top 5 defensive boots

```js
import { footwear } from 'stardew-valley-data'

const bestDefense = footwear()
  .sortByDefense('desc')
  .get()
  .slice(0, 5)

bestDefense.forEach((f) =>
  console.log(`${f.name}: +${f.defense} Defense, +${f.immunity} Immunity`)
)
```

### Find the best immunity footwear

```js
import { footwear } from 'stardew-valley-data'

const bestImmunity = footwear().sortByImmunity('desc').first()
if (bestImmunity) {
  console.log(`Best immunity: ${bestImmunity.name} (+${bestImmunity.immunity})`)
}
```

### List all footwear alphabetically

```js
import { footwear } from 'stardew-valley-data'

const allBoots = footwear().sortByName().get()
allBoots.forEach((f) =>
  console.log(`${f.name}: DEF ${f.defense} / IMM ${f.immunity} — ${f.obtain}`)
)
```

### Count total footwear

```js
import { footwear } from 'stardew-valley-data'

console.log(`There are ${footwear().count()} footwear items in the game`)
```
