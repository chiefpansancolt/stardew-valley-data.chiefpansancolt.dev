---
title: Special Items
nextjs:
  metadata:
    title: Special Items
    description: Query Stardew Valley special items, books, skill books, and mastery powers with filters by type and skill.
---

Access every special item, book, skill book, and mastery power in Stardew Valley with filters for type and associated skill. {% .lead %}

## Quick Start

```js
import { specialItems } from 'stardew-valley-data'

// Get all special items and powers
const all = specialItems().get()

// Get only books
const books = specialItems().byType('book').get()

// Get mastery powers for combat
const combatMastery = specialItems().byType('mastery').bySkill('combat').get()
```

## Type Definition

The `SpecialItem` type represents a special item, book, skill book, or mastery power.

| Field          | Type                        | Description                             |
| -------------- | --------------------------- | --------------------------------------- |
| `id`           | `string`                    | Unique identifier                       |
| `name`         | `string`                    | Display name                            |
| `type`         | `SpecialItemType`           | Category of the item                    |
| `effect`       | `string`                    | Description of the item's effect        |
| `obtainedFrom` | `string`                    | How to obtain this item                 |
| `image`        | `string`                    | Relative path to the item image         |
| `skill`        | `MasterySkill` _(optional)_ | Associated mastery skill, if applicable |
| `mailFlags`    | `string[]` _(optional)_     | Mail flags associated with this item    |
| `eventFlags`   | `string[]` _(optional)_     | Event flags associated with this item   |

### SpecialItemType

```ts
type SpecialItemType = 'special-item' | 'book' | 'skill-book' | 'mastery'
```

### MasterySkill

```ts
type MasterySkill = 'farming' | 'mining' | 'foraging' | 'fishing' | 'combat'
```

## Query Methods

Create a query with the `specialItems()` function. Every filter and sort method returns a new `SpecialItemQuery`, so you can chain calls in any order.

### Filter Methods

| Method    | Signature                                         | Description                                                                                       |
| --------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `byType`  | `byType(type: SpecialItemType): SpecialItemQuery` | Filter to entries of the given type (`'special-item'`, `'book'`, `'skill-book'`, or `'mastery'`). |
| `bySkill` | `bySkill(skill: MasterySkill): SpecialItemQuery`  | Filter mastery items by associated skill.                                                         |

### Sort Methods

| Method       | Signature                                               | Description                                    |
| ------------ | ------------------------------------------------------- | ---------------------------------------------- |
| `sortByName` | `sortByName(order?: 'asc' \| 'desc'): SpecialItemQuery` | Sort alphabetically by name. Default: `'asc'`. |

### Terminal Methods

These methods are inherited from the base query and return actual values instead of a new query.

| Method       | Signature                                            | Description                                          |
| ------------ | ---------------------------------------------------- | ---------------------------------------------------- |
| `get`        | `get(): SpecialItem[]`                               | Return all results as an array.                      |
| `first`      | `first(): SpecialItem \| undefined`                  | Return the first result, or `undefined` if empty.    |
| `find`       | `find(id: string): SpecialItem \| undefined`         | Find an item by its exact ID.                        |
| `findByName` | `findByName(name: string): SpecialItem \| undefined` | Find an item by name (case-insensitive exact match). |
| `count`      | `count(): number`                                    | Return the number of results.                        |

## Examples

### List all books and their effects

```js
import { specialItems } from 'stardew-valley-data'

const books = specialItems().byType('book').sortByName().get()
books.forEach((b) => console.log(`${b.name}: ${b.effect}`))
```

### Get all mastery powers grouped by skill

```js
import { specialItems } from 'stardew-valley-data'

const skills = ['farming', 'mining', 'foraging', 'fishing', 'combat']
skills.forEach((skill) => {
  const masteries = specialItems().byType('mastery').bySkill(skill).get()
  console.log(`\n${skill.toUpperCase()}:`)
  masteries.forEach((m) => console.log(`  ${m.name}: ${m.effect}`))
})
```

### Find all skill books

```js
import { specialItems } from 'stardew-valley-data'

const skillBooks = specialItems().byType('skill-book').get()
skillBooks.forEach((sb) =>
  console.log(`${sb.name} — ${sb.effect} (from: ${sb.obtainedFrom})`),
)
```

### Look up a special item by name

```js
import { specialItems } from 'stardew-valley-data'

const item = specialItems().findByName('Dark Talisman')
if (item) {
  console.log(`${item.name}: ${item.effect}`)
  console.log(`Obtained from: ${item.obtainedFrom}`)
}
```

### Count items by type

```js
import { specialItems } from 'stardew-valley-data'

console.log(`Total: ${specialItems().count()}`)
console.log(`Special items: ${specialItems().byType('special-item').count()}`)
console.log(`Books: ${specialItems().byType('book').count()}`)
console.log(`Skill books: ${specialItems().byType('skill-book').count()}`)
console.log(`Mastery powers: ${specialItems().byType('mastery').count()}`)
```
