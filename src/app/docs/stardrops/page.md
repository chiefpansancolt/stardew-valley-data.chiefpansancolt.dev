---
title: Stardrops
nextjs:
  metadata:
    title: Stardrops
    description: Query Stardew Valley stardrop data by acquisition source with the StarDropQuery API.
---

Access the complete dataset of Stardew Valley stardrops and filter by acquisition source using the chainable `StarDropQuery` API. {% .lead %}

## Quick Start

```js
import { starDrops } from 'stardew-valley-data'

// Get all stardrops
const all = starDrops().get()

// Find a specific stardrop by name
const drop = starDrops().findByName('Museum Stardrop')

// Filter by source category
const purchased = starDrops().bySource('purchase').get()

// Get all stardrops sorted by name
const sorted = starDrops().sortByName().get()
```

## Type Definition

Each stardrop record conforms to the `StarDrop` interface:

| Field         | Type             | Description                         |
| ------------- | ---------------- | ----------------------------------- |
| `id`          | `string`         | Unique identifier for the stardrop. |
| `name`        | `string`         | Display name of the stardrop.       |
| `description` | `string`         | How to obtain this stardrop.        |
| `source`      | `StarDropSource` | The acquisition source category.    |
| `image`       | `string`         | Path to the stardrop's image.       |

The `StarDropSource` type is a union of: `'purchase'`, `'exploration'`, `'friendship'`, `'achievement'`, `'collection'`.

## Query Methods

`StarDropQuery` extends `QueryBase` and inherits five terminal methods shared by all query builders:

| Method             | Returns                 | Description                                 |
| ------------------ | ----------------------- | ------------------------------------------- |
| `get()`            | `StarDrop[]`            | Return all results as an array.             |
| `first()`          | `StarDrop \| undefined` | Return the first result.                    |
| `find(id)`         | `StarDrop \| undefined` | Find a stardrop by exact ID.                |
| `findByName(name)` | `StarDrop \| undefined` | Find a stardrop by name (case-insensitive). |
| `count()`          | `number`                | Return the number of results.               |

### Filter Methods

| Method             | Returns         | Description                                                                                                                       |
| ------------------ | --------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `bySource(source)` | `StarDropQuery` | Filter by acquisition source category. Accepts `'purchase'`, `'exploration'`, `'friendship'`, `'achievement'`, or `'collection'`. |

### Sort Methods

| Method               | Returns         | Description                                                      |
| -------------------- | --------------- | ---------------------------------------------------------------- |
| `sortByName(order?)` | `StarDropQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |

## Examples

### List all stardrops with their sources

```js
import { starDrops } from 'stardew-valley-data'

const all = starDrops().sortByName().get()

all.forEach((drop) => {
  console.log(`${drop.name} [${drop.source}]: ${drop.description}`)
})
```

### Count stardrops by source

```js
import { starDrops } from 'stardew-valley-data'

const sources = [
  'purchase',
  'exploration',
  'friendship',
  'achievement',
  'collection',
]

sources.forEach((source) => {
  const count = starDrops().bySource(source).count()
  console.log(`${source}: ${count} stardrop(s)`)
})
```

### Build a stardrop checklist

```js
import { starDrops } from 'stardew-valley-data'

const all = starDrops().get()

// Example: track which stardrops the player has collected
const collected = new Set(['stardrop-1', 'stardrop-3'])

all.forEach((drop) => {
  const status = collected.has(drop.id) ? '[x]' : '[ ]'
  console.log(`${status} ${drop.name} — ${drop.description}`)
})

console.log(`\nCollected: ${collected.size}/${all.length}`)
```

### Find stardrops from friendship

```js
import { starDrops } from 'stardew-valley-data'

const friendshipDrops = starDrops().bySource('friendship').get()

friendshipDrops.forEach((drop) => {
  console.log(`${drop.name}: ${drop.description}`)
})
```

### Wrap a pre-filtered array

```js
import { starDrops } from 'stardew-valley-data'

const filtered = starDrops().bySource('exploration').get()
const sorted = starDrops(filtered).sortByName('desc').get()
```
