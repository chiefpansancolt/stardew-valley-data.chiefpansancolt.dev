---
title: Monsters
nextjs:
  metadata:
    title: Monsters
    description: Query and filter Stardew Valley monster data including locations, loot, dangerous variants, and stats.
---

Access every monster in Stardew Valley with filters for location, loot, dangerous variants, and sorting by XP or HP. {% .lead %}

## Quick Start

```js
import { monsters } from 'stardew-valley-data'

// Get all monsters
const allMonsters = monsters().get()

// Find a specific monster by name
const bat = monsters().findByName('Bat')

// Get dangerous variants in the Skull Cavern
const dangerousCavern = monsters().dangerous().byLocation('skull cavern').get()
```

## Type Definition

The `Monster` type represents a single monster entry.

| Field       | Type       | Description                          |
| ----------- | ---------- | ------------------------------------ |
| `id`        | `string`   | Unique identifier                    |
| `name`      | `string`   | Display name                         |
| `hp`        | `number`   | Hit points                           |
| `damage`    | `number`   | Base damage dealt                    |
| `speed`     | `number`   | Movement speed                       |
| `xp`        | `number`   | Experience rewarded on kill          |
| `image`     | `string`   | Relative path to the monster image   |
| `locations` | `string[]` | Locations where the monster spawns   |
| `lootIds`   | `string[]` | IDs of loot items this monster drops |
| `dangerous` | `boolean`  | Whether this is a Dangerous variant  |

## Query Methods

Create a query with the `monsters()` function. Every filter and sort method returns a new `MonsterQuery`, so you can chain calls in any order.

### Filter Methods

| Method       | Signature                                    | Description                                                                             |
| ------------ | -------------------------------------------- | --------------------------------------------------------------------------------------- |
| `byLocation` | `byLocation(location: string): MonsterQuery` | Filter to monsters that spawn in the given location (case-insensitive substring match). |
| `dropsLoot`  | `dropsLoot(lootId: string): MonsterQuery`    | Filter to monsters that drop the given loot item ID.                                    |
| `dangerous`  | `dangerous(): MonsterQuery`                  | Filter to Dangerous mode variants only.                                                 |
| `standard`   | `standard(): MonsterQuery`                   | Filter to standard (non-Dangerous) variants only.                                       |

### Sort Methods

| Method     | Signature                                         | Description                                                     |
| ---------- | ------------------------------------------------- | --------------------------------------------------------------- |
| `sortByXp` | `sortByXp(order?: 'asc' \| 'desc'): MonsterQuery` | Sort by XP rewarded on kill. Default: `'desc'` (most XP first). |
| `sortByHp` | `sortByHp(order?: 'asc' \| 'desc'): MonsterQuery` | Sort by max HP. Default: `'desc'` (tankiest first).             |

### Terminal Methods

These methods are inherited from the base query and return actual values instead of a new query.

| Method       | Signature                                        | Description                                          |
| ------------ | ------------------------------------------------ | ---------------------------------------------------- |
| `get`        | `get(): Monster[]`                               | Return all results as an array.                      |
| `first`      | `first(): Monster \| undefined`                  | Return the first result, or `undefined` if empty.    |
| `find`       | `find(id: string): Monster \| undefined`         | Find an item by its exact ID.                        |
| `findByName` | `findByName(name: string): Monster \| undefined` | Find an item by name (case-insensitive exact match). |
| `count`      | `count(): number`                                | Return the number of results.                        |

## Examples

### Get all monsters in the Mines

```js
import { monsters } from 'stardew-valley-data'

const mineMonsters = monsters().byLocation('mines').get()
console.log(`${mineMonsters.length} monsters found in the Mines`)
```

### Find the tankiest standard monsters

```js
import { monsters } from 'stardew-valley-data'

const tanks = monsters().standard().sortByHp('desc').get().slice(0, 5)

tanks.forEach((m) => console.log(`${m.name}: ${m.hp} HP`))
```

### Get dangerous monsters sorted by XP reward

```js
import { monsters } from 'stardew-valley-data'

const dangerousByXp = monsters().dangerous().sortByXp('desc').get()

dangerousByXp.forEach((m) => console.log(`${m.name}: ${m.xp} XP`))
```

### Find monsters that drop a specific loot item

```js
import { monsters } from 'stardew-valley-data'

const dropsItem = monsters().dropsLoot('bat-wing').get()
dropsItem.forEach((m) => console.log(m.name))
```

### Count monsters by location

```js
import { monsters } from 'stardew-valley-data'

const skullCavernCount = monsters().byLocation('skull cavern').count()
console.log(`Skull Cavern has ${skullCavernCount} monster types`)
```
