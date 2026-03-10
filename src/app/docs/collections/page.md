---
title: Collections
nextjs:
  metadata:
    title: Collections
    description: Access the in-game collection tabs for shipped items, fish, artifacts, minerals, cooking, and crafting.
---

Access the in-game collection tabs with resolved item data using the `CollectionsQuery` API. Each collection accessor returns a `CollectionItemQuery` with the items resolved to their ID, name, and image. {% .lead %}

## Quick Start

```js
import { collections } from 'stardew-valley-data'

// Get all items in the Items Shipped tab
const shipped = collections().itemsShipped().get()

// Get all fish collection items
const allFish = collections().fish().get()

// Find a specific artifact in the collection
const artifact = collections().artifacts().findByName('Dwarf Scroll I')

// Count items in the cooking collection
const cookingCount = collections().cooking().count()
```

## Type Definition

Each resolved collection item conforms to the `CollectionItem` interface:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier for the item. |
| `name` | `string` | Display name of the item. |
| `image` | `string` | Path to the item image. |

## Query Methods

### CollectionsQuery

The `collections()` function returns a `CollectionsQuery` object. Use one of the collection accessors below to get items for a specific tab.

| Method | Returns | Description |
| --- | --- | --- |
| `itemsShipped()` | `CollectionItemQuery` | Items that appear in the Items Shipped collection tab. |
| `fish()` | `CollectionItemQuery` | Items that appear in the Fish collection tab. |
| `artifacts()` | `CollectionItemQuery` | Items that appear in the Artifacts collection tab (museum donations). |
| `minerals()` | `CollectionItemQuery` | Items that appear in the Minerals collection tab (museum donations). |
| `cooking()` | `CollectionItemQuery` | Items that appear in the Cooking collection tab. |
| `crafting()` | `CollectionItemQuery` | Items that appear in the Crafting collection tab. |

### CollectionItemQuery

`CollectionItemQuery` extends `QueryBase` and inherits five terminal methods:

| Method | Returns | Description |
| --- | --- | --- |
| `get()` | `CollectionItem[]` | Return all results as an array. |
| `first()` | `CollectionItem \| undefined` | Return the first result. |
| `find(id)` | `CollectionItem \| undefined` | Find an item by exact ID. |
| `findByName(name)` | `CollectionItem \| undefined` | Find an item by name (case-insensitive). |
| `count()` | `number` | Return the number of results. |

## Examples

### List all shipped items

```js
import { collections } from 'stardew-valley-data'

const shipped = collections().itemsShipped().get()

shipped.forEach((item) => {
  console.log(`${item.name} (${item.id})`)
})
```

### Count items per collection tab

```js
import { collections } from 'stardew-valley-data'

const c = collections()

console.log(`Items Shipped: ${c.itemsShipped().count()}`)
console.log(`Fish: ${c.fish().count()}`)
console.log(`Artifacts: ${c.artifacts().count()}`)
console.log(`Minerals: ${c.minerals().count()}`)
console.log(`Cooking: ${c.cooking().count()}`)
console.log(`Crafting: ${c.crafting().count()}`)
```

### Check if an item is in a collection

```js
import { collections } from 'stardew-valley-data'

const pufferfish = collections().fish().findByName('Pufferfish')

if (pufferfish) {
  console.log(`Found ${pufferfish.name} in the fish collection`)
}
```

### Get all museum donations

```js
import { collections } from 'stardew-valley-data'

const c = collections()
const artifacts = c.artifacts().get()
const minerals = c.minerals().get()

const allMuseum = [...artifacts, ...minerals]
console.log(`Total museum donations: ${allMuseum.length}`)
```
