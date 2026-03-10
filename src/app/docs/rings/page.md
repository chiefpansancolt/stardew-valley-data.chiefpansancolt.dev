---
title: Rings
nextjs:
  metadata:
    title: Rings
    description: Query Stardew Valley ring data including crafting recipes, purchase prices, and sources.
---

Access every ring in Stardew Valley with filters for craftable and purchasable rings, plus sorting by sell price. {% .lead %}

## Quick Start

```js
import { rings } from 'stardew-valley-data'

// Get all rings
const allRings = rings().get()

// Find a specific ring
const iridiumBand = rings().findByName('Iridium Band')

// Get craftable rings sorted by value
const craftableRings = rings().craftable().sortBySellPrice('desc').get()
```

## Type Definition

The `Ring` type represents a single ring item.

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier |
| `name` | `string` | Display name |
| `description` | `string` | In-game description |
| `sellPrice` | `number` | Sell price in gold |
| `image` | `string` | Relative path to the ring image |
| `craftingLevel` | `number \| null` | Required crafting level, or `null` if not craftable |
| `craftingSkill` | `'combat' \| 'mining' \| null` | Skill associated with the crafting recipe, or `null` |
| `ingredients` | `Ingredient[]` | Crafting ingredients (empty array if not craftable) |
| `purchasePrice` | `number \| null` | Purchase price in gold, or `null` if not purchasable |
| `sources` | `string[]` | How the ring can be obtained |

### Ingredient

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` | Ingredient name |
| `id` | `string` | Ingredient item ID |
| `quantity` | `number` | Quantity required |

## Query Methods

Create a query with the `rings()` function. Every filter and sort method returns a new `RingQuery`, so you can chain calls in any order.

### Filter Methods

| Method | Signature | Description |
| --- | --- | --- |
| `craftable` | `craftable(): RingQuery` | Filter to rings that have crafting ingredients. |
| `purchasable` | `purchasable(): RingQuery` | Filter to rings available for purchase (have a `purchasePrice`). |

### Sort Methods

| Method | Signature | Description |
| --- | --- | --- |
| `sortBySellPrice` | `sortBySellPrice(order?: 'asc' \| 'desc'): RingQuery` | Sort by sell price. Default: `'desc'` (most valuable first). |

### Terminal Methods

These methods are inherited from the base query and return actual values instead of a new query.

| Method | Signature | Description |
| --- | --- | --- |
| `get` | `get(): Ring[]` | Return all results as an array. |
| `first` | `first(): Ring \| undefined` | Return the first result, or `undefined` if empty. |
| `find` | `find(id: string): Ring \| undefined` | Find an item by its exact ID. |
| `findByName` | `findByName(name: string): Ring \| undefined` | Find an item by name (case-insensitive exact match). |
| `count` | `count(): number` | Return the number of results. |

## Examples

### List all craftable rings with their ingredients

```js
import { rings } from 'stardew-valley-data'

const craftable = rings().craftable().get()
craftable.forEach((ring) => {
  const recipe = ring.ingredients.map((i) => `${i.quantity}x ${i.name}`).join(', ')
  console.log(`${ring.name} (Combat Lv ${ring.craftingLevel}): ${recipe}`)
})
```

### Find the most valuable purchasable rings

```js
import { rings } from 'stardew-valley-data'

const valuable = rings()
  .purchasable()
  .sortBySellPrice('desc')
  .get()
  .slice(0, 5)

valuable.forEach((r) =>
  console.log(`${r.name}: Buy ${r.purchasePrice}g / Sell ${r.sellPrice}g`)
)
```

### Get all ring sources

```js
import { rings } from 'stardew-valley-data'

const ring = rings().findByName('Burglar\'s Ring')
if (ring) {
  console.log(`Sources: ${ring.sources.join(', ')}`)
}
```

### Count rings by availability

```js
import { rings } from 'stardew-valley-data'

console.log(`Total rings: ${rings().count()}`)
console.log(`Craftable: ${rings().craftable().count()}`)
console.log(`Purchasable: ${rings().purchasable().count()}`)
```
