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

// Get all quests sorted alphabetically
const sorted = quests().sortByName().get()

// Count the total number of quests
const total = quests().count()
```

## Type Definition

Each quest record conforms to the `Quest` interface:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier for the quest. |
| `name` | `string` | Display name of the quest. |
| `text` | `string` | The quest description or story text. |
| `providedBy` | `string` | Who gives or triggers the quest (e.g., an NPC name or event). |
| `requirements` | `string` | What the player must do to complete the quest. |
| `rewards` | `string` | What the player receives upon completion. |

## Query Methods

`QuestQuery` extends `QueryBase` and inherits five terminal methods shared by all query builders:

| Method | Returns | Description |
| --- | --- | --- |
| `get()` | `Quest[]` | Return all results as an array. |
| `first()` | `Quest \| undefined` | Return the first result. |
| `find(id)` | `Quest \| undefined` | Find a quest by exact ID. |
| `findByName(name)` | `Quest \| undefined` | Find a quest by name (case-insensitive). |
| `count()` | `number` | Return the number of results. |

### Sort Methods

| Method | Returns | Description |
| --- | --- | --- |
| `sortByName(order?)` | `QuestQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |

## Examples

### Look up a quest's details

```js
import { quests } from 'stardew-valley-data'

const quest = quests().findByName('Initiation')

if (quest) {
  console.log(`Quest: ${quest.name}`)
  console.log(`Given by: ${quest.providedBy}`)
  console.log(`Requires: ${quest.requirements}`)
  console.log(`Reward: ${quest.rewards}`)
}
```

### List all quests in reverse alphabetical order

```js
import { quests } from 'stardew-valley-data'

const sorted = quests().sortByName('desc').get()

sorted.forEach((q) => {
  console.log(`${q.name} — ${q.providedBy}`)
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

const myList = quests().get().filter((q) => q.providedBy.includes('Robin'))
const sorted = quests(myList).sortByName().get()
```
