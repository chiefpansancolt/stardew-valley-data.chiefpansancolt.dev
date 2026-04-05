---
title: Rarecrows
nextjs:
  metadata:
    title: Rarecrows
    description: Query Stardew Valley rarecrow data including how to obtain each one and sort by number.
---

Access all rarecrows in Stardew Valley with data on how to obtain each one, using the `RarecrowQuery` API. {% .lead %}

## Quick Start

```js
import { rarecrows } from 'stardew-valley-data'

// Get all rarecrows in order
const all = rarecrows().sortByNumber().get()

// Find a specific rarecrow by name
const joja = rarecrows().findByName('Joja Cola Machine')

// Count total rarecrows
const total = rarecrows().count()
```

## Type Definition

Each rarecrow record conforms to the `Rarecrow` interface:

| Field    | Type     | Description                  |
| -------- | -------- | ---------------------------- |
| `id`     | `string` | Unique identifier.           |
| `number` | `number` | Rarecrow number (1–8).       |
| `name`   | `string` | Display name.                |
| `image`  | `string` | Path to the image asset.     |
| `obtain` | `string` | How to obtain this rarecrow. |

## Query Methods

`RarecrowQuery` extends `QueryBase` and provides one sort method in addition to the five inherited terminal methods.

### Terminal Methods

| Method             | Returns                 | Description                                 |
| ------------------ | ----------------------- | ------------------------------------------- |
| `get()`            | `Rarecrow[]`            | Return all results as an array.             |
| `first()`          | `Rarecrow \| undefined` | Return the first result.                    |
| `find(id)`         | `Rarecrow \| undefined` | Find a rarecrow by exact ID.                |
| `findByName(name)` | `Rarecrow \| undefined` | Find a rarecrow by name (case-insensitive). |
| `count()`          | `number`                | Return the number of results.               |

### Sort Methods

| Method         | Signature                               | Default | Description                    |
| -------------- | --------------------------------------- | ------- | ------------------------------ |
| `sortByNumber` | `sortByNumber(order?: 'asc' \| 'desc')` | `'asc'` | Sort by rarecrow number (1–8). |

## Examples

### Display all rarecrows in order

```js
import { rarecrows } from 'stardew-valley-data'

rarecrows()
  .sortByNumber()
  .get()
  .forEach((r) => {
    console.log(`#${r.number} ${r.name}: ${r.obtain}`)
  })
```

### Look up how to get a specific rarecrow

```js
import { rarecrows } from 'stardew-valley-data'

const target = rarecrows().findByName('Marnie')

if (target) {
  console.log(`${target.name}: ${target.obtain}`)
}
```
