---
title: Trinkets
nextjs:
  metadata:
    title: Trinkets
    description: Query Stardew Valley trinket data including effects, sources, and forge compatibility.
---

Access every trinket in Stardew Valley with filters for source type and forge compatibility. {% .lead %}

## Quick Start

```js
import { trinkets } from 'stardew-valley-data'

// Get all trinkets
const allTrinkets = trinkets().get()

// Find a specific trinket
const parrotEgg = trinkets().findByName('Parrot Egg')

// Get forgeable trinkets from combat drops
const forgeableCombat = trinkets().bySource('combat-drop').forgeable().get()
```

## Type Definition

The `Trinket` type represents a single trinket item.

| Field       | Type            | Description                                       |
| ----------- | --------------- | ------------------------------------------------- |
| `id`        | `string`        | Unique identifier                                 |
| `name`      | `string`        | Display name                                      |
| `effect`    | `string`        | Description of the trinket's effect               |
| `source`    | `TrinketSource` | Where the trinket is obtained                     |
| `forgeable` | `boolean`       | Whether the trinket can be re-forged at the Forge |
| `sellPrice` | `number`        | Sell price in gold                                |
| `image`     | `string`        | Relative path to the trinket image                |

### TrinketSource

```ts
type TrinketSource = 'combat-drop' | 'desert-festival'
```

## Query Methods

Create a query with the `trinkets()` function. Every filter and sort method returns a new `TrinketQuery`, so you can chain calls in any order.

### Filter Methods

| Method      | Signature                                       | Description                                                                        |
| ----------- | ----------------------------------------------- | ---------------------------------------------------------------------------------- |
| `bySource`  | `bySource(source: TrinketSource): TrinketQuery` | Filter to trinkets from the given source (`'combat-drop'` or `'desert-festival'`). |
| `forgeable` | `forgeable(): TrinketQuery`                     | Filter to trinkets that can be re-forged at the Forge.                             |

### Sort Methods

| Method       | Signature                                           | Description                                    |
| ------------ | --------------------------------------------------- | ---------------------------------------------- |
| `sortByName` | `sortByName(order?: 'asc' \| 'desc'): TrinketQuery` | Sort alphabetically by name. Default: `'asc'`. |

### Terminal Methods

These methods are inherited from the base query and return actual values instead of a new query.

| Method       | Signature                                        | Description                                          |
| ------------ | ------------------------------------------------ | ---------------------------------------------------- |
| `get`        | `get(): Trinket[]`                               | Return all results as an array.                      |
| `first`      | `first(): Trinket \| undefined`                  | Return the first result, or `undefined` if empty.    |
| `find`       | `find(id: string): Trinket \| undefined`         | Find an item by its exact ID.                        |
| `findByName` | `findByName(name: string): Trinket \| undefined` | Find an item by name (case-insensitive exact match). |
| `count`      | `count(): number`                                | Return the number of results.                        |

## Examples

### List all combat-drop trinkets

```js
import { trinkets } from 'stardew-valley-data'

const combatTrinkets = trinkets().bySource('combat-drop').sortByName().get()
combatTrinkets.forEach((t) => console.log(`${t.name}: ${t.effect}`))
```

### Find all forgeable trinkets

```js
import { trinkets } from 'stardew-valley-data'

const forgeable = trinkets().forgeable().get()
forgeable.forEach((t) => console.log(`${t.name} (${t.source})`))
```

### Get Desert Festival trinkets

```js
import { trinkets } from 'stardew-valley-data'

const festivalTrinkets = trinkets().bySource('desert-festival').get()
festivalTrinkets.forEach((t) =>
  console.log(`${t.name}: ${t.effect} — Sells for ${t.sellPrice}g`),
)
```

### Count trinkets by source

```js
import { trinkets } from 'stardew-valley-data'

console.log(`Total trinkets: ${trinkets().count()}`)
console.log(`Combat drops: ${trinkets().bySource('combat-drop').count()}`)
console.log(
  `Desert Festival: ${trinkets().bySource('desert-festival').count()}`,
)
```
