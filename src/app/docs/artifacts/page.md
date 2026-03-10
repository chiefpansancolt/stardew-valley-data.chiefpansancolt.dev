---
title: Artifacts
nextjs:
  metadata:
    title: Artifacts
    description: Query Stardew Valley artifact data with location, donation, and sell price information.
---

Access all artifact data in Stardew Valley including find locations, donation notes, and sell prices. {% .lead %}

## Quick Start

```js
import { artifacts } from 'stardew-valley-data'

// All artifacts
const all = artifacts().get()

// Artifacts with donation notes
const donatable = artifacts().withDonationNotes().get()

// Artifacts found via fishing
const fishingArtifacts = artifacts().fromFishing().get()

// Sort by sell price
const valuable = artifacts().sortBySellPrice().get()
```

## Type Definition

```ts
interface Artifact {
  id: string
  name: string
  description: string
  sellPrice: number
  locations: string[]
  donationNotes: string | null
  image: string
}
```

### Field Reference

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier. |
| `name` | `string` | Display name (e.g. `"Dwarf Scroll I"`). |
| `description` | `string` | In-game description text. |
| `sellPrice` | `number` | Base sell price in gold. |
| `locations` | `string[]` | Where the artifact can be found (dig spots, fishing, monster drops, etc.). |
| `donationNotes` | `string \| null` | Notes about donating to the museum, or `null`. |
| `image` | `string` | Path to the image asset. |

## Query Methods

The `artifacts()` function returns an `ArtifactQuery` instance. All methods return a new `ArtifactQuery` for chaining.

### Inherited Methods

| Method | Returns | Description |
| --- | --- | --- |
| `.get()` | `Artifact[]` | Return all results as an array. |
| `.first()` | `Artifact \| undefined` | Return the first result. |
| `.find(id)` | `Artifact \| undefined` | Find by exact ID. |
| `.findByName(name)` | `Artifact \| undefined` | Find by name (case-insensitive). |
| `.count()` | `number` | Return the number of results. |

### Filter Methods

| Method | Signature | Description |
| --- | --- | --- |
| `withDonationNotes` | `withDonationNotes()` | Filter to artifacts that have donation reward notes. |
| `fromFishing` | `fromFishing()` | Filter to artifacts obtainable from fishing treasure chests. |

### Sort Methods

| Method | Signature | Default | Description |
| --- | --- | --- | --- |
| `sortByName` | `sortByName(order?: 'asc' \| 'desc')` | `'asc'` | Sort alphabetically by name. |
| `sortBySellPrice` | `sortBySellPrice(order?: 'asc' \| 'desc')` | `'desc'` | Sort by sell price (highest first). |

## Examples

### Most valuable artifacts

```js
import { artifacts } from 'stardew-valley-data'

const top5 = artifacts()
  .sortBySellPrice()
  .get()
  .slice(0, 5)

top5.forEach(a => {
  console.log(`${a.name}: ${a.sellPrice}g`)
})
```

### Artifacts with donation rewards

```js
const withNotes = artifacts().withDonationNotes().get()

withNotes.forEach(a => {
  console.log(`${a.name}: ${a.donationNotes}`)
})
```

### Fishing treasure chest artifacts

```js
const fishingFinds = artifacts()
  .fromFishing()
  .sortByName()
  .get()

fishingFinds.forEach(a => {
  console.log(`${a.name} - found via: ${a.locations.join(', ')}`)
})
```

### Find an artifact by name

```js
const scroll = artifacts().findByName('Dwarf Scroll I')
if (scroll) {
  console.log(`${scroll.name}: ${scroll.description}`)
  console.log(`Locations: ${scroll.locations.join(', ')}`)
}
```

### Total artifact count

```js
console.log(`There are ${artifacts().count()} artifacts to collect`)
```
