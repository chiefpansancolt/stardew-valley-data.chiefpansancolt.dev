---
title: Monster Loot
nextjs:
  metadata:
    title: Monster Loot
    description: Query Stardew Valley monster loot drops including item details and which monsters drop them.
---

Access every monster loot drop in Stardew Valley and filter by which monster drops a given item. {% .lead %}

## Quick Start

```js
import { monsterLoot } from 'stardew-valley-data'

// Get all monster loot
const allLoot = monsterLoot().get()

// Find a specific loot item by name
const batWing = monsterLoot().findByName('Bat Wing')

// Get loot dropped by a specific monster
const slimeLoot = monsterLoot().droppedBy('green-slime').get()
```

## Type Definition

The `MonsterLoot` type represents a single loot item that can be dropped by monsters.

| Field       | Type       | Description                     |
| ----------- | ---------- | ------------------------------- |
| `id`        | `string`   | Unique identifier               |
| `name`      | `string`   | Display name                    |
| `sellPrice` | `number`   | Sell price in gold              |
| `image`     | `string`   | Relative path to the item image |
| `droppedBy` | `string[]` | Monster IDs that drop this item |

## Query Methods

Create a query with the `monsterLoot()` function. Every filter method returns a new `MonsterLootQuery`, so you can chain calls in any order.

### Filter Methods

| Method      | Signature                                        | Description                                           |
| ----------- | ------------------------------------------------ | ----------------------------------------------------- |
| `droppedBy` | `droppedBy(monsterId: string): MonsterLootQuery` | Filter to loot items dropped by the given monster ID. |

### Terminal Methods

These methods are inherited from the base query and return actual values instead of a new query.

| Method       | Signature                                            | Description                                          |
| ------------ | ---------------------------------------------------- | ---------------------------------------------------- |
| `get`        | `get(): MonsterLoot[]`                               | Return all results as an array.                      |
| `first`      | `first(): MonsterLoot \| undefined`                  | Return the first result, or `undefined` if empty.    |
| `find`       | `find(id: string): MonsterLoot \| undefined`         | Find an item by its exact ID.                        |
| `findByName` | `findByName(name: string): MonsterLoot \| undefined` | Find an item by name (case-insensitive exact match). |
| `count`      | `count(): number`                                    | Return the number of results.                        |

## Examples

### List all loot dropped by a monster

```js
import { monsterLoot } from 'stardew-valley-data'

const loot = monsterLoot().droppedBy('dust-sprite').get()
loot.forEach((item) =>
  console.log(`${item.name} (sells for ${item.sellPrice}g)`),
)
```

### Look up a loot item by ID

```js
import { monsterLoot } from 'stardew-valley-data'

const item = monsterLoot().find('bat-wing')
if (item) {
  console.log(`${item.name} is dropped by ${item.droppedBy.length} monster(s)`)
}
```

### Cross-reference monsters and their loot

```js
import { monsters, monsterLoot } from 'stardew-valley-data'

const monster = monsters().findByName('Shadow Brute')
if (monster) {
  const loot = monster.lootIds.map((id) => monsterLoot().find(id))
  loot.forEach((item) => {
    if (item) console.log(`${monster.name} drops ${item.name}`)
  })
}
```

### Count total loot items

```js
import { monsterLoot } from 'stardew-valley-data'

console.log(`There are ${monsterLoot().count()} unique monster loot items`)
```
