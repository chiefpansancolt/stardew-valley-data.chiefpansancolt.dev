---
title: Seasons & Weather
nextjs:
  metadata:
    title: Seasons & Weather
    description: Query Stardew Valley season data with festivals and weather conditions by season.
---

Access season details including festivals and calendar data, plus weather types with crop-watering and seasonal availability information. {% .lead %}

## Quick Start

```js
import { seasons, weather, findFestival } from 'stardew-valley-data'

// All four seasons
const allSeasons = seasons().get()

// Seasons with festivals
const festivalSeasons = seasons().withFestivals().get()

// Find a festival by name
const luau = findFestival('Luau')

// Weather that waters crops
const rainyTypes = weather().watersCrops().get()
```

---

## Seasons

### Type Definition

```ts
interface SeasonData {
  id: 'spring' | 'summer' | 'fall' | 'winter'
  name: string
  totalDays: number
  image: string
  festivals: Festival[]
}

interface Festival {
  name: string
  startDay: number
  endDay: number
  image: string
  calendarIcon: string
}
```

#### SeasonData Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `'spring' \| 'summer' \| 'fall' \| 'winter'` | Season identifier. |
| `name` | `string` | Display name. |
| `totalDays` | `number` | Number of days in the season. |
| `image` | `string` | Path to season image asset. |
| `festivals` | `Festival[]` | Festivals that occur during this season. |

#### Festival Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` | Festival name (e.g. `"Egg Festival"`). |
| `startDay` | `number` | Day the festival begins. |
| `endDay` | `number` | Day the festival ends. |
| `image` | `string` | Path to festival image asset. |
| `calendarIcon` | `string` | Path to the calendar icon asset. |

### Season Query Methods

The `seasons()` function returns a `SeasonQuery` instance.

#### Inherited Methods

| Method | Returns | Description |
| --- | --- | --- |
| `.get()` | `SeasonData[]` | Return all results as an array. |
| `.first()` | `SeasonData \| undefined` | Return the first result. |
| `.find(id)` | `SeasonData \| undefined` | Find a season by exact ID. |
| `.findByName(name)` | `SeasonData \| undefined` | Find a season by name (case-insensitive). |
| `.count()` | `number` | Return the number of results. |

#### Filter Methods

| Method | Signature | Description |
| --- | --- | --- |
| `withFestivals` | `withFestivals()` | Filter to seasons that have at least one festival. |

### findFestival Helper

```ts
function findFestival(name: string): { season: SeasonData; festival: Festival }[]
```

Search for a festival by name across all seasons. Uses a case-insensitive substring match. Returns an array of matches, each with the parent season and the festival object.

```js
import { findFestival } from 'stardew-valley-data'

const results = findFestival('Dance')
results.forEach(({ season, festival }) => {
  console.log(`${festival.name} on ${season.name} ${festival.startDay}`)
})
```

---

## Weather

### Type Definition

```ts
interface Weather {
  id: string
  name: string
  description: string
  seasons: Season[]
  image: string
  watersCrops: boolean
  special: boolean
}
```

#### Field Reference

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier. |
| `name` | `string` | Weather name (e.g. `"Rain"`, `"Storm"`). |
| `description` | `string` | In-game description of the weather. |
| `seasons` | `Season[]` | Seasons this weather can occur in. |
| `image` | `string` | Path to weather image asset. |
| `watersCrops` | `boolean` | Whether this weather waters crops automatically. |
| `special` | `boolean` | Whether this is a special/rare weather type. |

### Weather Query Methods

The `weather()` function returns a `WeatherQuery` instance.

#### Inherited Methods

| Method | Returns | Description |
| --- | --- | --- |
| `.get()` | `Weather[]` | Return all results as an array. |
| `.first()` | `Weather \| undefined` | Return the first result. |
| `.find(id)` | `Weather \| undefined` | Find by exact ID. |
| `.findByName(name)` | `Weather \| undefined` | Find by name (case-insensitive). |
| `.count()` | `number` | Return the number of results. |

#### Filter Methods

| Method | Signature | Description |
| --- | --- | --- |
| `bySeason` | `bySeason(season: Season)` | Filter to weather types that occur in the given season. |
| `watersCrops` | `watersCrops()` | Filter to weather types that water crops automatically. |
| `special` | `special()` | Filter to special or rare weather types. |

## Examples

### List all festivals with dates

```js
import { seasons } from 'stardew-valley-data'

seasons().get().forEach(s => {
  s.festivals.forEach(f => {
    console.log(`${s.name} ${f.startDay}-${f.endDay}: ${f.name}`)
  })
})
```

### Weather that waters crops in spring

```js
import { weather } from 'stardew-valley-data'

const springRain = weather()
  .bySeason('spring')
  .watersCrops()
  .get()

springRain.forEach(w => console.log(w.name))
```

### Special weather types

```js
const special = weather().special().get()
special.forEach(w => console.log(`${w.name}: ${w.description}`))
```
