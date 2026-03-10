---
title: Tools
nextjs:
  metadata:
    title: Tools
    description: Query Stardew Valley tool data including upgradeable tools, fishing rods, backpacks, and simple tools.
---

Access every tool in Stardew Valley -- upgradeable tools, fishing rods, simple tools, and backpacks -- with filters for type, enchantability, and sorting by name. {% .lead %}

## Quick Start

```js
import { tools } from 'stardew-valley-data'

// Get all tools
const allTools = tools().get()

// Get only upgradeable tools
const upgradeableTools = tools().upgradeable().get()

// Find a specific tool
const iridiumPickaxe = tools().findByName('Pickaxe')

// Get enchantable tools
const enchantable = tools().canEnchant().get()
```

## Type Definitions

### Tool

`Tool` is a union type: `UpgradeableTool | FishingRod | SimpleTool | Backpack`.

#### UpgradeableTool

| Field         | Type             | Description                                    |
| ------------- | ---------------- | ---------------------------------------------- |
| `id`          | `string`         | Unique identifier                              |
| `type`        | `'upgradeable'`  | Always `'upgradeable'`                         |
| `name`        | `string`         | Display name (e.g., Hoe, Pickaxe, Axe)         |
| `description` | `string`         | In-game description                            |
| `canEnchant`  | `boolean`        | Whether the tool can be enchanted at the Forge |
| `levels`      | `UpgradeLevel[]` | Available upgrade tiers                        |

#### UpgradeLevel

| Field              | Type             | Description                                        |
| ------------------ | ---------------- | -------------------------------------------------- |
| `level`            | `ToolLevel`      | Upgrade tier name                                  |
| `image`            | `string \| null` | Relative path to the image, or `null`              |
| `upgradeCost`      | `number \| null` | Gold cost to upgrade, or `null` for the basic tier |
| `materialName`     | `string \| null` | Material needed (e.g., Copper Bar), or `null`      |
| `materialQuantity` | `number \| null` | Quantity of material needed, or `null`             |
| `description`      | `string`         | Description of what this upgrade level does        |

#### ToolLevel

```ts
type ToolLevel = 'basic' | 'copper' | 'steel' | 'gold' | 'iridium'
```

#### FishingRod

| Field                  | Type             | Description                                   |
| ---------------------- | ---------------- | --------------------------------------------- |
| `id`                   | `string`         | Unique identifier                             |
| `type`                 | `'fishing-rod'`  | Always `'fishing-rod'`                        |
| `name`                 | `string`         | Display name                                  |
| `description`          | `string`         | In-game description                           |
| `image`                | `string`         | Relative path to the rod image                |
| `cost`                 | `number \| null` | Purchase cost in gold, or `null` if free      |
| `fishingLevelRequired` | `number \| null` | Fishing level needed, or `null`               |
| `bait`                 | `boolean`        | Whether the rod supports bait                 |
| `tackleSlots`          | `number`         | Number of tackle slots                        |
| `canEnchant`           | `boolean`        | Whether the rod can be enchanted at the Forge |
| `obtain`               | `string`         | How to obtain this rod                        |

#### SimpleTool

| Field         | Type             | Description                              |
| ------------- | ---------------- | ---------------------------------------- |
| `id`          | `string`         | Unique identifier                        |
| `type`        | `'simple'`       | Always `'simple'`                        |
| `name`        | `string`         | Display name                             |
| `description` | `string`         | In-game description                      |
| `image`       | `string`         | Relative path to the tool image          |
| `cost`        | `number \| null` | Purchase cost in gold, or `null` if free |
| `obtain`      | `string`         | How to obtain this tool                  |

#### Backpack

| Field         | Type         | Description                         |
| ------------- | ------------ | ----------------------------------- |
| `id`          | `string`     | Unique identifier                   |
| `type`        | `'backpack'` | Always `'backpack'`                 |
| `name`        | `string`     | Display name                        |
| `description` | `string`     | In-game description                 |
| `image`       | `string`     | Relative path to the backpack image |
| `cost`        | `number`     | Purchase cost in gold               |
| `slots`       | `number`     | Number of inventory slots           |

### ToolType

```ts
type ToolType = 'upgradeable' | 'fishing-rod' | 'simple' | 'backpack'
```

## Query Methods

Create a query with the `tools()` function. Every filter and sort method returns a new `ToolQuery`, so you can chain calls in any order.

### Filter Methods

| Method        | Signature                           | Description                                                               |
| ------------- | ----------------------------------- | ------------------------------------------------------------------------- |
| `byType`      | `byType(type: ToolType): ToolQuery` | Filter by tool type string.                                               |
| `upgradeable` | `upgradeable(): ToolQuery`          | Filter to upgradeable tools (Hoe, Watering Can, Pickaxe, Axe, Trash Can). |
| `fishingRods` | `fishingRods(): ToolQuery`          | Filter to fishing rods.                                                   |
| `simple`      | `simple(): ToolQuery`               | Filter to simple tools (no upgrades).                                     |
| `backpacks`   | `backpacks(): ToolQuery`            | Filter to backpacks.                                                      |
| `canEnchant`  | `canEnchant(): ToolQuery`           | Filter to tools that can be enchanted at the Forge.                       |

### Sort Methods

| Method       | Signature                                        | Description                                    |
| ------------ | ------------------------------------------------ | ---------------------------------------------- |
| `sortByName` | `sortByName(order?: 'asc' \| 'desc'): ToolQuery` | Sort alphabetically by name. Default: `'asc'`. |

### Terminal Methods

These methods are inherited from the base query and return actual values instead of a new query.

| Method       | Signature                                     | Description                                          |
| ------------ | --------------------------------------------- | ---------------------------------------------------- |
| `get`        | `get(): Tool[]`                               | Return all results as an array.                      |
| `first`      | `first(): Tool \| undefined`                  | Return the first result, or `undefined` if empty.    |
| `find`       | `find(id: string): Tool \| undefined`         | Find an item by its exact ID.                        |
| `findByName` | `findByName(name: string): Tool \| undefined` | Find an item by name (case-insensitive exact match). |
| `count`      | `count(): number`                             | Return the number of results.                        |

## Examples

### List upgradeable tools and their upgrade costs

```js
import { tools } from 'stardew-valley-data'

const upgradeableTools = tools().upgradeable().get()
upgradeableTools.forEach((tool) => {
  console.log(`\n${tool.name}:`)
  tool.levels.forEach((lvl) => {
    const cost = lvl.upgradeCost
      ? `${lvl.upgradeCost}g + ${lvl.materialQuantity}x ${lvl.materialName}`
      : 'Starting tool'
    console.log(`  ${lvl.level}: ${cost}`)
  })
})
```

### Find fishing rods that support bait

```js
import { tools } from 'stardew-valley-data'

const baitRods = tools()
  .fishingRods()
  .get()
  .filter((rod) => rod.bait)

baitRods.forEach((rod) =>
  console.log(`${rod.name}: ${rod.tackleSlots} tackle slot(s)`),
)
```

### Get all enchantable tools

```js
import { tools } from 'stardew-valley-data'

const enchantable = tools().canEnchant().sortByName().get()
enchantable.forEach((t) => console.log(t.name))
```

### List backpack upgrades

```js
import { tools } from 'stardew-valley-data'

const backpacks = tools().backpacks().get()
backpacks.forEach((bp) =>
  console.log(`${bp.name}: ${bp.slots} slots — ${bp.cost}g`),
)
```

### Count tools by type

```js
import { tools } from 'stardew-valley-data'

console.log(`Total tools: ${tools().count()}`)
console.log(`Upgradeable: ${tools().upgradeable().count()}`)
console.log(`Fishing rods: ${tools().fishingRods().count()}`)
console.log(`Simple tools: ${tools().simple().count()}`)
console.log(`Backpacks: ${tools().backpacks().count()}`)
```
