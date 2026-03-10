---
title: Locations
nextjs:
  metadata:
    title: Locations
    description: Query and filter Stardew Valley location data including operating hours, occupants, shops, and categories.
---

Access the complete dataset of Stardew Valley locations with typed category, operating hours, and occupant information using the chainable `LocationQuery` API. {% .lead %}

## Quick Start

```js
import { locations } from 'stardew-valley-data'

// Get all locations
const all = locations().get()

// Find a specific location by name
const saloon = locations().findByName('The Stardrop Saloon')

// Get locations in Pelican Town
const town = locations().byCategory('Pelican Town').get()

// Get locations with a shop
const shopLocations = locations().withShop().sortByName().get()
```

## Type Definition

Each location record conforms to the `GameLocation` interface:

| Field       | Type                       | Description                                        |
| ----------- | -------------------------- | -------------------------------------------------- |
| `id`        | `string`                   | Unique identifier for the location.                |
| `name`      | `string`                   | Display name of the location.                      |
| `type`      | `'location' \| 'building'` | Whether this is an outdoor location or a building. |
| `category`  | `LocationCategory`         | The region this location belongs to (see below).   |
| `image`     | `string`                   | Path to the location image.                        |
| `openHours` | `LocationHours \| null`    | Operating hours, or `null` if always accessible.   |
| `closed`    | `LocationDay[]`            | Days of the week the location is closed.           |
| `address`   | `string \| null`           | Street address in the game world, or `null`.       |
| `occupants` | `string[]`                 | Names of NPCs who live or work at this location.   |
| `shop`      | `string \| null`           | Linked shop data ID, or `null` if no shop.         |

### LocationCategory

`'The Valley'` | `'Beyond the Valley'` | `'Pelican Town'` | `'Cindersap Forest'` | `'The Sewers'` | `'The Beach'` | `'The Mountain'` | `'Railroad'` | `'Quarry'` | `'The Desert'` | `'Ginger Island'`

### LocationHours

| Field   | Type     | Description                       |
| ------- | -------- | --------------------------------- |
| `open`  | `string` | Opening time (e.g., `"9:00 AM"`). |
| `close` | `string` | Closing time (e.g., `"5:00 PM"`). |

### LocationDay

`'Monday'` | `'Tuesday'` | `'Wednesday'` | `'Thursday'` | `'Friday'` | `'Saturday'` | `'Sunday'`

## Query Methods

`LocationQuery` extends `QueryBase` and inherits five terminal methods shared by all query builders:

| Method             | Returns                     | Description                                 |
| ------------------ | --------------------------- | ------------------------------------------- |
| `get()`            | `GameLocation[]`            | Return all results as an array.             |
| `first()`          | `GameLocation \| undefined` | Return the first result.                    |
| `find(id)`         | `GameLocation \| undefined` | Find a location by exact ID.                |
| `findByName(name)` | `GameLocation \| undefined` | Find a location by name (case-insensitive). |
| `count()`          | `number`                    | Return the number of results.               |

### Filter Methods

| Method                 | Returns         | Description                                                                |
| ---------------------- | --------------- | -------------------------------------------------------------------------- |
| `byType(type)`         | `LocationQuery` | Filter by type. Accepts `'location'` or `'building'`.                      |
| `byCategory(category)` | `LocationQuery` | Filter to locations in the given category.                                 |
| `withShop()`           | `LocationQuery` | Filter to locations that have a linked shop.                               |
| `alwaysOpen()`         | `LocationQuery` | Filter to locations that are always accessible (no operating hours).       |
| `closedOn(day)`        | `LocationQuery` | Filter to locations closed on the given day.                               |
| `byOccupant(name)`     | `LocationQuery` | Filter to locations where the named NPC lives or works (case-insensitive). |

### Sort Methods

| Method               | Returns         | Description                                                      |
| -------------------- | --------------- | ---------------------------------------------------------------- |
| `sortByName(order?)` | `LocationQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |

## Examples

### List all Ginger Island locations

```js
import { locations } from 'stardew-valley-data'

const island = locations().byCategory('Ginger Island').sortByName().get()

island.forEach((loc) => {
  console.log(loc.name)
})
```

### Find where an NPC lives

```js
import { locations } from 'stardew-valley-data'

const pennysHome = locations().byOccupant('Penny').first()

if (pennysHome) {
  console.log(`Penny lives at: ${pennysHome.name}`)
}
```

### Get locations closed on Wednesday

```js
import { locations } from 'stardew-valley-data'

const closedWed = locations().closedOn('Wednesday').get()

closedWed.forEach((loc) => {
  console.log(`${loc.name} is closed on Wednesday`)
})
```

### List all locations with shops

```js
import { locations } from 'stardew-valley-data'

const shopLocations = locations().withShop().sortByName().get()

shopLocations.forEach((loc) => {
  console.log(`${loc.name} — Shop: ${loc.shop}`)
})
```

### Wrap a pre-filtered array

You can pass an existing `GameLocation[]` array into the `locations()` function to create a new query from it:

```js
import { locations } from 'stardew-valley-data'

const myList = locations().byCategory('Pelican Town').get()
const sorted = locations(myList).sortByName('desc').get()
```
