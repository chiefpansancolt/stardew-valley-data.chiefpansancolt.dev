---
title: Hats
nextjs:
  metadata:
    title: Hats
    description: Query Stardew Valley hat data including how to obtain each hat.
---

Access every hat in Stardew Valley with sorting by name. {% .lead %}

## Quick Start

```js
import { hats } from 'stardew-valley-data'

// Get all hats
const allHats = hats().get()

// Find a specific hat
const cowboyHat = hats().findByName('Cowboy Hat')

// Get hats sorted alphabetically
const sorted = hats().sortByName().get()
```

## Type Definition

The `Hat` type represents a single hat item.

| Field         | Type     | Description                    |
| ------------- | -------- | ------------------------------ |
| `id`          | `string` | Unique identifier              |
| `name`        | `string` | Display name                   |
| `description` | `string` | In-game description            |
| `obtain`      | `string` | How to obtain this hat         |
| `image`       | `string` | Relative path to the hat image |

## Query Methods

Create a query with the `hats()` function. Every sort method returns a new `HatQuery`, so you can chain calls in any order.

### Sort Methods

| Method       | Signature                                       | Description                                    |
| ------------ | ----------------------------------------------- | ---------------------------------------------- |
| `sortByName` | `sortByName(order?: 'asc' \| 'desc'): HatQuery` | Sort alphabetically by name. Default: `'asc'`. |

### Terminal Methods

These methods are inherited from the base query and return actual values instead of a new query.

| Method       | Signature                                    | Description                                          |
| ------------ | -------------------------------------------- | ---------------------------------------------------- |
| `get`        | `get(): Hat[]`                               | Return all results as an array.                      |
| `first`      | `first(): Hat \| undefined`                  | Return the first result, or `undefined` if empty.    |
| `find`       | `find(id: string): Hat \| undefined`         | Find an item by its exact ID.                        |
| `findByName` | `findByName(name: string): Hat \| undefined` | Find an item by name (case-insensitive exact match). |
| `count`      | `count(): number`                            | Return the number of results.                        |

## Examples

### List all hats alphabetically

```js
import { hats } from 'stardew-valley-data'

const allHats = hats().sortByName().get()
allHats.forEach((h) => console.log(`${h.name}: ${h.description}`))
```

### Find how to obtain a specific hat

```js
import { hats } from 'stardew-valley-data'

const hat = hats().findByName('Living Hat')
if (hat) {
  console.log(`${hat.name} — Obtained from: ${hat.obtain}`)
}
```

### Look up a hat by ID

```js
import { hats } from 'stardew-valley-data'

const hat = hats().find('cowboy-hat')
if (hat) {
  console.log(`${hat.name}: ${hat.description}`)
}
```

### Count total hats

```js
import { hats } from 'stardew-valley-data'

console.log(`There are ${hats().count()} hats in the game`)
```
