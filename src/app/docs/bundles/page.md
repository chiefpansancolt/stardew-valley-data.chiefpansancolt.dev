---
title: Bundles
nextjs:
  metadata:
    title: Bundles
    description: Query Community Center bundles and Joja Mart restorations including item bundles, gold bundles, rooms, and remix variants.
---

Access the complete dataset of Community Center bundles and Joja Mart restorations with typed item, gold, and Joja bundle data using the chainable `BundleQuery` API. {% .lead %}

## Quick Start

```js
import { bundles } from 'stardew-valley-data'

// Get all bundles
const all = bundles().get()

// Get standard (non-remix) bundles
const standard = bundles().standard().get()

// Get bundles in the Pantry room
const pantry = bundles().byRoom('pantry').get()

// Get remix bundle variants
const remix = bundles().remix().get()

// Get Joja Mart bundles
const joja = bundles().jojaBundles().get()
```

## Type Definitions

The `Bundle` type is a union of three bundle variants:

```ts
type Bundle = ItemBundle | GoldBundle | JojaBundle
```

### ItemBundle

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier for the bundle. |
| `type` | `'items'` | Discriminator for item bundles. |
| `name` | `string` | Display name of the bundle. |
| `room` | `BundleRoom` | Community Center room the bundle belongs to. |
| `bundleGroup` | `number` | Numeric group within the room. |
| `image` | `string` | Path to the bundle image. |
| `items` | `BundleItem[]` | Array of items that can be donated (see below). |
| `itemsRequired` | `number` | Number of items needed to complete the bundle. |
| `itemsChosenRandom` | `boolean` | Whether the available items are randomly selected. |
| `numItemsAvailable` | `number` | Total number of item slots available. |
| `reward` | `BundleReward` | Reward for completing the bundle (see below). |
| `remixBundle` | `boolean` | Whether this is a remix variant. |

### GoldBundle

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier for the bundle. |
| `type` | `'gold'` | Discriminator for gold bundles. |
| `name` | `string` | Display name of the bundle. |
| `room` | `BundleRoom` | Community Center room the bundle belongs to. |
| `bundleGroup` | `number` | Numeric group within the room. |
| `image` | `string` | Path to the bundle image. |
| `goldCost` | `number` | Gold required to complete the bundle. |
| `reward` | `BundleReward` | Reward for completing the bundle. |
| `remixBundle` | `boolean` | Whether this is a remix variant. |

### JojaBundle

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier for the bundle. |
| `type` | `'joja mart'` | Discriminator for Joja bundles. |
| `name` | `string` | Display name of the Joja restoration project. |
| `description` | `string` | Description of what the project unlocks. |
| `goldCost` | `number` | Gold cost to purchase the project. |
| `unlock` | `string` | What the project unlocks in the game. |

### BundleItem

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` | Display name of the item. |
| `quantity` | `number` | Number required. |
| `quality` | `'silver' \| 'gold' \| 'iridium' \| undefined` | Minimum quality required, if any. |

### BundleReward

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` | Display name of the reward item. |
| `quantity` | `number` | Number of reward items received. |

### BundleRoom

`'crafts-room'` | `'pantry'` | `'fish-tank'` | `'boiler-room'` | `'bulletin-board'` | `'vault'` | `'abandoned-joja-mart'`

## Query Methods

`BundleQuery` extends `QueryBase` and inherits five terminal methods shared by all query builders:

| Method | Returns | Description |
| --- | --- | --- |
| `get()` | `Bundle[]` | Return all results as an array. |
| `first()` | `Bundle \| undefined` | Return the first result. |
| `find(id)` | `Bundle \| undefined` | Find a bundle by exact ID. |
| `findByName(name)` | `Bundle \| undefined` | Find a bundle by name (case-insensitive). |
| `count()` | `number` | Return the number of results. |

### Filter Methods

| Method | Returns | Description |
| --- | --- | --- |
| `byRoom(room)` | `BundleQuery` | Filter to bundles in the given room. Joja bundles are excluded. |
| `remix()` | `BundleQuery` | Return the active remix selection: for each bundle group, returns the remix variant if one exists, otherwise falls back to the standard entry. Joja bundles are excluded. |
| `standard()` | `BundleQuery` | Filter to standard (non-remix) Community Center bundles. Joja bundles are excluded. |
| `itemBundles()` | `BundleQuery` | Filter to item bundles (type `'items'`). |
| `goldBundles()` | `BundleQuery` | Filter to gold bundles (type `'gold'`). |
| `jojaBundles()` | `BundleQuery` | Filter to Joja Mart restoration bundles (type `'joja mart'`). |

### Sort Methods

| Method | Returns | Description |
| --- | --- | --- |
| `sortByRoomAndBundleGroup()` | `BundleQuery` | Sort by room order (as they appear in the Community Center), then by bundle group number within each room. |
| `sortByName(order?)` | `BundleQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |

## Examples

### List standard bundles by room

```js
import { bundles } from 'stardew-valley-data'

const standard = bundles().standard().sortByRoomAndBundleGroup().get()

standard.forEach((b) => {
  if (b.type === 'items') {
    console.log(`[${b.room}] ${b.name} — ${b.itemsRequired} items required`)
  } else {
    console.log(`[${b.room}] ${b.name} — ${b.goldCost}g`)
  }
})
```

### Get remix variants for a room

```js
import { bundles } from 'stardew-valley-data'

const pantryRemix = bundles().remix().byRoom('pantry').get()

pantryRemix.forEach((b) => {
  console.log(`${b.name} (remix: ${b.remixBundle})`)
})
```

### List Joja Mart restoration costs

```js
import { bundles } from 'stardew-valley-data'

const joja = bundles().jojaBundles().get()

joja.forEach((b) => {
  if (b.type === 'joja mart') {
    console.log(`${b.name}: ${b.goldCost}g — Unlocks: ${b.unlock}`)
  }
})
```

### View items required for a specific bundle

```js
import { bundles } from 'stardew-valley-data'

const springForaging = bundles().findByName('Spring Foraging Bundle')

if (springForaging && springForaging.type === 'items') {
  console.log(`${springForaging.name} (${springForaging.itemsRequired} of ${springForaging.numItemsAvailable}):`)
  springForaging.items.forEach((item) => {
    const quality = item.quality ? ` (${item.quality})` : ''
    console.log(`  ${item.quantity}x ${item.name}${quality}`)
  })
}
```

### Compare standard vs remix bundle counts

```js
import { bundles } from 'stardew-valley-data'

const standardCount = bundles().standard().count()
const remixCount = bundles().remix().count()

console.log(`Standard bundles: ${standardCount}`)
console.log(`Remix selection: ${remixCount}`)
```

### Wrap a pre-filtered array

You can pass an existing `Bundle[]` array into the `bundles()` function to create a new query from it:

```js
import { bundles } from 'stardew-valley-data'

const myList = bundles().byRoom('pantry').get()
const sorted = bundles(myList).sortByName().get()
```
