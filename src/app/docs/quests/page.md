---
title: Quests
nextjs:
  metadata:
    title: Quests
    description: Query Stardew Valley quest data including requirements, rewards, and providers with the QuestQuery API.
---

Access the full dataset of Stardew Valley quests with details on who provides each quest, what is required, and what rewards are earned, using the chainable `QuestQuery` API. {% .lead %}

## Quick Start

```js
import { quests } from 'stardew-valley-data'

// Get all quests
const all = quests().get()

// Find a specific quest by name
const quest = quests().findByName('Crop Research')

// Get only story quests
const storyQuests = quests().byType('story').get()

// Get all repeatable special orders
const repeatables = quests().repeatable().get()

// Get all quests sorted alphabetically
const sorted = quests().sortByName().get()
```

## Type Definition

`Quest` is a discriminated union — use the `type` field to narrow to a specific variant:

```ts
type Quest = StoryQuest | SpecialOrder | QiSpecialOrder
type QuestType = Quest['type'] // 'story' | 'special-order' | 'qi-special-order'
```

### StoryQuest (`type: 'story'`)

| Field          | Type      | Description                                                   |
| -------------- | --------- | ------------------------------------------------------------- |
| `id`           | `string`  | Unique identifier for the quest.                              |
| `type`         | `'story'` | Discriminant — always `'story'`.                              |
| `name`         | `string`  | Display name of the quest.                                    |
| `text`         | `string`  | The quest description or story text.                          |
| `providedBy`   | `string`  | Who gives or triggers the quest (e.g., an NPC name or event). |
| `requirements` | `string`  | What the player must do to complete the quest.                |
| `rewards`      | `string`  | What the player receives upon completion.                     |

### SpecialOrder (`type: 'special-order'`)

| Field           | Type              | Description                                                |
| --------------- | ----------------- | ---------------------------------------------------------- |
| `id`            | `string`          | Unique identifier for the quest.                           |
| `type`          | `'special-order'` | Discriminant — always `'special-order'`.                   |
| `name`          | `string`          | Display name of the quest.                                 |
| `text`          | `string`          | The quest description or story text.                       |
| `providedBy`    | `string`          | Who gives or triggers the quest.                           |
| `prerequisites` | `string \| null`  | Required quest ID that must be completed first, or `null`. |
| `timeframe`     | `number`          | Number of days to complete the quest.                      |
| `requirements`  | `string`          | What the player must do to complete the quest.             |
| `rewards`       | `string`          | What the player receives upon completion.                  |
| `repeatable`    | `boolean`         | Whether this special order can be accepted more than once. |

### QiSpecialOrder (`type: 'qi-special-order'`)

| Field          | Type                 | Description                                    |
| -------------- | -------------------- | ---------------------------------------------- |
| `id`           | `string`             | Unique identifier for the quest.               |
| `type`         | `'qi-special-order'` | Discriminant — always `'qi-special-order'`.    |
| `name`         | `string`             | Display name of the quest.                     |
| `text`         | `string`             | The quest description or story text.           |
| `timeframe`    | `number`             | Number of days to complete the quest.          |
| `requirements` | `string`             | What the player must do to complete the quest. |
| `rewards`      | `string`             | What the player receives upon completion.      |

## Query Methods

`QuestQuery` extends `QueryBase` and inherits five terminal methods shared by all query builders:

| Method             | Returns              | Description                              |
| ------------------ | -------------------- | ---------------------------------------- |
| `get()`            | `Quest[]`            | Return all results as an array.          |
| `first()`          | `Quest \| undefined` | Return the first result.                 |
| `find(id)`         | `Quest \| undefined` | Find a quest by exact ID.                |
| `findByName(name)` | `Quest \| undefined` | Find a quest by name (case-insensitive). |
| `count()`          | `number`             | Return the number of results.            |

### Filter Methods

| Method         | Returns      | Description                                                                                      |
| -------------- | ------------ | ------------------------------------------------------------------------------------------------ |
| `byType(type)` | `QuestQuery` | Filter to quests of a specific `QuestType` (`'story'`, `'special-order'`, `'qi-special-order'`). |
| `repeatable()` | `QuestQuery` | Filter to repeatable special orders only (applies to `type === 'special-order'`).                |

### Sort Methods

| Method               | Returns      | Description                                                      |
| -------------------- | ------------ | ---------------------------------------------------------------- |
| `sortByName(order?)` | `QuestQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |

## Examples

### Look up a story quest's details

```js
import { quests } from 'stardew-valley-data'

const quest = quests().findByName('Initiation')

if (quest) {
  console.log(`Quest: ${quest.name}`)
  console.log(`Requires: ${quest.requirements}`)
  console.log(`Reward: ${quest.rewards}`)
}
```

### Narrow by quest type

```js
import { quests } from 'stardew-valley-data'

const all = quests().get()

all.forEach((q) => {
  if (q.type === 'special-order') {
    console.log(`${q.name} — ${q.timeframe} days, repeatable: ${q.repeatable}`)
  } else if (q.type === 'qi-special-order') {
    console.log(`Qi: ${q.name} — ${q.timeframe} days`)
  } else {
    console.log(`${q.name} — given by: ${q.providedBy}`)
  }
})
```

### Get all repeatable special orders

```js
import { quests } from 'stardew-valley-data'

const repeatables = quests().repeatable().get()
repeatables.forEach((q) => console.log(q.name))
```

### List all quests in reverse alphabetical order

```js
import { quests } from 'stardew-valley-data'

const sorted = quests().sortByName('desc').get()

sorted.forEach((q) => {
  console.log(q.name)
})
```

### Find a quest by ID

```js
import { quests } from 'stardew-valley-data'

const quest = quests().find('quest-1')

if (quest) {
  console.log(quest.name)
}
```

### Wrap a pre-filtered array

You can pass an existing `Quest[]` array into the `quests()` function to create a new query from it:

```js
import { quests } from 'stardew-valley-data'

const myList = quests().byType('story').get()
const sorted = quests(myList).sortByName().get()
```
