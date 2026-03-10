---
title: Grandpa's Evaluation
nextjs:
  metadata:
    title: Grandpa's Evaluation
    description: Calculate Grandpa's end-of-Year-2 evaluation score with full breakdown by earnings, skills, achievements, and more.
---

Calculate Grandpa's end-of-Year-2 evaluation score using the `GrandpaEvaluator` class, which returns a detailed breakdown of points earned across six categories along with the resulting candle count (1--4). {% .lead %}

## Quick Start

```js
import { grandpaEvaluator } from 'stardew-valley-data'

const evaluator = grandpaEvaluator()

const result = evaluator.evaluate({
  totalEarnings: 500000,
  totalSkillLevels: 40,
  museumCompleted: true,
  masterAngler: false,
  fullShipment: false,
  married: true,
  villagersAt8Hearts: 8,
  petFriendship: true,
  communityCenterCompleted: true,
  communityCenterCeremonyAttended: true,
  skullKeyObtained: true,
  rustyKeyObtained: true,
})

console.log(`Score: ${result.score}/${result.maxScore}`)
console.log(`Candles: ${result.candles}`)
```

## Type Definitions

### GrandpaInput

The input object you pass to `evaluate()`:

| Field                             | Type      | Description                                                                    |
| --------------------------------- | --------- | ------------------------------------------------------------------------------ |
| `totalEarnings`                   | `number`  | Total gold earned (lifetime earnings).                                         |
| `totalSkillLevels`                | `number`  | Sum of all five skill levels (0--50).                                          |
| `museumCompleted`                 | `boolean` | Whether the museum collection is complete (A Complete Collection achievement). |
| `masterAngler`                    | `boolean` | Whether the Master Angler achievement is earned.                               |
| `fullShipment`                    | `boolean` | Whether the Full Shipment achievement is earned.                               |
| `married`                         | `boolean` | Whether the player is married with an upgraded house (kitchen and nursery).    |
| `villagersAt8Hearts`              | `number`  | Number of villagers at 8 or more hearts.                                       |
| `petFriendship`                   | `boolean` | Whether the pet is at max friendship.                                          |
| `communityCenterCompleted`        | `boolean` | Whether the Community Center is fully restored.                                |
| `communityCenterCeremonyAttended` | `boolean` | Whether the player attended the Community Center completion ceremony.          |
| `skullKeyObtained`                | `boolean` | Whether the Skull Key has been obtained (reach floor 120 of the mines).        |
| `rustyKeyObtained`                | `boolean` | Whether the Rusty Key has been obtained (60 museum donations).                 |

### GrandpaResult

The result returned by `evaluate()`:

| Field       | Type                  | Description                                |
| ----------- | --------------------- | ------------------------------------------ |
| `score`     | `number`              | Total points earned (0--21).               |
| `maxScore`  | `number`              | Maximum possible score (always 21).        |
| `candles`   | `1 \| 2 \| 3 \| 4`    | Number of candles lit on Grandpa's shrine. |
| `breakdown` | `GrandpaScoreEntry[]` | Detailed point breakdown by criterion.     |

### GrandpaScoreEntry

Each entry in the breakdown array:

| Field       | Type              | Description                                  |
| ----------- | ----------------- | -------------------------------------------- |
| `criterion` | `string`          | Description of the scoring criterion.        |
| `points`    | `number`          | Points earned for this criterion.            |
| `maxPoints` | `number`          | Maximum points available for this criterion. |
| `category`  | `GrandpaCategory` | The scoring category this belongs to.        |

### GrandpaCategory

A union type of the six scoring categories: `'earnings'`, `'skills'`, `'achievements'`, `'friendship'`, `'community-center'`, `'exploration'`.

## Scoring System

Grandpa's evaluation has a maximum score of 21 points across six categories:

### Earnings (0--7 points)

| Threshold  | Points |
| ---------- | ------ |
| 1,000,000g | 7      |
| 500,000g   | 5      |
| 300,000g   | 4      |
| 200,000g   | 3      |
| 100,000g   | 2      |
| 50,000g    | 1      |

### Skills (0--2 points)

| Criterion                | Points |
| ------------------------ | ------ |
| Total skill levels >= 30 | 1      |
| Total skill levels >= 50 | 1      |

### Achievements (0--3 points)

| Criterion                      | Points |
| ------------------------------ | ------ |
| A Complete Collection (museum) | 1      |
| Master Angler                  | 1      |
| Full Shipment                  | 1      |

### Friendship (0--4 points)

| Criterion                        | Points |
| -------------------------------- | ------ |
| Married with kitchen and nursery | 1      |
| 5+ villagers at 8 hearts         | 1      |
| 10+ villagers at 8 hearts        | 1      |
| Pet at max friendship            | 1      |

### Community Center (0--3 points)

| Criterion                    | Points |
| ---------------------------- | ------ |
| Community Center completed   | 1      |
| Completion ceremony attended | 2      |

### Exploration (0--2 points)

| Criterion          | Points |
| ------------------ | ------ |
| Skull Key obtained | 1      |
| Rusty Key obtained | 1      |

### Candle Thresholds

| Score | Candles         |
| ----- | --------------- |
| 12+   | 4 (best reward) |
| 8--11 | 3               |
| 4--7  | 2               |
| 0--3  | 1               |

## Examples

### Get a full evaluation with breakdown

```js
import { grandpaEvaluator } from 'stardew-valley-data'

const result = grandpaEvaluator().evaluate({
  totalEarnings: 1000000,
  totalSkillLevels: 50,
  museumCompleted: true,
  masterAngler: true,
  fullShipment: true,
  married: true,
  villagersAt8Hearts: 12,
  petFriendship: true,
  communityCenterCompleted: true,
  communityCenterCeremonyAttended: true,
  skullKeyObtained: true,
  rustyKeyObtained: true,
})

console.log(
  `Score: ${result.score}/${result.maxScore} — ${result.candles} candles`,
)

result.breakdown.forEach((entry) => {
  console.log(
    `  [${entry.category}] ${entry.criterion}: ${entry.points}/${entry.maxPoints}`,
  )
})
```

### Check what you need for 4 candles

```js
import { grandpaEvaluator } from 'stardew-valley-data'

const evaluator = grandpaEvaluator()

// Your current progress
const result = evaluator.evaluate({
  totalEarnings: 300000,
  totalSkillLevels: 35,
  museumCompleted: false,
  masterAngler: false,
  fullShipment: false,
  married: true,
  villagersAt8Hearts: 6,
  petFriendship: true,
  communityCenterCompleted: true,
  communityCenterCeremonyAttended: true,
  skullKeyObtained: true,
  rustyKeyObtained: true,
})

const needed = 12 - result.score

if (needed > 0) {
  console.log(`You need ${needed} more points for 4 candles.`)
  console.log('Missing points:')
  result.breakdown
    .filter((e) => e.points < e.maxPoints)
    .forEach((e) => {
      console.log(
        `  ${e.criterion}: ${e.points}/${e.maxPoints} (${e.maxPoints - e.points} available)`,
      )
    })
} else {
  console.log('You already qualify for 4 candles!')
}
```

### Group scores by category

```js
import { grandpaEvaluator } from 'stardew-valley-data'

const result = grandpaEvaluator().evaluate({
  totalEarnings: 500000,
  totalSkillLevels: 50,
  museumCompleted: true,
  masterAngler: false,
  fullShipment: true,
  married: true,
  villagersAt8Hearts: 10,
  petFriendship: true,
  communityCenterCompleted: true,
  communityCenterCeremonyAttended: true,
  skullKeyObtained: true,
  rustyKeyObtained: false,
})

const byCategory = {}
result.breakdown.forEach((entry) => {
  if (!byCategory[entry.category]) {
    byCategory[entry.category] = { earned: 0, max: 0 }
  }
  byCategory[entry.category].earned += entry.points
  byCategory[entry.category].max += entry.maxPoints
})

Object.entries(byCategory).forEach(([cat, totals]) => {
  console.log(`${cat}: ${totals.earned}/${totals.max}`)
})
```
