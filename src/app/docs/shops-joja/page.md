---
title: Joja Mart
nextjs:
  metadata:
    title: Joja Mart
    description: Query JojaMart shop stock including seasonal seeds and year-round supplies.
---

Access the complete stock list for JojaMart with seasonal filtering using the chainable `JojaQuery` API. {% .lead %}

## Quick Start

```js
import { joja } from 'stardew-valley-data'

// Get all Joja Mart items
const all = joja().get()

// Get spring items sorted by price
const spring = joja().bySeason('spring').sortByPrice().get()

// Get permanent (year-round) stock only
const permanent = joja().permanent().get()

// Get seasonal seeds
const seeds = joja().seeds().get()
```

## Type Definition

Each item conforms to the `JojaItem` interface:

| Field          | Type                  | Description                                           |
| -------------- | --------------------- | ----------------------------------------------------- |
| `id`           | `string`              | Unique identifier.                                    |
| `name`         | `string`              | Display name of the item.                             |
| `price`        | `number`              | Purchase price in gold.                               |
| `description`  | `string`              | In-game description text.                             |
| `image`        | `string`              | Path to the item's image.                             |
| `seasons`      | `Season[]`            | Seasons when available. Empty array means year-round. |
| `availability` | `string \| undefined` | Special purchase condition, if any.                   |

### Season

```ts
type Season = 'spring' | 'summer' | 'fall' | 'winter' | 'ginger island'
```

## Query Methods

`JojaQuery` extends `QueryBase` and inherits five terminal methods:

| Method             | Returns                 | Description                              |
| ------------------ | ----------------------- | ---------------------------------------- |
| `get()`            | `JojaItem[]`            | Return all results as an array.          |
| `first()`          | `JojaItem \| undefined` | Return the first result.                 |
| `find(id)`         | `JojaItem \| undefined` | Find an item by exact ID.                |
| `findByName(name)` | `JojaItem \| undefined` | Find an item by name (case-insensitive). |
| `count()`          | `number`                | Return the number of results.            |

### Filter Methods

| Method              | Returns     | Description                                                                                |
| ------------------- | ----------- | ------------------------------------------------------------------------------------------ |
| `bySeason(season)`  | `JojaQuery` | Filter to items available in the given season (includes permanent and multi-season items). |
| `permanent()`       | `JojaQuery` | Filter to year-round permanent stock only (no seasonal seeds).                             |
| `seeds()`           | `JojaQuery` | Filter to seasonal seed stock only (items with at least one season).                       |
| `alwaysAvailable()` | `JojaQuery` | Filter to items with no special purchase condition.                                        |

### Sort Methods

| Method                | Returns     | Description                                                      |
| --------------------- | ----------- | ---------------------------------------------------------------- |
| `sortByPrice(order?)` | `JojaQuery` | Sort by price. Pass `'asc'` (default) or `'desc'`.               |
| `sortByName(order?)`  | `JojaQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |

## Examples

### Compare seasonal seed availability

```js
import { joja } from 'stardew-valley-data'

const seasons = ['spring', 'summer', 'fall', 'winter']

seasons.forEach((season) => {
  const items = joja().bySeason(season).get()
  console.log(`${season}: ${items.length} items available`)
})
```

### List all permanent stock sorted by name

```js
import { joja } from 'stardew-valley-data'

const permanent = joja().permanent().sortByName().get()

permanent.forEach((item) => {
  console.log(`${item.name} - ${item.price}g`)
})
```

### Find the most expensive seasonal seed

```js
import { joja } from 'stardew-valley-data'

const priciest = joja().seeds().sortByPrice('desc').first()

if (priciest) {
  console.log(
    `${priciest.name} - ${priciest.price}g (${priciest.seasons.join(', ')})`,
  )
}
```
