---
title: Wizard's Tower
nextjs:
  metadata:
    title: Wizard's Tower
    description: Query the Wizard's magical building constructions including build costs and material requirements.
---

Access the complete list of the Wizard's magical constructions with build cost and material data using the chainable `WizardQuery` API. {% .lead %}

## Quick Start

```js
import { wizard } from 'stardew-valley-data'

// Get all wizard buildings
const all = wizard().get()

// Sort by build cost
const sorted = wizard().sortByCost().get()

// Find a specific building
const building = wizard().findByName('Junimo Hut')
```

## Type Definitions

### WizardBuilding

Each building conforms to the `WizardBuilding` interface:

| Field          | Type                       | Description                                   |
| -------------- | -------------------------- | --------------------------------------------- |
| `id`           | `string`                   | Unique identifier.                            |
| `name`         | `string`                   | Display name of the building.                 |
| `buildCost`    | `number`                   | Gold cost to build.                           |
| `materials`    | `WizardBuildingMaterial[]` | Array of materials required for construction. |
| `description`  | `string`                   | In-game description text.                     |
| `image`        | `string`                   | Path to the building's image.                 |
| `availability` | `string \| undefined`      | Special availability condition, if any.       |

### WizardBuildingMaterial

Each material requirement conforms to the `WizardBuildingMaterial` interface:

| Field      | Type     | Description                        |
| ---------- | -------- | ---------------------------------- |
| `itemId`   | `string` | ID of the required material item.  |
| `itemName` | `string` | Display name of the material.      |
| `amount`   | `number` | Quantity of the material required. |
| `image`    | `string` | Path to the material's image.      |

## Query Methods

`WizardQuery` extends `QueryBase` and inherits five terminal methods:

| Method             | Returns                       | Description                                 |
| ------------------ | ----------------------------- | ------------------------------------------- |
| `get()`            | `WizardBuilding[]`            | Return all results as an array.             |
| `first()`          | `WizardBuilding \| undefined` | Return the first result.                    |
| `find(id)`         | `WizardBuilding \| undefined` | Find a building by exact ID.                |
| `findByName(name)` | `WizardBuilding \| undefined` | Find a building by name (case-insensitive). |
| `count()`          | `number`                      | Return the number of results.               |

### Filter Methods

| Method              | Returns       | Description                                                 |
| ------------------- | ------------- | ----------------------------------------------------------- |
| `alwaysAvailable()` | `WizardQuery` | Filter to buildings with no special availability condition. |

### Sort Methods

| Method               | Returns       | Description                                                      |
| -------------------- | ------------- | ---------------------------------------------------------------- |
| `sortByCost(order?)` | `WizardQuery` | Sort by build cost. Pass `'asc'` (default) or `'desc'`.          |
| `sortByName(order?)` | `WizardQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |

## Examples

### List all buildings with costs and materials

```js
import { wizard } from 'stardew-valley-data'

wizard()
  .sortByCost()
  .get()
  .forEach((building) => {
    console.log(`${building.name} - ${building.buildCost}g`)
    building.materials.forEach((mat) => {
      console.log(`  ${mat.amount}x ${mat.itemName}`)
    })
  })
```

### Find the cheapest building

```js
import { wizard } from 'stardew-valley-data'

const cheapest = wizard().sortByCost().first()

if (cheapest) {
  console.log(`${cheapest.name} is the cheapest at ${cheapest.buildCost}g`)
  console.log('Materials needed:')
  cheapest.materials.forEach((mat) => {
    console.log(`  ${mat.amount}x ${mat.itemName}`)
  })
}
```

### Calculate total material costs

```js
import { wizard } from 'stardew-valley-data'

wizard()
  .get()
  .forEach((building) => {
    const materialList = building.materials
      .map((m) => `${m.amount}x ${m.itemName}`)
      .join(', ')
    console.log(`${building.name}: ${building.buildCost}g + ${materialList}`)
  })
```
