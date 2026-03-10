---
title: Adventurer's Guild
nextjs:
  metadata:
    title: Adventurer's Guild
    description: Query Marlon's Adventurer's Guild shop stock including weapons, boots, rings, and slingshots with mine level requirements.
---

Access the complete stock list for the Adventurer's Guild with weapon type filtering, mine level requirements, and category-based queries using the chainable `GuildQuery` API. {% .lead %}

## Quick Start

```js
import { guild } from 'stardew-valley-data'

// Get all guild shop items
const all = guild().get()

// Get all weapons sorted by price
const weapons = guild().weapons().sortByPrice().get()

// Get items available by mine level 40
const earlyItems = guild().byMineLevel(40).get()

// Get only swords
const swords = guild().byWeaponType('sword').get()
```

## Type Definition

Each item conforms to the `GuildItem` interface:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier. |
| `name` | `string` | Display name of the item. |
| `price` | `number` | Purchase price in gold. |
| `description` | `string` | In-game description text. |
| `image` | `string` | Path to the item's image. |
| `category` | `GuildCategory` | Item category. |
| `weaponType` | `GuildWeaponType \| undefined` | Weapon type (only present for weapon category items). |
| `mineLevel` | `number \| undefined` | Minimum mine level required to unlock this item. |
| `availability` | `string \| undefined` | Special purchase condition, if any. |

### GuildCategory

```ts
type GuildCategory = 'weapon' | 'boots' | 'ring' | 'slingshot' | 'ammo' | 'furniture'
```

### GuildWeaponType

```ts
type GuildWeaponType = 'sword' | 'dagger' | 'club'
```

## Query Methods

`GuildQuery` extends `QueryBase` and inherits five terminal methods:

| Method | Returns | Description |
| --- | --- | --- |
| `get()` | `GuildItem[]` | Return all results as an array. |
| `first()` | `GuildItem \| undefined` | Return the first result. |
| `find(id)` | `GuildItem \| undefined` | Find an item by exact ID. |
| `findByName(name)` | `GuildItem \| undefined` | Find an item by name (case-insensitive). |
| `count()` | `number` | Return the number of results. |

### Filter Methods

| Method | Returns | Description |
| --- | --- | --- |
| `weapons()` | `GuildQuery` | Filter to weapons only. |
| `boots()` | `GuildQuery` | Filter to boots only. |
| `rings()` | `GuildQuery` | Filter to rings only. |
| `slingshots()` | `GuildQuery` | Filter to slingshots only. |
| `byCategory(category)` | `GuildQuery` | Filter to items in the given category. |
| `byWeaponType(type)` | `GuildQuery` | Filter weapons by type: `'sword'`, `'dagger'`, or `'club'`. |
| `byMineLevel(level)` | `GuildQuery` | Filter to items that unlock at or below the given mine level. |
| `alwaysAvailable()` | `GuildQuery` | Filter to items with no special purchase condition. |

### Sort Methods

| Method | Returns | Description |
| --- | --- | --- |
| `sortByPrice(order?)` | `GuildQuery` | Sort by price. Pass `'asc'` (default) or `'desc'`. |
| `sortByName(order?)` | `GuildQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |
| `sortByMineLevel(order?)` | `GuildQuery` | Sort by mine level required. Pass `'asc'` (default) or `'desc'`. |

## Examples

### List all daggers sorted by price

```js
import { guild } from 'stardew-valley-data'

const daggers = guild()
  .byWeaponType('dagger')
  .sortByPrice()
  .get()

daggers.forEach((d) => {
  console.log(`${d.name} - ${d.price}g (mine level ${d.mineLevel ?? 'none'})`)
})
```

### Show items unlocked at each mine level milestone

```js
import { guild } from 'stardew-valley-data'

const milestones = [0, 20, 40, 60, 80, 100, 120]

milestones.forEach((level) => {
  const count = guild().byMineLevel(level).count()
  console.log(`Mine level ${level}: ${count} items available`)
})
```

### Get the most expensive ring

```js
import { guild } from 'stardew-valley-data'

const priciest = guild().rings().sortByPrice('desc').first()

if (priciest) {
  console.log(`${priciest.name} costs ${priciest.price}g`)
}
```
