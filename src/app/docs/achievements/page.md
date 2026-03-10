---
title: Achievements
nextjs:
  metadata:
    title: Achievements
    description: Query Stardew Valley achievements by secret status, in-game visibility, and rewards with the AchievementQuery API.
---

Access the complete dataset of Stardew Valley achievements and filter by secret status, in-game visibility, or reward availability using the chainable `AchievementQuery` API. {% .lead %}

## Quick Start

```js
import { achievements } from 'stardew-valley-data'

// Get all achievements
const all = achievements().get()

// Get only secret achievements
const secrets = achievements().secret().get()

// Get achievements with in-game rewards
const rewarded = achievements().withReward().get()

// Get in-game achievements sorted by name
const inGame = achievements().inGame().sortByName().get()
```

## Type Definition

Each achievement record conforms to the `Achievement` interface:

| Field         | Type             | Description                                                                            |
| ------------- | ---------------- | -------------------------------------------------------------------------------------- |
| `id`          | `string`         | Unique identifier for the achievement.                                                 |
| `name`        | `string`         | Display name of the achievement.                                                       |
| `description` | `string`         | Description of how to unlock the achievement.                                          |
| `image`       | `string`         | Path to the achievement's image.                                                       |
| `icon`        | `string \| null` | Path to the in-game icon, or `null` for platform-only achievements (Steam/GOG).        |
| `reward`      | `string \| null` | In-game reward granted upon completion (e.g., a hat or title), or `null` if no reward. |
| `secret`      | `boolean`        | Whether this achievement is hidden until unlocked.                                     |

## Query Methods

`AchievementQuery` extends `QueryBase` and inherits five terminal methods shared by all query builders:

| Method             | Returns                    | Description                                     |
| ------------------ | -------------------------- | ----------------------------------------------- |
| `get()`            | `Achievement[]`            | Return all results as an array.                 |
| `first()`          | `Achievement \| undefined` | Return the first result.                        |
| `find(id)`         | `Achievement \| undefined` | Find an achievement by exact ID.                |
| `findByName(name)` | `Achievement \| undefined` | Find an achievement by name (case-insensitive). |
| `count()`          | `number`                   | Return the number of results.                   |

### Filter Methods

| Method         | Returns            | Description                                                                                                                     |
| -------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `secret()`     | `AchievementQuery` | Filter to secret achievements (hidden until unlocked).                                                                          |
| `inGame()`     | `AchievementQuery` | Filter to in-game achievements (those with an in-game icon). Excludes platform-only achievements that only appear on Steam/GOG. |
| `withReward()` | `AchievementQuery` | Filter to achievements that grant an in-game reward (hat, title, etc.).                                                         |

### Sort Methods

| Method               | Returns            | Description                                                      |
| -------------------- | ------------------ | ---------------------------------------------------------------- |
| `sortByName(order?)` | `AchievementQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |

## Examples

### List all secret achievements

```js
import { achievements } from 'stardew-valley-data'

const secrets = achievements().secret().sortByName().get()

secrets.forEach((a) => {
  console.log(`${a.name}: ${a.description}`)
})
```

### Find achievements that give rewards

```js
import { achievements } from 'stardew-valley-data'

const rewarded = achievements().withReward().sortByName().get()

rewarded.forEach((a) => {
  console.log(`${a.name} — Reward: ${a.reward}`)
})
```

### Count in-game vs platform-only achievements

```js
import { achievements } from 'stardew-valley-data'

const total = achievements().count()
const inGame = achievements().inGame().count()
const platformOnly = total - inGame

console.log(`Total: ${total}`)
console.log(`In-game: ${inGame}`)
console.log(`Platform-only: ${platformOnly}`)
```

### Look up a specific achievement

```js
import { achievements } from 'stardew-valley-data'

const achievement = achievements().findByName('Master Angler')

if (achievement) {
  console.log(`${achievement.name}: ${achievement.description}`)
  console.log(`Secret: ${achievement.secret}`)
  console.log(`Reward: ${achievement.reward ?? 'None'}`)
}
```

### Chain filters together

```js
import { achievements } from 'stardew-valley-data'

// In-game achievements with rewards, sorted by name
const results = achievements().inGame().withReward().sortByName().get()
```

### Wrap a pre-filtered array

```js
import { achievements } from 'stardew-valley-data'

const secrets = achievements().secret().get()
const sorted = achievements(secrets).sortByName('desc').get()
```
