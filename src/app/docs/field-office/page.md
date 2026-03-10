---
title: Field Office
nextjs:
  metadata:
    title: Field Office
    description: Query Island Field Office fossil collection and donation data including rewards and collection groupings.
---

Access the Island Field Office fossil collection and donation data with typed reward and grouping information using the `FieldOfficeQuery` and `FieldOfficeDonationQuery` APIs. {% .lead %}

## Quick Start

```js
import { fieldOffice, fieldOfficeDonations } from 'stardew-valley-data'

// Get all fossil collections
const allCollections = fieldOffice().get()

// Get a specific collection
const snake = fieldOffice().byCollection('snake').first()

// Get all individual donation items
const allDonations = fieldOfficeDonations().get()

// Get donations for a specific collection
const snakeBones = fieldOfficeDonations().byCollection('snake').get()
```

## Type Definitions

### FieldOfficeCollectionData

Each collection conforms to the `FieldOfficeCollectionData` interface:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `FieldOfficeCollection` | Collection identifier (see below). |
| `name` | `string` | Display name of the collection. |
| `reward` | `FieldOfficeReward` | Reward for completing the collection (see below). |
| `donations` | `FieldOfficeDonation[]` | Array of donation items in this collection. |

### FieldOfficeCollection

`'large-animal'` | `'snake'` | `'mummified-frog'` | `'mummified-bat'`

### FieldOfficeReward

| Field | Type | Description |
| --- | --- | --- |
| `goldenWalnuts` | `number` | Number of Golden Walnuts awarded. |
| `item` | `{ id: string; name: string; image: string } \| undefined` | Optional bonus item reward. |

### FieldOfficeDonation

Each individual donation item conforms to the `FieldOfficeDonation` interface:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier for the donation item. |
| `name` | `string` | Display name of the fossil. |
| `description` | `string` | In-game description of the fossil. |
| `image` | `string` | Path to the fossil image. |
| `collection` | `FieldOfficeCollection` | Which collection this fossil belongs to. |
| `quantity` | `number` | Number of this item needed for the donation. |

## Query Methods

### FieldOfficeQuery

`FieldOfficeQuery` extends `QueryBase` and inherits five terminal methods shared by all query builders:

| Method | Returns | Description |
| --- | --- | --- |
| `get()` | `FieldOfficeCollectionData[]` | Return all results as an array. |
| `first()` | `FieldOfficeCollectionData \| undefined` | Return the first result. |
| `find(id)` | `FieldOfficeCollectionData \| undefined` | Find a collection by exact ID. |
| `findByName(name)` | `FieldOfficeCollectionData \| undefined` | Find a collection by name (case-insensitive). |
| `count()` | `number` | Return the number of results. |

#### Filter Methods

| Method | Returns | Description |
| --- | --- | --- |
| `byCollection(id)` | `FieldOfficeQuery` | Filter to a specific collection by ID. |

#### Sort Methods

| Method | Returns | Description |
| --- | --- | --- |
| `sortByName(order?)` | `FieldOfficeQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |

### FieldOfficeDonationQuery

`FieldOfficeDonationQuery` extends `QueryBase` and inherits the same five terminal methods.

| Method | Returns | Description |
| --- | --- | --- |
| `get()` | `FieldOfficeDonation[]` | Return all results as an array. |
| `first()` | `FieldOfficeDonation \| undefined` | Return the first result. |
| `find(id)` | `FieldOfficeDonation \| undefined` | Find a donation by exact ID. |
| `findByName(name)` | `FieldOfficeDonation \| undefined` | Find a donation by name (case-insensitive). |
| `count()` | `number` | Return the number of results. |

#### Filter Methods

| Method | Returns | Description |
| --- | --- | --- |
| `byCollection(id)` | `FieldOfficeDonationQuery` | Filter to donations belonging to the specified collection. |

#### Sort Methods

| Method | Returns | Description |
| --- | --- | --- |
| `sortByName(order?)` | `FieldOfficeDonationQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |

## Examples

### List all collections and their rewards

```js
import { fieldOffice } from 'stardew-valley-data'

const collections = fieldOffice().get()

collections.forEach((c) => {
  const reward = c.reward.item
    ? `${c.reward.goldenWalnuts} walnuts + ${c.reward.item.name}`
    : `${c.reward.goldenWalnuts} walnuts`
  console.log(`${c.name}: ${reward}`)
})
```

### View donations for a specific collection

```js
import { fieldOfficeDonations } from 'stardew-valley-data'

const largeAnimal = fieldOfficeDonations().byCollection('large-animal').get()

largeAnimal.forEach((d) => {
  console.log(`${d.name} (x${d.quantity})`)
})
```

### Count total donation items needed

```js
import { fieldOfficeDonations } from 'stardew-valley-data'

const all = fieldOfficeDonations().get()
const totalItems = all.reduce((sum, d) => sum + d.quantity, 0)

console.log(`Total fossil items needed: ${totalItems}`)
```

### Wrap a pre-filtered array

You can pass an existing array into the factory functions to create a new query from it:

```js
import { fieldOffice, fieldOfficeDonations } from 'stardew-valley-data'

const myCollections = fieldOffice().get()
const sorted = fieldOffice(myCollections).sortByName().get()

const myDonations = fieldOfficeDonations().byCollection('snake').get()
const sortedDonations = fieldOfficeDonations(myDonations).sortByName().get()
```
