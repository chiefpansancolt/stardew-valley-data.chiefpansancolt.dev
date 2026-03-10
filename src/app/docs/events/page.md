---
title: Events
nextjs:
  metadata:
    title: Events
    description: Query Stardew Valley heart events by villager, heart level, and marriage candidacy with the EventQuery API.
---

Access the full dataset of Stardew Valley heart events and filter by villager name, heart level, or marriage-specific milestones using the chainable `EventQuery` API. {% .lead %}

## Quick Start

```js
import { events } from 'stardew-valley-data'

// Get all heart events
const all = events().get()

// Get all events for a specific villager
const pennyEvents = events().byVillager('Penny').get()

// Get all 2-heart events
const twoHeartEvents = events().byHearts(2).get()

// Get only marriage candidate events
const marriageEvents = events().marriageEvents().get()
```

## Type Definition

Each event record conforms to the `GameEvent` interface:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier for the event. |
| `name` | `string` | Auto-generated display name in the format `"Villager N-Heart"`. |
| `villager` | `string` | Name of the villager this event belongs to. |
| `hearts` | `number` | The heart level required to trigger this event. |
| `description` | `string` | Description of the event scene. |

## Query Methods

`EventQuery` extends `QueryBase` and inherits five terminal methods shared by all query builders:

| Method | Returns | Description |
| --- | --- | --- |
| `get()` | `GameEvent[]` | Return all results as an array. |
| `first()` | `GameEvent \| undefined` | Return the first result. |
| `find(id)` | `GameEvent \| undefined` | Find an event by exact ID. |
| `findByName(name)` | `GameEvent \| undefined` | Find an event by name (case-insensitive). |
| `count()` | `number` | Return the number of results. |

### Filter Methods

| Method | Returns | Description |
| --- | --- | --- |
| `byVillager(villager)` | `EventQuery` | Filter by villager name (case-insensitive exact match). |
| `byHearts(hearts)` | `EventQuery` | Filter by heart level (e.g., `2`, `4`, `6`, `8`, `10`, `14`). |
| `marriageEvents()` | `EventQuery` | Filter to only marriage candidate events (hearts 2, 4, 6, 8, 10, 14). |

### Sort Methods

| Method | Returns | Description |
| --- | --- | --- |
| `sortByHearts(order?)` | `EventQuery` | Sort by heart level. Pass `'asc'` (default) or `'desc'`. |
| `sortByVillager(order?)` | `EventQuery` | Sort alphabetically by villager name. Pass `'asc'` (default) or `'desc'`. |

## Examples

### List all events for a villager in order

```js
import { events } from 'stardew-valley-data'

const samEvents = events()
  .byVillager('Sam')
  .sortByHearts()
  .get()

samEvents.forEach((e) => {
  console.log(`${e.hearts}-Heart: ${e.description}`)
})
```

### Count events per heart level

```js
import { events } from 'stardew-valley-data'

for (const level of [2, 4, 6, 8, 10, 14]) {
  const count = events().byHearts(level).count()
  console.log(`${level}-heart events: ${count}`)
}
```

### Get marriage milestone events sorted by villager

```js
import { events } from 'stardew-valley-data'

const results = events()
  .marriageEvents()
  .sortByVillager()
  .get()

results.forEach((e) => {
  console.log(`${e.villager} — ${e.hearts}-Heart Event`)
})
```

### Chain filters together

```js
import { events } from 'stardew-valley-data'

// Find only the 8-heart marriage events
const eightHeartMarriage = events()
  .marriageEvents()
  .byHearts(8)
  .sortByVillager()
  .get()
```

### Wrap a pre-filtered array

```js
import { events } from 'stardew-valley-data'

const filtered = events().byVillager('Leah').get()
const sorted = events(filtered).sortByHearts('desc').get()
```
