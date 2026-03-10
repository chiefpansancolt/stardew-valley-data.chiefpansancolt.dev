---
title: Search utility
nextjs:
  metadata:
    title: Search utility
    description: Search across all data modules by name or ID with the cross-module search function.
---

The `search()` function lets you find items across every data module with a single call -- crops, fish, animals, monsters, equipment, and more. {% .lead %}

---

## Basic usage

Import `search` from the package and pass a query string. It searches by name (case-insensitive substring match) and by ID (exact match).

```ts
import { search } from 'stardew-valley-data'

const results = search('Melon')
// Returns all items whose name contains "Melon" or whose ID is "melon"

results.forEach((r) => {
  console.log(`[${r.kind}] ${r.name} - ${r.sellPrice ?? 'N/A'}g`)
})
```

---

## The `search()` function

```ts
function search(query: string, kinds?: SearchResultKind[]): SearchResult[]
```

### Parameters

| Parameter | Type                 | Description                                                 |
| --------- | -------------------- | ----------------------------------------------------------- |
| `query`   | `string`             | Name substring or exact ID to search for (case-insensitive) |
| `kinds`   | `SearchResultKind[]` | Optional filter to restrict results to specific item kinds  |

### Returns

An array of `SearchResult` objects, deduplicated by `kind:id`. When the same item appears from multiple parents (e.g., Egg from White Chicken and Blue Chicken), the results are merged into a single entry with a `parents` array.

---

## SearchResult type

```ts
interface SearchResult {
  kind: SearchResultKind
  id: string
  name: string
  image: string
  sellPrice: number | null
  parents?: { id: string; name: string }[]
}
```

| Field       | Type                             | Description                                                                |
| ----------- | -------------------------------- | -------------------------------------------------------------------------- |
| `kind`      | `SearchResultKind`               | The category of the item (e.g., `'crop'`, `'fish'`, `'weapon'`)            |
| `id`        | `string`                         | The item's unique identifier                                               |
| `name`      | `string`                         | The item's display name                                                    |
| `image`     | `string`                         | Relative path to the item's image file                                     |
| `sellPrice` | `number \| null`                 | Sell price in gold, or `null` if the item cannot be sold                   |
| `parents`   | `{ id: string; name: string }[]` | Parent items that produce this item (for nested items like animal produce) |

---

## SearchResultKind

The `SearchResultKind` type is a union of all possible item categories:

```ts
type SearchResultKind =
  | 'crop'
  | 'crop-seed'
  | 'fruit-tree'
  | 'fruit-tree-produce'
  | 'wild-tree'
  | 'wild-tree-seed'
  | 'wild-tree-tapper'
  | 'animal'
  | 'animal-produce'
  | 'artisan-good'
  | 'monster'
  | 'monster-loot'
  | 'ring'
  | 'tool'
  | 'weapon'
  | 'hat'
  | 'footwear'
  | 'forageable'
  | 'fish'
  | 'bait'
  | 'tackle'
  | 'cooked-dish'
  | 'artifact'
  | 'mineral'
  | 'geode'
  | 'mining-node'
  | 'mineral-resource'
  | 'crafting-recipe'
```

---

## Filtering by kind

Pass an array of `SearchResultKind` values as the second argument to restrict which categories are searched:

```ts
import { search } from 'stardew-valley-data'

// Only search for crops and crop seeds
const cropResults = search('Parsnip', ['crop', 'crop-seed'])

// Only search for fish
const fishResults = search('Cat', ['fish'])

// Search for equipment only
const equipment = search('Galaxy', ['weapon', 'ring', 'tool'])
```

---

## Nested items and parents

The search function includes nested items: crop seeds, fruit tree produce, wild tree tapper products, animal produce, and deluxe animal produce. When a nested item belongs to multiple parents, the results are deduplicated and the `parents` array lists all sources.

```ts
import { search } from 'stardew-valley-data'

// "Egg" is produced by multiple chickens
const eggResults = search('Egg', ['animal-produce'])

for (const result of eggResults) {
  console.log(`${result.name} (${result.kind})`)
  if (result.parents) {
    const sources = result.parents.map((p) => p.name).join(', ')
    console.log(`  Produced by: ${sources}`)
  }
}
```

### How parent merging works

When the same item (identified by `kind:id`) appears from multiple parents, the search function:

1. Keeps one `SearchResult` entry for the item
2. Collects all parent references into the `parents` array
3. Returns a single deduplicated result

This means searching for "Egg" returns one result with `parents: [{ name: 'White Chicken', ... }, { name: 'Blue Chicken', ... }]` rather than separate results for each chicken.

---

## What gets searched

The search function covers 20 data modules:

| Module        | Kinds returned                                                                        |
| ------------- | ------------------------------------------------------------------------------------- |
| Crops         | `crop`, `crop-seed`                                                                   |
| Trees         | `fruit-tree`, `fruit-tree-produce`, `wild-tree`, `wild-tree-seed`, `wild-tree-tapper` |
| Animals       | `animal`, `animal-produce`                                                            |
| Monsters      | `monster`, `monster-loot`                                                             |
| Rings         | `ring`                                                                                |
| Tools         | `tool`                                                                                |
| Weapons       | `weapon`                                                                              |
| Artisan goods | `artisan-good`                                                                        |
| Hats          | `hat`                                                                                 |
| Footwear      | `footwear`                                                                            |
| Forageables   | `forageable`                                                                          |
| Fish          | `fish`                                                                                |
| Bait          | `bait`                                                                                |
| Tackle        | `tackle`                                                                              |
| Cooking       | `cooked-dish`                                                                         |
| Artifacts     | `artifact`                                                                            |
| Crafting      | `crafting-recipe`                                                                     |
| Minerals      | `mineral`, `geode`, `mining-node`, `mineral-resource`                                 |

---

## Examples

### Building an autocomplete search

```ts
import { search, type SearchResult } from 'stardew-valley-data'

function autocomplete(input: string): SearchResult[] {
  if (input.length < 2) return []
  return search(input).slice(0, 10)
}

const suggestions = autocomplete('star')
suggestions.forEach((s) => {
  console.log(`${s.name} [${s.kind}] - ${s.image}`)
})
```

### Grouping results by kind

```ts
import {
  search,
  type SearchResult,
  type SearchResultKind,
} from 'stardew-valley-data'

function groupByKind(query: string): Map<SearchResultKind, SearchResult[]> {
  const results = search(query)
  const grouped = new Map<SearchResultKind, SearchResult[]>()

  for (const result of results) {
    const group = grouped.get(result.kind) ?? []
    group.push(result)
    grouped.set(result.kind, group)
  }

  return grouped
}

const groups = groupByKind('Gold')
for (const [kind, items] of groups) {
  console.log(`\n${kind} (${items.length}):`)
  items.forEach((i) => console.log(`  ${i.name}`))
}
```

### Finding an item by exact ID

```ts
import { search } from 'stardew-valley-data'

// ID matching is exact (case-insensitive)
const results = search('128')
// Returns Pufferfish (ID "128") if it exists
```

---

## Next steps

- See the [quality calculator](/docs/calculator) for computing quality-scaled prices
- Learn about [direct data access](/docs/direct-data) for working with individual modules
- Explore [image assets](/docs/images) for displaying item sprites from search results
