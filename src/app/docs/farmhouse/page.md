---
title: Farmhouse
nextjs:
  metadata:
    title: Farmhouse
    description: Query farmhouse upgrade tiers and renovation data including costs, materials, and prerequisites.
---

Access farmhouse upgrade and renovation data with typed costs, materials, and prerequisite information using the `HouseUpgradeQuery` and `HouseRenovationQuery` APIs. {% .lead %}

## Quick Start

```js
import { houseUpgrades, houseRenovations } from 'stardew-valley-data'

// Get all farmhouse upgrade tiers
const allUpgrades = houseUpgrades().get()

// Get a specific upgrade tier
const tier2 = houseUpgrades().byTier(2).first()

// Get all renovations sorted by name
const allRenovations = houseRenovations().sortByName().get()

// Get free renovations
const freeOnes = houseRenovations().free().get()
```

## Type Definitions

### HouseUpgrade

Each farmhouse upgrade conforms to the `HouseUpgrade` interface:

| Field          | Type                     | Description                                                     |
| -------------- | ------------------------ | --------------------------------------------------------------- |
| `id`           | `string`                 | Unique identifier for the upgrade.                              |
| `name`         | `string`                 | Display name of the upgrade tier.                               |
| `tier`         | `number`                 | Sequential upgrade tier (1 through 4).                          |
| `cost`         | `number`                 | Gold cost for the upgrade.                                      |
| `materials`    | `HouseUpgradeMaterial[]` | Array of materials required (see below).                        |
| `description`  | `string`                 | Description of what the upgrade adds.                           |
| `image`        | `string`                 | Path to the upgrade image.                                      |
| `prerequisite` | `string \| null`         | ID of the required prior upgrade, or `null` for the first tier. |

### HouseUpgradeMaterial

| Field      | Type     | Description                       |
| ---------- | -------- | --------------------------------- |
| `item`     | `string` | Display name of the material.     |
| `quantity` | `number` | Number of this material required. |

### HouseRenovation

Each renovation conforms to the `HouseRenovation` interface:

| Field          | Type             | Description                                           |
| -------------- | ---------------- | ----------------------------------------------------- |
| `id`           | `string`         | Unique identifier for the renovation.                 |
| `name`         | `string`         | Display name of the renovation.                       |
| `cost`         | `number`         | Gold cost for the renovation.                         |
| `description`  | `string`         | Description of the renovation.                        |
| `image`        | `string`         | Path to the renovation image.                         |
| `prerequisite` | `string \| null` | ID of a required prior renovation, or `null` if none. |

## Query Methods

### HouseUpgradeQuery

`HouseUpgradeQuery` extends `QueryBase` and inherits five terminal methods shared by all query builders:

| Method             | Returns                     | Description                                 |
| ------------------ | --------------------------- | ------------------------------------------- |
| `get()`            | `HouseUpgrade[]`            | Return all results as an array.             |
| `first()`          | `HouseUpgrade \| undefined` | Return the first result.                    |
| `find(id)`         | `HouseUpgrade \| undefined` | Find an upgrade by exact ID.                |
| `findByName(name)` | `HouseUpgrade \| undefined` | Find an upgrade by name (case-insensitive). |
| `count()`          | `number`                    | Return the number of results.               |

#### Filter Methods

| Method         | Returns             | Description                                  |
| -------------- | ------------------- | -------------------------------------------- |
| `byTier(tier)` | `HouseUpgradeQuery` | Filter to upgrades at the given tier number. |

#### Sort Methods

| Method               | Returns             | Description                                       |
| -------------------- | ------------------- | ------------------------------------------------- |
| `sortByTier(order?)` | `HouseUpgradeQuery` | Sort by tier. Pass `'asc'` (default) or `'desc'`. |

### HouseRenovationQuery

`HouseRenovationQuery` extends `QueryBase` and inherits the same five terminal methods.

| Method             | Returns                        | Description                                   |
| ------------------ | ------------------------------ | --------------------------------------------- |
| `get()`            | `HouseRenovation[]`            | Return all results as an array.               |
| `first()`          | `HouseRenovation \| undefined` | Return the first result.                      |
| `find(id)`         | `HouseRenovation \| undefined` | Find a renovation by exact ID.                |
| `findByName(name)` | `HouseRenovation \| undefined` | Find a renovation by name (case-insensitive). |
| `count()`          | `number`                       | Return the number of results.                 |

#### Filter Methods

| Method               | Returns                | Description                                                                  |
| -------------------- | ---------------------- | ---------------------------------------------------------------------------- |
| `free()`             | `HouseRenovationQuery` | Filter to free renovations (cost is 0).                                      |
| `withPrerequisite()` | `HouseRenovationQuery` | Filter to renovations that require another renovation to be completed first. |

#### Sort Methods

| Method                | Returns                | Description                                                      |
| --------------------- | ---------------------- | ---------------------------------------------------------------- |
| `sortByPrice(order?)` | `HouseRenovationQuery` | Sort by cost. Pass `'asc'` (default) or `'desc'`.                |
| `sortByName(order?)`  | `HouseRenovationQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |

## Examples

### List all upgrade tiers in order

```js
import { houseUpgrades } from 'stardew-valley-data'

const tiers = houseUpgrades().sortByTier().get()

tiers.forEach((u) => {
  console.log(`Tier ${u.tier}: ${u.name} — ${u.cost}g`)
})
```

### View materials for a specific tier

```js
import { houseUpgrades } from 'stardew-valley-data'

const tier3 = houseUpgrades().byTier(3).first()

if (tier3) {
  console.log(`${tier3.name} costs ${tier3.cost}g and requires:`)
  tier3.materials.forEach((m) => {
    console.log(`  ${m.quantity}x ${m.item}`)
  })
}
```

### Get the cheapest renovations

```js
import { houseRenovations } from 'stardew-valley-data'

const cheapest = houseRenovations().sortByPrice().get()

cheapest.forEach((r) => {
  console.log(`${r.name}: ${r.cost}g`)
})
```

### Find renovations with prerequisites

```js
import { houseRenovations } from 'stardew-valley-data'

const dependent = houseRenovations().withPrerequisite().get()

dependent.forEach((r) => {
  console.log(`${r.name} requires: ${r.prerequisite}`)
})
```

### Wrap a pre-filtered array

You can pass an existing array into the factory functions to create a new query from it:

```js
import { houseUpgrades, houseRenovations } from 'stardew-valley-data'

const myUpgrades = houseUpgrades().get()
const sorted = houseUpgrades(myUpgrades).sortByTier('desc').get()

const myRenovations = houseRenovations().free().get()
const named = houseRenovations(myRenovations).sortByName().get()
```
