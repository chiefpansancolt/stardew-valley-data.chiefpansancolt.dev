---
title: Buildings
nextjs:
  metadata:
    title: Buildings
    description: Query and filter Stardew Valley building data including costs, materials, builders, and upgrade paths.
---

Access the complete dataset of Stardew Valley buildings with typed cost, material, and upgrade information using the chainable `BuildingQuery` API. {% .lead %}

## Quick Start

```js
import { buildings } from 'stardew-valley-data'

// Get all buildings
const all = buildings().get()

// Find a specific building by name
const barn = buildings().findByName('Barn')

// Get all buildings built by Robin, sorted by cost
const robinBuildings = buildings().byBuilder('Robin').sortByCost().get()

// Get only base buildings (not upgrades)
const baseBuildings = buildings().base().sortByName().get()
```

## Type Definition

Each building record conforms to the `Building` interface:

| Field         | Type                 | Description                                                               |
| ------------- | -------------------- | ------------------------------------------------------------------------- |
| `id`          | `string`             | Unique identifier for the building.                                       |
| `name`        | `string`             | Display name of the building.                                             |
| `description` | `string`             | In-game description of the building.                                      |
| `builder`     | `BuildingBuilder`    | The NPC who constructs this building (`'Robin'` or `'Wizard'`).           |
| `buildCost`   | `number`             | Gold cost to construct the building.                                      |
| `buildDays`   | `number`             | Number of days required to complete construction.                         |
| `materials`   | `BuildingMaterial[]` | Array of materials required (see below).                                  |
| `upgradeFrom` | `string \| null`     | ID of the building this upgrades from, or `null` for base buildings.      |
| `magical`     | `boolean`            | Whether this is a magical building (constructed instantly by the Wizard). |
| `image`       | `string`             | Path to the building image.                                               |

### BuildingMaterial

| Field      | Type     | Description                              |
| ---------- | -------- | ---------------------------------------- |
| `id`       | `string` | Unique identifier for the material item. |
| `item`     | `string` | Display name of the material.            |
| `quantity` | `number` | Number of this material required.        |

## Query Methods

`BuildingQuery` extends `QueryBase` and inherits five terminal methods shared by all query builders:

| Method             | Returns                 | Description                                 |
| ------------------ | ----------------------- | ------------------------------------------- |
| `get()`            | `Building[]`            | Return all results as an array.             |
| `first()`          | `Building \| undefined` | Return the first result.                    |
| `find(id)`         | `Building \| undefined` | Find a building by exact ID.                |
| `findByName(name)` | `Building \| undefined` | Find a building by name (case-insensitive). |
| `count()`          | `number`                | Return the number of results.               |

### Filter Methods

| Method               | Returns         | Description                                                                |
| -------------------- | --------------- | -------------------------------------------------------------------------- |
| `byBuilder(builder)` | `BuildingQuery` | Filter by builder. Accepts `'Robin'` or `'Wizard'`.                        |
| `magical()`          | `BuildingQuery` | Filter to magical buildings only (Wizard buildings constructed instantly). |
| `upgrades()`         | `BuildingQuery` | Filter to buildings that are upgrades of another building.                 |
| `base()`             | `BuildingQuery` | Filter to base buildings (not upgrades).                                   |

### Sort Methods

| Method               | Returns         | Description                                                      |
| -------------------- | --------------- | ---------------------------------------------------------------- |
| `sortByCost(order?)` | `BuildingQuery` | Sort by build cost. Pass `'asc'` (default) or `'desc'`.          |
| `sortByName(order?)` | `BuildingQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |

## Examples

### List all Wizard buildings

```js
import { buildings } from 'stardew-valley-data'

const wizardBuildings = buildings().byBuilder('Wizard').sortByName().get()

wizardBuildings.forEach((b) => {
  console.log(`${b.name} — ${b.buildCost}g`)
})
```

### Find the most expensive buildings

```js
import { buildings } from 'stardew-valley-data'

const expensive = buildings().sortByCost('desc').get()

expensive.slice(0, 5).forEach((b) => {
  console.log(`${b.name}: ${b.buildCost}g`)
})
```

### Get the upgrade chain for a building

```js
import { buildings } from 'stardew-valley-data'

const upgradedBuildings = buildings().upgrades().get()

upgradedBuildings.forEach((b) => {
  console.log(`${b.name} upgrades from: ${b.upgradeFrom}`)
})
```

### View materials for a building

```js
import { buildings } from 'stardew-valley-data'

const coop = buildings().findByName('Coop')

if (coop) {
  console.log(`${coop.name} costs ${coop.buildCost}g and requires:`)
  coop.materials.forEach((m) => {
    console.log(`  ${m.quantity}x ${m.item}`)
  })
}
```

### Wrap a pre-filtered array

You can pass an existing `Building[]` array into the `buildings()` function to create a new query from it:

```js
import { buildings } from 'stardew-valley-data'

const myList = buildings().base().get()
const sorted = buildings(myList).sortByCost('desc').get()
```
