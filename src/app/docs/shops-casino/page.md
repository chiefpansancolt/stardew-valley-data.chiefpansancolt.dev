---
title: Casino
nextjs:
  metadata:
    title: Casino
    description: Query Casino shop stock including furniture, hats, and consumables priced in Qi Coins.
---

Access the complete stock list for the Casino shop where all items are purchased with Qi Coins, using the chainable `CasinoQuery` API. {% .lead %}

## Quick Start

```js
import { casino } from 'stardew-valley-data'

// Get all casino items
const all = casino().get()

// Get furniture items sorted by price
const furniture = casino().furniture().sortByPrice().get()

// Find a specific item
const item = casino().findByName('Statue Of Endless Fortune')
```

## Type Definition

Each item conforms to the `CasinoItem` interface:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier. |
| `name` | `string` | Display name of the item. |
| `price` | `number` | Price in Qi Coins. |
| `description` | `string` | In-game description text. |
| `image` | `string` | Path to the item's image. |
| `category` | `CasinoCategory` | Item category. |

### CasinoCategory

```ts
type CasinoCategory = 'furniture' | 'hat' | 'scarecrow' | 'consumable' | 'decoration'
```

## Query Methods

`CasinoQuery` extends `QueryBase` and inherits five terminal methods:

| Method | Returns | Description |
| --- | --- | --- |
| `get()` | `CasinoItem[]` | Return all results as an array. |
| `first()` | `CasinoItem \| undefined` | Return the first result. |
| `find(id)` | `CasinoItem \| undefined` | Find an item by exact ID. |
| `findByName(name)` | `CasinoItem \| undefined` | Find an item by name (case-insensitive). |
| `count()` | `number` | Return the number of results. |

### Filter Methods

| Method | Returns | Description |
| --- | --- | --- |
| `byCategory(category)` | `CasinoQuery` | Filter to items in the given category. |
| `furniture()` | `CasinoQuery` | Filter to furniture and decoration items. |
| `consumables()` | `CasinoQuery` | Filter to consumable items (fireworks, magnet, warp totem, hardwood fence). |

### Sort Methods

| Method | Returns | Description |
| --- | --- | --- |
| `sortByPrice(order?)` | `CasinoQuery` | Sort by Qi Coin price. Pass `'asc'` (default) or `'desc'`. |
| `sortByName(order?)` | `CasinoQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |

## Examples

### List all items by category

```js
import { casino } from 'stardew-valley-data'

const categories = ['furniture', 'hat', 'scarecrow', 'consumable', 'decoration']

categories.forEach((cat) => {
  const items = casino().byCategory(cat).get()
  console.log(`\n${cat.toUpperCase()} (${items.length}):`)
  items.forEach((item) => console.log(`  ${item.name} - ${item.price} Qi Coins`))
})
```

### Find the cheapest consumable

```js
import { casino } from 'stardew-valley-data'

const cheapest = casino().consumables().sortByPrice().first()

if (cheapest) {
  console.log(`${cheapest.name} costs ${cheapest.price} Qi Coins`)
}
```
