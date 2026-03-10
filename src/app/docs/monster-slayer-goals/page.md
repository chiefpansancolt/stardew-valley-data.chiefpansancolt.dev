---
title: Monster Slayer Goals
nextjs:
  metadata:
    title: Monster Slayer Goals
    description: Query Stardew Valley Adventurer's Guild monster slayer goals including kill targets and rewards.
---

Access every Monster Slayer Goal from the Adventurer's Guild, including kill targets, qualifying monsters, and rewards. {% .lead %}

## Quick Start

```js
import { monsterSlayerGoals } from 'stardew-valley-data'

// Get all slayer goals
const allGoals = monsterSlayerGoals().get()

// Find a specific goal by name
const slimeGoal = monsterSlayerGoals().findByName('Slimes')

// Sort goals by kill target (easiest first)
const easiestFirst = monsterSlayerGoals().sortByKillTarget('asc').get()
```

## Type Definition

The `MonsterSlayerGoal` type represents a single Adventurer's Guild kill quest.

| Field        | Type           | Description                                   |
| ------------ | -------------- | --------------------------------------------- |
| `id`         | `string`       | Unique identifier                             |
| `name`       | `string`       | Display name of the goal                      |
| `killTarget` | `number`       | Number of kills required to complete the goal |
| `monsters`   | `string[]`     | Names of monsters that count toward this goal |
| `reward`     | `SlayerReward` | The reward given upon completion              |

### SlayerReward

| Field    | Type             | Description                                         |
| -------- | ---------------- | --------------------------------------------------- |
| `name`   | `string`         | Reward name                                         |
| `itemId` | `string \| null` | Item ID of the reward, or `null` if non-item reward |
| `image`  | `string \| null` | Relative path to the reward image, or `null`        |

## Query Methods

Create a query with the `monsterSlayerGoals()` function. Every sort method returns a new `MonsterSlayerGoalQuery`, so you can chain calls in any order.

### Sort Methods

| Method             | Signature                                                           | Description                                            |
| ------------------ | ------------------------------------------------------------------- | ------------------------------------------------------ |
| `sortByKillTarget` | `sortByKillTarget(order?: 'asc' \| 'desc'): MonsterSlayerGoalQuery` | Sort by kill target. Default: `'asc'` (easiest first). |

### Terminal Methods

These methods are inherited from the base query and return actual values instead of a new query.

| Method       | Signature                                                  | Description                                          |
| ------------ | ---------------------------------------------------------- | ---------------------------------------------------- |
| `get`        | `get(): MonsterSlayerGoal[]`                               | Return all results as an array.                      |
| `first`      | `first(): MonsterSlayerGoal \| undefined`                  | Return the first result, or `undefined` if empty.    |
| `find`       | `find(id: string): MonsterSlayerGoal \| undefined`         | Find an item by its exact ID.                        |
| `findByName` | `findByName(name: string): MonsterSlayerGoal \| undefined` | Find an item by name (case-insensitive exact match). |
| `count`      | `count(): number`                                          | Return the number of results.                        |

## Examples

### List all goals sorted by difficulty

```js
import { monsterSlayerGoals } from 'stardew-valley-data'

const goals = monsterSlayerGoals().sortByKillTarget('desc').get()
goals.forEach((g) =>
  console.log(`${g.name}: Kill ${g.killTarget} — Reward: ${g.reward.name}`),
)
```

### Find the easiest goal to complete

```js
import { monsterSlayerGoals } from 'stardew-valley-data'

const easiest = monsterSlayerGoals().sortByKillTarget('asc').first()
if (easiest) {
  console.log(`Easiest goal: ${easiest.name} (${easiest.killTarget} kills)`)
}
```

### List which monsters count toward a goal

```js
import { monsterSlayerGoals } from 'stardew-valley-data'

const goal = monsterSlayerGoals().findByName('Void Spirits')
if (goal) {
  console.log(`Monsters that count: ${goal.monsters.join(', ')}`)
}
```

### Count total slayer goals

```js
import { monsterSlayerGoals } from 'stardew-valley-data'

console.log(`There are ${monsterSlayerGoals().count()} monster slayer goals`)
```
