---
title: Minerals
nextjs:
  metadata:
    title: Minerals
    description: Query Stardew Valley mineral data including gems, ores, bars, geodes, nodes, and resources.
---

Access all mineral-related data in Stardew Valley including donatable minerals, geode containers, ores, smelted bars, mining nodes, and resources. {% .lead %}

## Quick Start

```js
import { minerals } from 'stardew-valley-data'

// All mineral-related items
const all = minerals().get()

// Donatable minerals only
const gems = minerals().mineralItems().get()

// Ores sorted by sell price
const ores = minerals().ores().sortBySellPrice().get()

// Items found in Frozen Geodes
const frozen = minerals().fromGeode('Frozen Geode').get()
```

## Type Definition

Minerals use a discriminated union with six variants based on the `kind` field:

```ts
type Mineral = MineralItem | GeodeContainer | OreItem | BarItem | NodeItem | ResourceItem
```

### MineralItem

Donatable gems and geode minerals.

```ts
interface MineralItem {
  id: string
  name: string
  kind: 'mineral'
  description: string
  sellPrice: number
  gemologistPrice: number
  locations: string[]
  image: string
}
```

| Field | Type | Description |
| --- | --- | --- |
| `kind` | `'mineral'` | Discriminator. |
| `sellPrice` | `number` | Base sell price. |
| `gemologistPrice` | `number` | Sell price with the Gemologist profession. |
| `locations` | `string[]` | Where this mineral can be found. |

### GeodeContainer

Geode items that can be cracked open at the Blacksmith.

```ts
interface GeodeContainer {
  id: string
  name: string
  kind: 'geode'
  description: string
  sellPrice: number
  locations: string[]
  image: string
}
```

### OreItem

Raw ore items found in the mines.

```ts
interface OreItem {
  id: string
  name: string
  kind: 'ore'
  description: string
  sellPrice: number
  locations: string[]
  image: string
}
```

### BarItem

Smelted bars produced in a furnace.

```ts
interface BarItem {
  id: string
  name: string
  kind: 'bar'
  description: string
  sellPrice: number
  smeltRecipes: SmeltRecipe[]
  image: string
}

interface SmeltRecipe {
  ore: string
  oreQty: number
  coalQty: number
  timeMinutes: number
  outputQty?: number
}
```

| Field | Type | Description |
| --- | --- | --- |
| `smeltRecipes` | `SmeltRecipe[]` | Smelting recipes with ore/coal quantities and time. |

### NodeItem

Mining nodes found in the mines and caves.

```ts
interface NodeItem {
  id: string
  name: string
  kind: 'node'
  description: string | null
  drops: NodeDrop[]
  miningXP: number
  locations: string[]
  image: string
}

interface NodeDrop {
  item: string
  quantity: string
  chance?: string
}
```

| Field | Type | Description |
| --- | --- | --- |
| `drops` | `NodeDrop[]` | Items dropped when the node is broken, with quantity and optional drop chance. |
| `miningXP` | `number` | Mining XP gained from breaking this node. |

### ResourceItem

Raw materials like Coal.

```ts
interface ResourceItem {
  id: string
  name: string
  kind: 'resource'
  description: string
  sellPrice: number
  locations: string[]
  image: string
}
```

### Common Fields

All mineral variants share these fields:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier. |
| `name` | `string` | Display name. |
| `kind` | `string` | Discriminator: `'mineral'`, `'geode'`, `'ore'`, `'bar'`, `'node'`, or `'resource'`. |
| `image` | `string` | Path to the image asset. |

## Query Methods

The `minerals()` function returns a `MineralQuery` instance. All methods return a new `MineralQuery` for chaining.

### Inherited Methods

| Method | Returns | Description |
| --- | --- | --- |
| `.get()` | `Mineral[]` | Return all results as an array. |
| `.first()` | `Mineral \| undefined` | Return the first result. |
| `.find(id)` | `Mineral \| undefined` | Find by exact ID. |
| `.findByName(name)` | `Mineral \| undefined` | Find by name (case-insensitive). |
| `.count()` | `number` | Return the number of results. |

### Filter Methods

| Method | Signature | Description |
| --- | --- | --- |
| `mineralItems` | `mineralItems()` | Filter to donatable minerals only (gems and geode minerals). |
| `geodes` | `geodes()` | Filter to geode containers only. |
| `ores` | `ores()` | Filter to ore items only. |
| `bars` | `bars()` | Filter to smelted bar items only. |
| `nodes` | `nodes()` | Filter to mining node entries only. |
| `resources` | `resources()` | Filter to resource items (Coal, etc.). |
| `fromGeode` | `fromGeode(geodeType: string)` | Filter to items found in a specific geode type (case-insensitive substring match). |

### Sort Methods

| Method | Signature | Default | Description |
| --- | --- | --- | --- |
| `sortByName` | `sortByName(order?: 'asc' \| 'desc')` | `'asc'` | Sort alphabetically by name. |
| `sortBySellPrice` | `sortBySellPrice(order?: 'asc' \| 'desc')` | `'desc'` | Sort by sell price (highest first). Items without a sell price (nodes) sort as 0. |

## Examples

### Most valuable donatable minerals

```js
import { minerals } from 'stardew-valley-data'

const valuable = minerals()
  .mineralItems()
  .sortBySellPrice()
  .get()
  .slice(0, 10)

valuable.forEach(m => {
  console.log(`${m.name}: ${m.sellPrice}g (${m.gemologistPrice}g with Gemologist)`)
})
```

### Smelting recipes for all bars

```js
const bars = minerals().bars().get()

bars.forEach(bar => {
  bar.smeltRecipes.forEach(recipe => {
    console.log(`${bar.name}: ${recipe.oreQty} ${recipe.ore} + ${recipe.coalQty} Coal (${recipe.timeMinutes} min)`)
  })
})
```

### Items from Omni Geodes

```js
const omniItems = minerals().fromGeode('Omni Geode').sortByName().get()
console.log(`${omniItems.length} items from Omni Geodes`)
```

### Mining node drops

```js
const nodes = minerals().nodes().get()

nodes.forEach(node => {
  console.log(`${node.name} (${node.miningXP} XP):`)
  node.drops.forEach(d => {
    console.log(`  ${d.item} x${d.quantity}${d.chance ? ` (${d.chance})` : ''}`)
  })
})
```
