---
title: Fish
nextjs:
  metadata:
    title: Fish
    description: Query Stardew Valley fish data by season, location, weather, catch type, and difficulty.
---

Access every fish in Stardew Valley with season, location, weather, catch type, difficulty, and sell price data. {% .lead %}

## Quick Start

```js
import { fish } from 'stardew-valley-data'

// All fish
const allFish = fish().get()

// Summer fish sorted by sell price
const bestSummer = fish().bySeason('summer').sortBySellPrice().get()

// Find a specific fish
const catfish = fish().findByName('Catfish')

// Rod fish only, sorted by difficulty
const hardest = fish().byCatchType('rod').sortByDifficulty().get()
```

## Type Definition

```ts
interface Fish {
  id: string
  name: string
  description: string
  catchType: FishCatchType
  seasons: Season[]
  location: string
  weather?: FishWeather
  time?: string
  difficulty?: number
  sellPrice: number
  fishTank: boolean
  usedIn: string[]
  image: string
}

type FishCatchType = 'rod' | 'crab-pot'
type FishWeather = 'sunny' | 'rainy' | 'both'
```

### Field Reference

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier. |
| `name` | `string` | Display name (e.g. `"Catfish"`). |
| `description` | `string` | In-game description text. |
| `catchType` | `FishCatchType` | How the fish is caught: `'rod'` or `'crab-pot'`. |
| `seasons` | `Season[]` | Seasons the fish is available. |
| `location` | `string` | Where the fish can be found. |
| `weather` | `FishWeather \| undefined` | Required weather: `'sunny'`, `'rainy'`, or `'both'`. Undefined for crab-pot fish. |
| `time` | `string \| undefined` | Time range when the fish is available (e.g. `"6am - 7pm"`). |
| `difficulty` | `number \| undefined` | Fishing difficulty rating (0-100). Undefined for crab-pot fish. |
| `sellPrice` | `number` | Base sell price in gold. |
| `fishTank` | `boolean` | Whether the fish can be placed in a fish tank. |
| `usedIn` | `string[]` | List of recipes or bundles that use this fish. |
| `image` | `string` | Path to the image asset. |

## Query Methods

The `fish()` function returns a `FishQuery` instance. All methods return a new `FishQuery` for chaining.

### Inherited Methods

| Method | Returns | Description |
| --- | --- | --- |
| `.get()` | `Fish[]` | Return all results as an array. |
| `.first()` | `Fish \| undefined` | Return the first result. |
| `.find(id)` | `Fish \| undefined` | Find by exact ID. |
| `.findByName(name)` | `Fish \| undefined` | Find by name (case-insensitive). |
| `.count()` | `number` | Return the number of results. |

### Filter Methods

| Method | Signature | Description |
| --- | --- | --- |
| `bySeason` | `bySeason(season: Season)` | Filter to fish available in the given season. |
| `byCatchType` | `byCatchType(type: FishCatchType)` | Filter by catch method (`'rod'` or `'crab-pot'`). |
| `byWeather` | `byWeather(weather: 'sunny' \| 'rainy' \| 'both')` | Filter by required weather condition. |
| `byLocation` | `byLocation(location: string)` | Filter by location (case-insensitive substring match). |

### Sort Methods

| Method | Signature | Default | Description |
| --- | --- | --- | --- |
| `sortByName` | `sortByName(order?: 'asc' \| 'desc')` | `'asc'` | Sort alphabetically by name. |
| `sortBySellPrice` | `sortBySellPrice(order?: 'asc' \| 'desc')` | `'desc'` | Sort by sell price (most valuable first). |
| `sortByDifficulty` | `sortByDifficulty(order?: 'asc' \| 'desc')` | `'desc'` | Sort by fishing difficulty (hardest first). Crab-pot fish sort as 0. |

## Examples

### Most valuable fish per season

```js
import { fish } from 'stardew-valley-data'

const seasons = ['spring', 'summer', 'fall', 'winter']

seasons.forEach(season => {
  const best = fish().bySeason(season).sortBySellPrice().first()
  if (best) {
    console.log(`Best ${season} fish: ${best.name} (${best.sellPrice}g)`)
  }
})
```

### Rainy-day rod fish

```js
const rainyFish = fish()
  .byCatchType('rod')
  .byWeather('rainy')
  .sortByDifficulty()
  .get()

rainyFish.forEach(f => {
  console.log(`${f.name}: difficulty ${f.difficulty}, ${f.sellPrice}g`)
})
```

### Fish found in the ocean

```js
const oceanFish = fish().byLocation('ocean').sortByName().get()
oceanFish.forEach(f => console.log(f.name))
```

### Crab pot catches

```js
const crabPot = fish().byCatchType('crab-pot').get()
console.log(`${crabPot.length} crab pot catches available`)
```

### Hardest fish to catch

```js
const top5 = fish()
  .byCatchType('rod')
  .sortByDifficulty()
  .get()
  .slice(0, 5)

top5.forEach(f => {
  console.log(`${f.name}: difficulty ${f.difficulty}`)
})
```
