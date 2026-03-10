---
title: Maps
nextjs:
  metadata:
    title: Maps
    description: Query Stardew Valley farm map data including skills, features, tillable tiles, and starting items.
---

Access the complete dataset of Stardew Valley farm maps with typed skill, feature, and tile information using the chainable `FarmMapQuery` API. {% .lead %}

## Quick Start

```js
import { maps } from 'stardew-valley-data'

// Get all farm maps
const all = maps().get()

// Find a specific map by name
const standard = maps().findByName('Standard Farm')

// Get maps associated with a skill
const fishingMaps = maps().bySkill('fishing').get()

// Count available farm types
const total = maps().count()
```

## Type Definition

Each farm map record conforms to the `FarmMap` interface:

| Field           | Type       | Description                                            |
| --------------- | ---------- | ------------------------------------------------------ |
| `id`            | `string`   | Unique identifier for the farm map.                    |
| `name`          | `string`   | Display name of the farm type.                         |
| `description`   | `string`   | In-game description of the farm map.                   |
| `skills`        | `string[]` | Skills associated with this farm type.                 |
| `tillableTiles` | `number`   | Number of tiles available for planting crops.          |
| `features`      | `string[]` | Notable features of this map layout.                   |
| `startingItems` | `string[]` | Items available on the map from the start of the game. |
| `image`         | `string`   | Path to the farm map image.                            |
| `icon`          | `string`   | Path to the farm map icon.                             |

## Query Methods

`FarmMapQuery` extends `QueryBase` and inherits five terminal methods shared by all query builders:

| Method             | Returns                | Description                            |
| ------------------ | ---------------------- | -------------------------------------- |
| `get()`            | `FarmMap[]`            | Return all results as an array.        |
| `first()`          | `FarmMap \| undefined` | Return the first result.               |
| `find(id)`         | `FarmMap \| undefined` | Find a map by exact ID.                |
| `findByName(name)` | `FarmMap \| undefined` | Find a map by name (case-insensitive). |
| `count()`          | `number`               | Return the number of results.          |

### Filter Methods

| Method           | Returns        | Description                                                        |
| ---------------- | -------------- | ------------------------------------------------------------------ |
| `bySkill(skill)` | `FarmMapQuery` | Filter to maps associated with the given skill (case-insensitive). |

## Examples

### Compare tillable tile counts

```js
import { maps } from 'stardew-valley-data'

const allMaps = maps().get()

allMaps.forEach((m) => {
  console.log(`${m.name}: ${m.tillableTiles} tillable tiles`)
})
```

### Find maps by skill

```js
import { maps } from 'stardew-valley-data'

const miningMaps = maps().bySkill('mining').get()

miningMaps.forEach((m) => {
  console.log(`${m.name} — Features: ${m.features.join(', ')}`)
})
```

### View starting items for a map

```js
import { maps } from 'stardew-valley-data'

const riverland = maps().findByName('Riverland Farm')

if (riverland) {
  console.log(`Starting items: ${riverland.startingItems.join(', ')}`)
  console.log(`Features: ${riverland.features.join(', ')}`)
}
```

### Wrap a pre-filtered array

You can pass an existing `FarmMap[]` array into the `maps()` function to create a new query from it:

```js
import { maps } from 'stardew-valley-data'

const myList = maps().bySkill('foraging').get()
const reWrapped = maps(myList).get()
```
