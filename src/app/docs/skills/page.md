---
title: Skills
nextjs:
  metadata:
    title: Skills
    description: Query Stardew Valley skill data and use utility functions for title scores, mastery levels, and profession options.
---

Access the complete Stardew Valley skills dataset and use utility functions to calculate player titles, mastery levels, and profession branching paths with the `SkillQuery` API. {% .lead %}

## Quick Start

```js
import { skills, getTitle, getMasteryLevel, getProfessionOptions } from 'stardew-valley-data'

// Get all skills
const all = skills().get()

// Find a skill by name
const farming = skills().findByName('Farming')

// Calculate a player's title
const title = getTitle(10, 8, 7, 9, 6)

// Get mastery level from total XP
const level = getMasteryLevel(50000)

// Get level-10 profession options for a given level-5 choice
const options = getProfessionOptions('Farming', 'Tiller')
```

## Type Definition

Each skill record conforms to the `Skill` interface:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier for the skill. |
| `name` | `string` | Display name of the skill (e.g., `"Farming"`, `"Mining"`). |
| `description` | `string` | Description of the skill. |
| `toolBonus` | `string` | The tool proficiency bonus gained from leveling this skill. |
| `image` | `string` | Path to the skill's icon image. |
| `levels` | `SkillLevel[]` | Array of level progression data (see below). |
| `mastery` | `SkillMastery` | Mastery unlock information for this skill. |

### SkillLevel

| Field | Type | Description |
| --- | --- | --- |
| `level` | `number` | The level number (1--10). |
| `xpRequired` | `number` | XP required to reach this level from the previous level. |
| `totalXp` | `number` | Cumulative XP required to reach this level. |
| `recipes` | `SkillLevelRecipes` | Recipes unlocked at this level. |

### SkillLevelRecipes

| Field | Type | Description |
| --- | --- | --- |
| `crafting` | `string[]` | Crafting recipes unlocked at this level. |
| `cooking` | `string[]` | Cooking recipes unlocked at this level. |

### SkillMastery

| Field | Type | Description |
| --- | --- | --- |
| `unlocks` | `MasteryUnlock[]` | Array of mastery unlocks for this skill. |

### MasteryUnlock

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` | Name of the mastery unlock. |
| `description` | `string` | Description of what this mastery grants. |

## Query Methods

`SkillQuery` extends `QueryBase` and inherits five terminal methods. It does not add additional filter or sort methods -- use the utility functions below for calculations.

| Method | Returns | Description |
| --- | --- | --- |
| `get()` | `Skill[]` | Return all results as an array. |
| `first()` | `Skill \| undefined` | Return the first result. |
| `find(id)` | `Skill \| undefined` | Find a skill by exact ID. |
| `findByName(name)` | `Skill \| undefined` | Find a skill by name (case-insensitive). |
| `count()` | `number` | Return the number of results. |

## Utility Functions

### getTitleScore(farming, fishing, foraging, mining, combat)

Calculates the player's title score using the game's formula: `floor((farming + fishing + foraging + mining + combat) / 2)`.

```js
import { getTitleScore } from 'stardew-valley-data'

const score = getTitleScore(10, 10, 10, 10, 10) // 25
```

### getTitle(farming, fishing, foraging, mining, combat)

Returns the player's title string based on their combined skill levels. Uses the same formula as `getTitleScore` internally.

```js
import { getTitle } from 'stardew-valley-data'

const title = getTitle(10, 10, 10, 10, 10) // "Farmer"
const newbie = getTitle(1, 0, 0, 0, 0)     // "Newcomer"
```

### getMasteryLevel(masteryXp)

Returns the current mastery level (0--5) for a given total mastery XP amount.

```js
import { getMasteryLevel } from 'stardew-valley-data'

getMasteryLevel(0)       // 0
getMasteryLevel(10000)   // 1
getMasteryLevel(100000)  // 5
```

### getProfessionOptions(skillName, level5Profession)

Returns the level-10 profession options available for a given skill and level-5 profession choice. Returns an empty array if the skill or profession is not found.

```js
import { getProfessionOptions } from 'stardew-valley-data'

const options = getProfessionOptions('Farming', 'Tiller')
// Returns the two level-10 professions that branch from Tiller

options.forEach((p) => {
  console.log(`${p.name}: ${p.description}`)
})
```

## Constants

### SKILL_TITLES

An array of `TitleThreshold` objects sorted from highest to lowest `minScore`. Each entry maps a minimum score to a title.

| Field | Type | Description |
| --- | --- | --- |
| `minScore` | `number` | Minimum title score required. |
| `title` | `string` | Title displayed in-game. |

The full title ladder:

| Score | Title |
| --- | --- |
| 30 | Farm King |
| 29 | Cropmaster |
| 27 | Agriculturist |
| 25 | Farmer |
| 23 | Rancher |
| 21 | Planter |
| 19 | Granger |
| 17 | Farmgirl / Farmboy |
| 15 | Sodbuster |
| 13 | Smallholder |
| 11 | Tiller |
| 9 | Farmhand |
| 7 | Cowpoke |
| 5 | Bumpkin |
| 3 | Greenhorn |
| 0 | Newcomer |

### MASTERY_LEVELS

An array of `MasteryLevel` objects describing the XP thresholds for each mastery level.

| Level | XP Required | Total XP |
| --- | --- | --- |
| 1 | 10,000 | 10,000 |
| 2 | 15,000 | 25,000 |
| 3 | 20,000 | 45,000 |
| 4 | 25,000 | 70,000 |
| 5 | 30,000 | 100,000 |

## Examples

### Display all skills with their level-up recipes

```js
import { skills } from 'stardew-valley-data'

skills().get().forEach((skill) => {
  console.log(`\n${skill.name}`)
  skill.levels.forEach((lvl) => {
    const crafting = lvl.recipes.crafting.join(', ') || 'none'
    const cooking = lvl.recipes.cooking.join(', ') || 'none'
    console.log(`  Level ${lvl.level}: Crafting: ${crafting} | Cooking: ${cooking}`)
  })
})
```

### Build a player stats summary

```js
import { getTitle, getTitleScore, getMasteryLevel } from 'stardew-valley-data'

const farming = 10, fishing = 8, foraging = 7, mining = 9, combat = 6
const score = getTitleScore(farming, fishing, foraging, mining, combat)
const title = getTitle(farming, fishing, foraging, mining, combat)
const mastery = getMasteryLevel(45000)

console.log(`Title: ${title} (score: ${score})`)
console.log(`Mastery Level: ${mastery}`)
```

### Explore profession branching paths

```js
import { skills, getProfessionOptions } from 'stardew-valley-data'

const farming = skills().findByName('Farming')

if (farming) {
  // Level 5 options would come from the professions module
  const tillerPath = getProfessionOptions('Farming', 'Tiller')
  const rancherPath = getProfessionOptions('Farming', 'Rancher')

  console.log('Tiller leads to:', tillerPath.map((p) => p.name).join(', '))
  console.log('Rancher leads to:', rancherPath.map((p) => p.name).join(', '))
}
```
