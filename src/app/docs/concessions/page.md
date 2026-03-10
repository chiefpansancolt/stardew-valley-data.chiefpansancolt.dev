---
title: Concessions
nextjs:
  metadata:
    title: Concessions
    description: Query Movie Theater concession stand items with prices, tags, and filtering by flavor categories.
---

Access the complete dataset of Movie Theater concession stand items with typed price and tag information using the chainable `ConcessionQuery` API. {% .lead %}

## Quick Start

```js
import { concessions } from 'stardew-valley-data'

// Get all concession items
const all = concessions().get()

// Find a specific item by name
const popcorn = concessions().findByName('Popcorn')

// Get sweet concessions sorted by price
const sweets = concessions().byTag('sweet').sortByPrice().get()

// Get the most expensive items
const priciest = concessions().sortByPrice('desc').get()
```

## Type Definition

Each concession record conforms to the `Concession` interface:

| Field   | Type              | Description                                |
| ------- | ----------------- | ------------------------------------------ |
| `id`    | `string`          | Unique identifier for the concession item. |
| `name`  | `string`          | Display name of the concession.            |
| `price` | `number`          | Gold cost at the concession stand.         |
| `tags`  | `ConcessionTag[]` | Flavor and category tags for the item.     |
| `image` | `string`          | Path to the concession image.              |

### ConcessionTag

`'sweet'` | `'candy'` | `'drink'` | `'hot'` | `'healthy'` | `'sour'` | `'fatty'` | `'sandwich'` | `'burger'` | `'cold'` | `'salty'` | `'gourmet'` | `'joja'`

## Query Methods

`ConcessionQuery` extends `QueryBase` and inherits five terminal methods shared by all query builders:

| Method             | Returns                   | Description                                   |
| ------------------ | ------------------------- | --------------------------------------------- |
| `get()`            | `Concession[]`            | Return all results as an array.               |
| `first()`          | `Concession \| undefined` | Return the first result.                      |
| `find(id)`         | `Concession \| undefined` | Find a concession by exact ID.                |
| `findByName(name)` | `Concession \| undefined` | Find a concession by name (case-insensitive). |
| `count()`          | `number`                  | Return the number of results.                 |

### Filter Methods

| Method       | Returns           | Description                                 |
| ------------ | ----------------- | ------------------------------------------- |
| `byTag(tag)` | `ConcessionQuery` | Filter to items that include the given tag. |

### Sort Methods

| Method                | Returns           | Description                                                      |
| --------------------- | ----------------- | ---------------------------------------------------------------- |
| `sortByPrice(order?)` | `ConcessionQuery` | Sort by price. Pass `'asc'` (default) or `'desc'`.               |
| `sortByName(order?)`  | `ConcessionQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |

## Examples

### List all concessions by price

```js
import { concessions } from 'stardew-valley-data'

const sorted = concessions().sortByPrice().get()

sorted.forEach((c) => {
  console.log(`${c.name}: ${c.price}g — Tags: ${c.tags.join(', ')}`)
})
```

### Find drinks at the concession stand

```js
import { concessions } from 'stardew-valley-data'

const drinks = concessions().byTag('drink').sortByName().get()

drinks.forEach((d) => {
  console.log(`${d.name} (${d.price}g)`)
})
```

### Find items with multiple tags

```js
import { concessions } from 'stardew-valley-data'

// Chain tag filters to find items that are both sweet and cold
const sweetAndCold = concessions().byTag('sweet').byTag('cold').get()

sweetAndCold.forEach((c) => {
  console.log(`${c.name}: ${c.tags.join(', ')}`)
})
```

### Get the cheapest concession

```js
import { concessions } from 'stardew-valley-data'

const cheapest = concessions().sortByPrice().first()

if (cheapest) {
  console.log(`Cheapest: ${cheapest.name} at ${cheapest.price}g`)
}
```

### Wrap a pre-filtered array

You can pass an existing `Concession[]` array into the `concessions()` function to create a new query from it:

```js
import { concessions } from 'stardew-valley-data'

const myList = concessions().byTag('salty').get()
const sorted = concessions(myList).sortByPrice('desc').get()
```
