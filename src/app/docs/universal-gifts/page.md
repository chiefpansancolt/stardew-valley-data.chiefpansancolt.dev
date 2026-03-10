---
title: Universal Gifts
nextjs:
  metadata:
    title: Universal Gifts
    description: Access the universal gift preference lists shared by all Stardew Valley villagers.
---

Retrieve the universal gift preferences that apply to every villager in Stardew Valley, organized into loved, liked, neutral, disliked, and hated categories. {% .lead %}

## Quick Start

```js
import { universalGifts } from 'stardew-valley-data'

const gifts = universalGifts()

console.log(gifts.loves)    // Items universally loved
console.log(gifts.hates)    // Items universally hated
```

## Type Definition

The `universalGifts()` function returns a single `UniversalGifts` object (which is an alias for `GiftPreferences`):

| Field | Type | Description |
| --- | --- | --- |
| `loves` | `string[]` | Items that are universally loved by all villagers. |
| `likes` | `string[]` | Items that are universally liked by all villagers. |
| `neutrals` | `string[]` | Items that all villagers feel neutral about. |
| `dislikes` | `string[]` | Items that are universally disliked by all villagers. |
| `hates` | `string[]` | Items that are universally hated by all villagers. |

{% callout title="Note" %}
Individual villagers can override these universal preferences. A villager's personal gift lists take priority over the universal defaults. Use the [Villagers](/docs/villagers) module to check each villager's specific preferences.
{% /callout %}

## Usage

Unlike most modules in this package, `universalGifts()` is a simple data accessor rather than a query builder. It returns a single object rather than a chainable query.

### Check if an item is universally loved

```js
import { universalGifts } from 'stardew-valley-data'

const gifts = universalGifts()

function isUniversallyLoved(itemName) {
  return gifts.loves.includes(itemName)
}

console.log(isUniversallyLoved('Prismatic Shard')) // true or false
```

### List all universal gift categories

```js
import { universalGifts } from 'stardew-valley-data'

const gifts = universalGifts()

console.log(`Loved items: ${gifts.loves.length}`)
console.log(`Liked items: ${gifts.likes.length}`)
console.log(`Neutral items: ${gifts.neutrals.length}`)
console.log(`Disliked items: ${gifts.dislikes.length}`)
console.log(`Hated items: ${gifts.hates.length}`)
```

### Combine with villager-specific preferences

```js
import { universalGifts, villagers } from 'stardew-valley-data'

const universal = universalGifts()
const abigail = villagers().findByName('Abigail')

if (abigail) {
  // All items Abigail loves (her personal list)
  // plus universally loved items
  const allLoved = [...new Set([...abigail.loves, ...universal.loves])]
  console.log(`Total loved items for Abigail: ${allLoved.length}`)
}
```

## Examples

### Build a gift lookup function

```js
import { universalGifts } from 'stardew-valley-data'

const gifts = universalGifts()

function getUniversalPreference(itemName) {
  if (gifts.loves.includes(itemName)) return 'love'
  if (gifts.likes.includes(itemName)) return 'like'
  if (gifts.dislikes.includes(itemName)) return 'dislike'
  if (gifts.hates.includes(itemName)) return 'hate'
  return 'neutral'
}

console.log(getUniversalPreference('Gold Bar'))
```
