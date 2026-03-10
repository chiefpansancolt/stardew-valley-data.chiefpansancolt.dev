---
title: Weapons
nextjs:
  metadata:
    title: Weapons
    description: Query Stardew Valley weapons and weapon stats including swords, daggers, clubs, and slingshots.
---

Access every weapon in Stardew Valley -- swords, daggers, clubs, and slingshots -- with filters for type, level, enchantability, and sorting by damage, name, or level. Also includes weapon stat data. {% .lead %}

## Quick Start

```js
import { weapons, weaponStats } from 'stardew-valley-data'

// Get all weapons
const allWeapons = weapons().get()

// Get only swords sorted by damage
const bestSwords = weapons().swords().sortByDamage('desc').get()

// Find a weapon by name
const galaxySword = weapons().findByName('Galaxy Sword')

// Get all weapon stats
const stats = weaponStats().get()
```

## Type Definitions

### Weapon

`Weapon` is a union type: `MeleeWeapon | Slingshot`.

#### MeleeWeapon

| Field        | Type                            | Description                                      |
| ------------ | ------------------------------- | ------------------------------------------------ |
| `id`         | `string`                        | Unique identifier                                |
| `type`       | `'sword' \| 'dagger' \| 'club'` | Melee weapon category                            |
| `name`       | `string`                        | Display name                                     |
| `image`      | `string`                        | Relative path to the weapon image                |
| `damageMin`  | `number`                        | Minimum damage                                   |
| `damageMax`  | `number`                        | Maximum damage                                   |
| `speed`      | `number`                        | Speed modifier                                   |
| `critChance` | `number`                        | Critical hit chance modifier                     |
| `critPower`  | `number`                        | Critical hit power modifier                      |
| `defense`    | `number`                        | Defense modifier                                 |
| `knockback`  | `number`                        | Knockback modifier                               |
| `level`      | `number`                        | Mine level where the weapon appears              |
| `obtain`     | `string`                        | How to obtain this weapon                        |
| `sellPrice`  | `number`                        | Sell price in gold                               |
| `canEnchant` | `boolean`                       | Whether the weapon can be enchanted at the Forge |

#### Slingshot

| Field        | Type          | Description                                         |
| ------------ | ------------- | --------------------------------------------------- |
| `id`         | `string`      | Unique identifier                                   |
| `type`       | `'slingshot'` | Always `'slingshot'`                                |
| `name`       | `string`      | Display name                                        |
| `image`      | `string`      | Relative path to the weapon image                   |
| `obtain`     | `string`      | How to obtain this slingshot                        |
| `sellPrice`  | `number`      | Sell price in gold                                  |
| `canEnchant` | `boolean`     | Whether the slingshot can be enchanted at the Forge |

### WeaponType

```ts
type WeaponType = 'sword' | 'dagger' | 'club' | 'slingshot'
```

### WeaponStat

| Field         | Type     | Description                                    |
| ------------- | -------- | ---------------------------------------------- |
| `id`          | `string` | Unique identifier                              |
| `name`        | `string` | Stat name (e.g., Speed, Defense, Crit. Chance) |
| `description` | `string` | Description of what the stat does              |
| `image`       | `string` | Relative path to the stat image                |

## Query Methods

### WeaponQuery

Create a query with the `weapons()` function. Every filter and sort method returns a new `WeaponQuery`, so you can chain calls in any order.

#### Filter Methods

| Method       | Signature                                | Description                                                                   |
| ------------ | ---------------------------------------- | ----------------------------------------------------------------------------- |
| `byType`     | `byType(type: WeaponType): WeaponQuery`  | Filter by weapon type string.                                                 |
| `swords`     | `swords(): WeaponQuery`                  | Filter to swords only.                                                        |
| `daggers`    | `daggers(): WeaponQuery`                 | Filter to daggers only.                                                       |
| `clubs`      | `clubs(): WeaponQuery`                   | Filter to clubs only.                                                         |
| `slingshots` | `slingshots(): WeaponQuery`              | Filter to slingshots only.                                                    |
| `melee`      | `melee(): WeaponQuery`                   | Filter to all melee weapons (swords, daggers, clubs).                         |
| `canEnchant` | `canEnchant(): WeaponQuery`              | Filter to weapons that can be enchanted at the Forge.                         |
| `byMinLevel` | `byMinLevel(level: number): WeaponQuery` | Filter to melee weapons at or above the given level. Slingshots are excluded. |
| `byMaxLevel` | `byMaxLevel(level: number): WeaponQuery` | Filter to melee weapons at or below the given level. Slingshots are excluded. |

#### Sort Methods

| Method         | Signature                                            | Description                                                  |
| -------------- | ---------------------------------------------------- | ------------------------------------------------------------ |
| `sortByDamage` | `sortByDamage(order?: 'asc' \| 'desc'): WeaponQuery` | Sort by max damage. Slingshots sort as 0. Default: `'desc'`. |
| `sortByName`   | `sortByName(order?: 'asc' \| 'desc'): WeaponQuery`   | Sort alphabetically by name. Default: `'asc'`.               |
| `sortByLevel`  | `sortByLevel(order?: 'asc' \| 'desc'): WeaponQuery`  | Sort by level. Slingshots sort as 0. Default: `'asc'`.       |

#### Terminal Methods

| Method       | Signature                                       | Description                                          |
| ------------ | ----------------------------------------------- | ---------------------------------------------------- |
| `get`        | `get(): Weapon[]`                               | Return all results as an array.                      |
| `first`      | `first(): Weapon \| undefined`                  | Return the first result, or `undefined` if empty.    |
| `find`       | `find(id: string): Weapon \| undefined`         | Find an item by its exact ID.                        |
| `findByName` | `findByName(name: string): Weapon \| undefined` | Find an item by name (case-insensitive exact match). |
| `count`      | `count(): number`                               | Return the number of results.                        |

### WeaponStatQuery

Create a query with the `weaponStats()` function.

#### Sort Methods

| Method       | Signature                                              | Description                                    |
| ------------ | ------------------------------------------------------ | ---------------------------------------------- |
| `sortByName` | `sortByName(order?: 'asc' \| 'desc'): WeaponStatQuery` | Sort alphabetically by name. Default: `'asc'`. |

#### Terminal Methods

| Method       | Signature                                           | Description                                         |
| ------------ | --------------------------------------------------- | --------------------------------------------------- |
| `get`        | `get(): WeaponStat[]`                               | Return all results as an array.                     |
| `first`      | `first(): WeaponStat \| undefined`                  | Return the first result, or `undefined` if empty.   |
| `find`       | `find(id: string): WeaponStat \| undefined`         | Find a stat by its exact ID.                        |
| `findByName` | `findByName(name: string): WeaponStat \| undefined` | Find a stat by name (case-insensitive exact match). |
| `count`      | `count(): number`                                   | Return the number of results.                       |

## Examples

### Get the top 5 highest-damage swords

```js
import { weapons } from 'stardew-valley-data'

const topSwords = weapons().swords().sortByDamage('desc').get().slice(0, 5)

topSwords.forEach((w) =>
  console.log(`${w.name}: ${w.damageMin}-${w.damageMax} damage`),
)
```

### Find enchantable melee weapons above level 10

```js
import { weapons } from 'stardew-valley-data'

const enchantable = weapons()
  .melee()
  .canEnchant()
  .byMinLevel(10)
  .sortByLevel('asc')
  .get()

enchantable.forEach((w) => console.log(`${w.name} (Level ${w.level})`))
```

### List all daggers sorted by name

```js
import { weapons } from 'stardew-valley-data'

const daggers = weapons().daggers().sortByName().get()
daggers.forEach((d) => console.log(d.name))
```

### Get all slingshots

```js
import { weapons } from 'stardew-valley-data'

const slingshots = weapons().slingshots().get()
slingshots.forEach((s) => console.log(`${s.name} — ${s.obtain}`))
```

### Find weapons available early game

```js
import { weapons } from 'stardew-valley-data'

const earlyWeapons = weapons().byMaxLevel(5).sortByDamage('desc').get()

earlyWeapons.forEach((w) =>
  console.log(`${w.name}: ${w.damageMin}-${w.damageMax}`),
)
```

### Look up a weapon stat

```js
import { weaponStats } from 'stardew-valley-data'

const speedStat = weaponStats().findByName('Speed')
if (speedStat) {
  console.log(`${speedStat.name}: ${speedStat.description}`)
}
```
