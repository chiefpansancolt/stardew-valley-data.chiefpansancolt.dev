---
title: Golden Walnuts
nextjs:
  metadata:
    title: Golden Walnuts
    description: Query and filter Ginger Island Golden Walnut data including locations, hints, tracking types, and amounts.
---

Access the complete dataset of Ginger Island Golden Walnuts with typed location, hint, and tracking information using the chainable `GoldenWalnutQuery` API. {% .lead %}

## Quick Start

```js
import { goldenWalnuts } from 'stardew-valley-data'

// Get all golden walnut sources
const all = goldenWalnuts().get()

// Find walnuts at a specific location
const volcanoWalnuts = goldenWalnuts().byLocation('Volcano').get()

// Get the total walnut count
const total = goldenWalnuts().totalAmount()

// Get walnuts sorted by amount (most first)
const byAmount = goldenWalnuts().sortByAmount('desc').get()
```

## Type Definition

Each golden walnut record conforms to the `GoldenWalnut` interface:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier for the walnut source. |
| `name` | `string` | Description of how to obtain the walnut(s). |
| `amount` | `number` | Number of walnuts awarded from this source. |
| `location` | `string` | Where the walnut(s) can be found on Ginger Island. |
| `hint` | `string` | In-game hint for finding the walnut(s). |
| `trackingType` | `GoldenWalnutTrackingType` | How the game tracks collection (see below). |

### GoldenWalnutTrackingType

| Value | Description |
| --- | --- |
| `'all-at-once'` | All walnuts from this source are collected at once. |
| `'limited'` | Walnuts are collected individually up to a limit. |
| `'extra'` | Extra walnuts beyond the standard collection. |

## Query Methods

`GoldenWalnutQuery` extends `QueryBase` and inherits five terminal methods shared by all query builders:

| Method | Returns | Description |
| --- | --- | --- |
| `get()` | `GoldenWalnut[]` | Return all results as an array. |
| `first()` | `GoldenWalnut \| undefined` | Return the first result. |
| `find(id)` | `GoldenWalnut \| undefined` | Find a walnut source by exact ID. |
| `findByName(name)` | `GoldenWalnut \| undefined` | Find a walnut source by name (case-insensitive). |
| `count()` | `number` | Return the number of results. |

### Filter Methods

| Method | Returns | Description |
| --- | --- | --- |
| `byLocation(location)` | `GoldenWalnutQuery` | Filter by location (case-insensitive substring match). |
| `byTrackingType(type)` | `GoldenWalnutQuery` | Filter by tracking type. Accepts `'all-at-once'`, `'limited'`, or `'extra'`. |

### Sort Methods

| Method | Returns | Description |
| --- | --- | --- |
| `sortByLocation(order?)` | `GoldenWalnutQuery` | Sort alphabetically by location. Pass `'asc'` (default) or `'desc'`. |
| `sortByAmount(order?)` | `GoldenWalnutQuery` | Sort by walnut amount. Pass `'desc'` (default) or `'asc'`. |

### Aggregate Methods

| Method | Returns | Description |
| --- | --- | --- |
| `totalAmount()` | `number` | Total number of walnuts across all entries in the current query. |

## Examples

### Get the total walnut count on the island

```js
import { goldenWalnuts } from 'stardew-valley-data'

const total = goldenWalnuts().totalAmount()
console.log(`Total Golden Walnuts: ${total}`)
```

### List walnuts by location

```js
import { goldenWalnuts } from 'stardew-valley-data'

const volcano = goldenWalnuts().byLocation('Volcano').get()

volcano.forEach((w) => {
  console.log(`${w.name} — ${w.amount} walnut(s)`)
})
```

### Find all limited-tracking walnuts

```js
import { goldenWalnuts } from 'stardew-valley-data'

const limited = goldenWalnuts().byTrackingType('limited').sortByAmount('desc').get()

limited.forEach((w) => {
  console.log(`${w.name}: ${w.amount} (${w.location})`)
})
```

### Get a summary by tracking type

```js
import { goldenWalnuts } from 'stardew-valley-data'

const types = ['all-at-once', 'limited', 'extra']

types.forEach((type) => {
  const query = goldenWalnuts().byTrackingType(type)
  console.log(`${type}: ${query.count()} sources, ${query.totalAmount()} walnuts`)
})
```

### Wrap a pre-filtered array

You can pass an existing `GoldenWalnut[]` array into the `goldenWalnuts()` function to create a new query from it:

```js
import { goldenWalnuts } from 'stardew-valley-data'

const myList = goldenWalnuts().byLocation('Dig Site').get()
const sorted = goldenWalnuts(myList).sortByAmount('desc').get()
```
