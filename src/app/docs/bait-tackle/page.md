---
title: Bait & Tackle
nextjs:
  metadata:
    title: Bait & Tackle
    description: Query Stardew Valley fishing bait and tackle data with sort methods and descriptions.
---

Access fishing bait and tackle item data, sortable by name and sell price. {% .lead %}

## Quick Start

```js
import { bait, tackle } from 'stardew-valley-data'

// All bait types
const allBait = bait().get()

// All tackle types sorted by sell price
const allTackle = tackle().sortBySellPrice().get()

// Find specific items
const magnet = bait().findByName('Magnet')
const spinner = tackle().findByName('Spinner')
```

---

## Bait

### Type Definition

```ts
interface Bait {
  id: string
  name: string
  description: string
  sellPrice: number
  image: string
}
```

#### Field Reference

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier. |
| `name` | `string` | Display name (e.g. `"Bait"`, `"Magnet"`). |
| `description` | `string` | In-game description text. |
| `sellPrice` | `number` | Base sell price in gold. |
| `image` | `string` | Path to the image asset. |

### Bait Query Methods

The `bait()` function returns a `BaitQuery` instance. All methods return a new `BaitQuery` for chaining.

#### Inherited Methods

| Method | Returns | Description |
| --- | --- | --- |
| `.get()` | `Bait[]` | Return all results as an array. |
| `.first()` | `Bait \| undefined` | Return the first result. |
| `.find(id)` | `Bait \| undefined` | Find by exact ID. |
| `.findByName(name)` | `Bait \| undefined` | Find by name (case-insensitive). |
| `.count()` | `number` | Return the number of results. |

#### Sort Methods

| Method | Signature | Default | Description |
| --- | --- | --- | --- |
| `sortByName` | `sortByName(order?: 'asc' \| 'desc')` | `'asc'` | Sort alphabetically by name. |
| `sortBySellPrice` | `sortBySellPrice(order?: 'asc' \| 'desc')` | `'desc'` | Sort by sell price (most valuable first). |

---

## Tackle

### Type Definition

```ts
interface Tackle {
  id: string
  name: string
  description: string
  sellPrice: number
  image: string
}
```

#### Field Reference

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier. |
| `name` | `string` | Display name (e.g. `"Spinner"`, `"Trap Bobber"`). |
| `description` | `string` | In-game description text. |
| `sellPrice` | `number` | Base sell price in gold. |
| `image` | `string` | Path to the image asset. |

### Tackle Query Methods

The `tackle()` function returns a `TackleQuery` instance. All methods return a new `TackleQuery` for chaining.

#### Inherited Methods

| Method | Returns | Description |
| --- | --- | --- |
| `.get()` | `Tackle[]` | Return all results as an array. |
| `.first()` | `Tackle \| undefined` | Return the first result. |
| `.find(id)` | `Tackle \| undefined` | Find by exact ID. |
| `.findByName(name)` | `Tackle \| undefined` | Find by name (case-insensitive). |
| `.count()` | `number` | Return the number of results. |

#### Sort Methods

| Method | Signature | Default | Description |
| --- | --- | --- | --- |
| `sortByName` | `sortByName(order?: 'asc' \| 'desc')` | `'asc'` | Sort alphabetically by name. |
| `sortBySellPrice` | `sortBySellPrice(order?: 'asc' \| 'desc')` | `'desc'` | Sort by sell price (most valuable first). |

## Examples

### List all bait with descriptions

```js
import { bait } from 'stardew-valley-data'

bait().sortByName().get().forEach(b => {
  console.log(`${b.name}: ${b.description}`)
})
```

### Compare tackle by sell price

```js
import { tackle } from 'stardew-valley-data'

const sorted = tackle().sortBySellPrice().get()

sorted.forEach(t => {
  console.log(`${t.name}: ${t.sellPrice}g`)
})
```

### Count available bait and tackle

```js
import { bait, tackle } from 'stardew-valley-data'

console.log(`${bait().count()} bait types, ${tackle().count()} tackle types`)
```
