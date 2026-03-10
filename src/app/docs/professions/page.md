---
title: Professions
nextjs:
  metadata:
    title: Professions
    description: Query Stardew Valley profession data by skill, level, and parent profession with the ProfessionQuery API.
---

Access the complete dataset of Stardew Valley professions and filter by skill, level, or parent profession to explore the branching progression paths using the chainable `ProfessionQuery` API. {% .lead %}

## Quick Start

```js
import { professions } from 'stardew-valley-data'

// Get all professions
const all = professions().get()

// Get all farming professions
const farmingProfs = professions().bySkill('Farming').get()

// Get only level-5 professions
const level5 = professions().byLevel(5).get()

// Find a specific profession
const artisan = professions().findByName('Artisan')
```

## Type Definition

Each profession record conforms to the `ProfessionData` interface:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier for the profession. |
| `name` | `string` | Display name of the profession. |
| `skill` | `ProfessionSkill` | The parent skill: `'Farming'`, `'Fishing'`, `'Foraging'`, `'Mining'`, or `'Combat'`. |
| `level` | `5 \| 10` | Whether this is a level-5 or level-10 profession. |
| `parentProfession` | `string \| null` | The ID of the level-5 profession this branches from, or `null` for level-5 professions. |
| `description` | `string` | Description of the profession's effect. |

The `ProfessionSkill` type is defined as `'Farming' | 'Fishing' | 'Foraging' | 'Mining' | 'Combat'`.

## Query Methods

`ProfessionQuery` extends `QueryBase` and inherits five terminal methods shared by all query builders:

| Method | Returns | Description |
| --- | --- | --- |
| `get()` | `ProfessionData[]` | Return all results as an array. |
| `first()` | `ProfessionData \| undefined` | Return the first result. |
| `find(id)` | `ProfessionData \| undefined` | Find a profession by exact ID. |
| `findByName(name)` | `ProfessionData \| undefined` | Find a profession by name (case-insensitive). |
| `count()` | `number` | Return the number of results. |

### Filter Methods

| Method | Returns | Description |
| --- | --- | --- |
| `bySkill(skill)` | `ProfessionQuery` | Filter by skill name. Accepts a `ProfessionSkill` value. |
| `byLevel(level)` | `ProfessionQuery` | Filter by profession level. Pass `5` or `10`. |
| `byParent(parentId)` | `ProfessionQuery` | Filter to professions that branch from a given parent profession ID. |

### Sort Methods

| Method | Returns | Description |
| --- | --- | --- |
| `sortByName(order?)` | `ProfessionQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |

## Examples

### List all level-5 profession choices by skill

```js
import { professions } from 'stardew-valley-data'

const skills = ['Farming', 'Fishing', 'Foraging', 'Mining', 'Combat']

skills.forEach((skill) => {
  const profs = professions().bySkill(skill).byLevel(5).get()
  console.log(`${skill}: ${profs.map((p) => p.name).join(' or ')}`)
})
```

### Explore a profession's branching path

```js
import { professions } from 'stardew-valley-data'

// Find the level-5 profession
const tiller = professions().findByName('Tiller')

if (tiller) {
  // Get the two level-10 options that branch from it
  const options = professions().byParent(tiller.id).get()

  console.log(`${tiller.name} (Level 5): ${tiller.description}`)
  options.forEach((p) => {
    console.log(`  -> ${p.name} (Level 10): ${p.description}`)
  })
}
```

### Get all level-10 professions sorted alphabetically

```js
import { professions } from 'stardew-valley-data'

const level10 = professions()
  .byLevel(10)
  .sortByName()
  .get()

level10.forEach((p) => {
  console.log(`${p.name} (${p.skill}): ${p.description}`)
})
```

### Build a complete profession tree for a skill

```js
import { professions } from 'stardew-valley-data'

const skill = 'Mining'
const level5Profs = professions().bySkill(skill).byLevel(5).get()

level5Profs.forEach((l5) => {
  console.log(`${l5.name}: ${l5.description}`)
  const children = professions().byParent(l5.id).get()
  children.forEach((l10) => {
    console.log(`  -> ${l10.name}: ${l10.description}`)
  })
})
```

### Wrap a pre-filtered array

```js
import { professions } from 'stardew-valley-data'

const combatProfs = professions().bySkill('Combat').get()
const sorted = professions(combatProfs).sortByName('desc').get()
```
