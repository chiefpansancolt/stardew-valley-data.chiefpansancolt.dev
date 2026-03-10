---
title: Villagers
nextjs:
  metadata:
    title: Villagers
    description: Query and filter Stardew Valley villager data including gift preferences, birthdays, and marriage candidates.
---

Access the complete dataset of Stardew Valley villagers with typed gift preferences, birthday information, and relationship details using the chainable `VillagerQuery` API. {% .lead %}

## Quick Start

```js
import { villagers } from 'stardew-valley-data'

// Get all villagers
const all = villagers().get()

// Find a specific villager by name
const penny = villagers().findByName('Penny')

// Get all marriageable villagers sorted by name
const singles = villagers().marriageable().sortByName().get()

// Get villagers with birthdays in spring
const springBirthdays = villagers().byBirthdaySeason('spring').get()
```

## Type Definition

Each villager record conforms to the `Villager` interface:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier for the villager. |
| `name` | `string` | Display name of the villager. |
| `birthday` | `{ day: number; season: 'spring' \| 'summer' \| 'fall' \| 'winter' }` | The villager's birthday, with season and day of month (1--28). |
| `address` | `string` | Where the villager lives. |
| `occupation` | `string` | The villager's job or role. |
| `marriageable` | `boolean` | Whether the villager can be married or become a roommate. |
| `image` | `string` | Path to the villager's portrait image. |
| `spouseImage` | `string \| undefined` | Path to the spouse-specific portrait image (only present for marriageable villagers). |
| `hearts` | `{ max: number; bouquetIncrease: number; spouseIncrease: number }` | Heart progression details: maximum hearts, bonus from bouquet, and bonus from marriage. |
| `loves` | `string[]` | Items the villager loves receiving as gifts. |
| `likes` | `string[]` | Items the villager likes receiving as gifts. |
| `neutrals` | `string[]` | Items the villager is neutral about. |
| `dislikes` | `string[]` | Items the villager dislikes receiving. |
| `hates` | `string[]` | Items the villager hates receiving. |

## Query Methods

`VillagerQuery` extends `QueryBase` and inherits five terminal methods shared by all query builders:

| Method | Returns | Description |
| --- | --- | --- |
| `get()` | `Villager[]` | Return all results as an array. |
| `first()` | `Villager \| undefined` | Return the first result. |
| `find(id)` | `Villager \| undefined` | Find a villager by exact ID. |
| `findByName(name)` | `Villager \| undefined` | Find a villager by name (case-insensitive). |
| `count()` | `number` | Return the number of results. |

### Filter Methods

| Method | Returns | Description |
| --- | --- | --- |
| `marriageable()` | `VillagerQuery` | Filter to villagers who can be married or become roommates. |
| `byBirthdaySeason(season)` | `VillagerQuery` | Filter to villagers with a birthday in the given season. Accepts `'spring'`, `'summer'`, `'fall'`, or `'winter'`. |

### Sort Methods

| Method | Returns | Description |
| --- | --- | --- |
| `sortByName(order?)` | `VillagerQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |
| `sortByBirthday()` | `VillagerQuery` | Sort by birthday in calendar order (spring through winter, day 1 through 28). |

## Examples

### List all marriage candidates

```js
import { villagers } from 'stardew-valley-data'

const candidates = villagers().marriageable().sortByName().get()

candidates.forEach((v) => {
  console.log(`${v.name} — Birthday: ${v.birthday.season} ${v.birthday.day}`)
})
```

### Find loved gifts for a villager

```js
import { villagers } from 'stardew-valley-data'

const abigail = villagers().findByName('Abigail')

if (abigail) {
  console.log(`${abigail.name} loves: ${abigail.loves.join(', ')}`)
}
```

### Get a birthday calendar for a season

```js
import { villagers } from 'stardew-valley-data'

const winterBirthdays = villagers()
  .byBirthdaySeason('winter')
  .sortByBirthday()
  .get()

winterBirthdays.forEach((v) => {
  console.log(`${v.birthday.season} ${v.birthday.day}: ${v.name}`)
})
```

### Chain filters and sorts

```js
import { villagers } from 'stardew-valley-data'

// Marriageable villagers with spring birthdays, sorted by birthday
const results = villagers()
  .marriageable()
  .byBirthdaySeason('spring')
  .sortByBirthday()
  .get()
```

### Wrap a pre-filtered array

You can pass an existing `Villager[]` array into the `villagers()` function to create a new query from it:

```js
import { villagers } from 'stardew-valley-data'

const myList = villagers().marriageable().get()
const sorted = villagers(myList).sortByName('desc').get()
```
