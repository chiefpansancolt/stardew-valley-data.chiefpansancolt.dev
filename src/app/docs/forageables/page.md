---
title: Forageables
nextjs:
  metadata:
    title: Forageables
    description: Query Stardew Valley forageable items by season with sell prices and location data.
---

Access all forageable items in Stardew Valley, filterable by season and sortable by name or sell price. {% .lead %}

## Quick Start

```js
import { forageables } from 'stardew-valley-data'

// All forageables
const all = forageables().get()

// Spring forageables sorted by sell price
const springBest = forageables()
  .bySeason('spring')
  .sortBySellPrice()
  .get()
```

## Type Definition

```ts
interface Forageable {
  id: string
  name: string
  description: string
  seasons: Season[]
  locations: string
  sellPrice: number
  image: string
}
```

### Field Reference

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier. |
| `name` | `string` | Display name (e.g. `"Leek"`). |
| `description` | `string` | In-game description text. |
| `seasons` | `Season[]` | Seasons the item can be foraged (`'spring'`, `'summer'`, `'fall'`, `'winter'`, `'ginger island'`). |
| `locations` | `string` | Description of where the item can be found. |
| `sellPrice` | `number` | Base sell price in gold. |
| `image` | `string` | Path to the image asset. |

## Query Methods

The `forageables()` function returns a `ForageableQuery` instance. All methods return a new `ForageableQuery` for chaining.

### Inherited Methods

| Method | Returns | Description |
| --- | --- | --- |
| `.get()` | `Forageable[]` | Return all results as an array. |
| `.first()` | `Forageable \| undefined` | Return the first result. |
| `.find(id)` | `Forageable \| undefined` | Find by exact ID. |
| `.findByName(name)` | `Forageable \| undefined` | Find by name (case-insensitive). |
| `.count()` | `number` | Return the number of results. |

### Filter Methods

| Method | Signature | Description |
| --- | --- | --- |
| `bySeason` | `bySeason(season: Season)` | Filter to forageables available in the given season. |

### Sort Methods

| Method | Signature | Default | Description |
| --- | --- | --- | --- |
| `sortByName` | `sortByName(order?: 'asc' \| 'desc')` | `'asc'` | Sort alphabetically by name. |
| `sortBySellPrice` | `sortBySellPrice(order?: 'asc' \| 'desc')` | `'desc'` | Sort by sell price (most valuable first). |

## Examples

### Most valuable forageables per season

```js
import { forageables } from 'stardew-valley-data'

const seasons = ['spring', 'summer', 'fall', 'winter']

seasons.forEach(season => {
  const best = forageables().bySeason(season).sortBySellPrice().first()
  if (best) {
    console.log(`Best ${season} forageable: ${best.name} (${best.sellPrice}g)`)
  }
})
```

### Count forageables by season

```js
const springCount = forageables().bySeason('spring').count()
console.log(`There are ${springCount} spring forageables`)
```

### Alphabetical listing

```js
const sorted = forageables().sortByName().get()
sorted.forEach(f => console.log(f.name))
```
