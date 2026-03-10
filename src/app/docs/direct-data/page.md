---
title: Direct data access
nextjs:
  metadata:
    title: Direct data access
    description: Import raw JSON data arrays directly from stardew-valley-data without using the query builder.
---

When you need raw data arrays without the query builder wrapper, you can import JSON files directly from the `stardew-valley-data/data/*` export path. {% .lead %}

---

## How it works

The package exports its underlying JSON data files through the `stardew-valley-data/data/*` path. Each import gives you a plain JavaScript array of typed objects -- no query builder, no class instances.

```ts
import cropsData from 'stardew-valley-data/data/crops'
import fishData from 'stardew-valley-data/data/fish'

// cropsData is a Crop[] array
console.log(cropsData.length)
console.log(cropsData[0].name)
```

---

## Available data paths

Every data module has a corresponding JSON file you can import directly:

### Farming and nature

| Import path | Content |
| --- | --- |
| `stardew-valley-data/data/crops` | All crops with seasons, prices, and growth data |
| `stardew-valley-data/data/trees` | Fruit trees and wild trees |
| `stardew-valley-data/data/animals` | Pets and farm animals |
| `stardew-valley-data/data/forageables` | Forageable items by season and location |
| `stardew-valley-data/data/artisan-goods` | Artisan goods (wine, cheese, etc.) |
| `stardew-valley-data/data/mixed-seeds` | Mixed seed drop tables by season |
| `stardew-valley-data/data/seasons` | Season metadata and festival dates |

### Fishing and mining

| Import path | Content |
| --- | --- |
| `stardew-valley-data/data/fish` | All fish with locations, seasons, and difficulty |
| `stardew-valley-data/data/bait` | Bait items |
| `stardew-valley-data/data/tackle` | Tackle items |
| `stardew-valley-data/data/minerals` | Minerals, geodes, ores, bars, nodes, and resources |
| `stardew-valley-data/data/artifacts` | Artifact items and their sources |

### Characters and social

| Import path | Content |
| --- | --- |
| `stardew-valley-data/data/villagers` | All villagers with gift preferences and birthdays |
| `stardew-valley-data/data/universal-gifts` | Universal gift preference lists |
| `stardew-valley-data/data/events` | Cutscene and event data |

### Combat and equipment

| Import path | Content |
| --- | --- |
| `stardew-valley-data/data/monsters` | Monsters with stats, loot drops, and locations |
| `stardew-valley-data/data/monster-slayer-goals` | Adventurer's Guild slayer goals |
| `stardew-valley-data/data/weapons` | Weapons with stats and types |
| `stardew-valley-data/data/weapon-stats` | Weapon stat ranges |
| `stardew-valley-data/data/rings` | Rings and their effects |
| `stardew-valley-data/data/trinkets` | Trinket items |
| `stardew-valley-data/data/tools` | Tools and their upgrade levels |
| `stardew-valley-data/data/hats` | Hats |
| `stardew-valley-data/data/footwear` | Boots and shoes |

### Skills and progression

| Import path | Content |
| --- | --- |
| `stardew-valley-data/data/skills` | Skill levels and XP requirements |
| `stardew-valley-data/data/professions` | Profession choices per skill |
| `stardew-valley-data/data/achievements` | Achievement data |
| `stardew-valley-data/data/perfection` | Perfection tracker requirements |
| `stardew-valley-data/data/stardrops` | Stardrop locations and sources |
| `stardew-valley-data/data/golden-walnuts` | Golden walnut locations on Ginger Island |
| `stardew-valley-data/data/special-items` | Special items and powers |

### World and collections

| Import path | Content |
| --- | --- |
| `stardew-valley-data/data/bundles` | Community Center bundle requirements |
| `stardew-valley-data/data/cooking` | Cooking recipes and ingredients |
| `stardew-valley-data/data/crafting` | Crafting recipes and ingredients |
| `stardew-valley-data/data/collections` | Shipping, fish, and artifact collections |
| `stardew-valley-data/data/buildings` | Farm buildings and costs |
| `stardew-valley-data/data/locations` | Game locations |
| `stardew-valley-data/data/maps` | Map data |
| `stardew-valley-data/data/farmhouse` | Farmhouse upgrade data |
| `stardew-valley-data/data/quests` | Quest data |
| `stardew-valley-data/data/special-orders` | Special order boards |
| `stardew-valley-data/data/secret-notes` | Secret notes and journal scraps |
| `stardew-valley-data/data/lost-books` | Lost book library content |
| `stardew-valley-data/data/concessions` | Movie theater concession items |
| `stardew-valley-data/data/grandpa` | Grandpa's evaluation scoring |
| `stardew-valley-data/data/field-office` | Island field office donations |
| `stardew-valley-data/data/weather` | Weather data |

### Shops

| Import path | Content |
| --- | --- |
| `stardew-valley-data/data/pierre-shop` | Pierre's General Store |
| `stardew-valley-data/data/joja-shop` | JojaMart |
| `stardew-valley-data/data/blacksmith-shop` | Blacksmith (Clint) |
| `stardew-valley-data/data/carpenter-shop` | Carpenter's Shop (Robin) |
| `stardew-valley-data/data/saloon-shop` | Stardrop Saloon (Gus) |
| `stardew-valley-data/data/marnie-shop` | Marnie's Ranch |
| `stardew-valley-data/data/willy-shop` | Fish Shop (Willy) |
| `stardew-valley-data/data/krobus-shop` | Krobus in the Sewers |
| `stardew-valley-data/data/wizard-shop` | Wizard's Tower |
| `stardew-valley-data/data/guild-shop` | Adventurer's Guild |
| `stardew-valley-data/data/casino-shop` | Qi's Casino |
| `stardew-valley-data/data/qi-shop` | Qi's Walnut Room |
| `stardew-valley-data/data/oasis-shop` | Oasis Shop (Sandy) |
| `stardew-valley-data/data/desert-trader-shop` | Desert Trader |
| `stardew-valley-data/data/dwarf-shop` | Dwarf shop |
| `stardew-valley-data/data/medical-supplies-shop` | Harvey's Clinic |
| `stardew-valley-data/data/bookseller-shop` | Bookseller |
| `stardew-valley-data/data/volcano-shop` | Volcano Dwarf shop |
| `stardew-valley-data/data/island-trader-shop` | Island Trader |

---

## When to use direct data vs query builders

### Use direct data when

- You need the complete dataset and will do your own filtering with `Array.filter()`, lodash, or similar
- You are feeding data into a framework that expects plain arrays (e.g., a data table component)
- You want to serialize the data to a file or send it over an API
- You are building a custom index or lookup structure

```ts
import cropsData from 'stardew-valley-data/data/crops'

// Build your own Map for O(1) lookups
const cropById = new Map(cropsData.map(c => [c.id, c]))

// Use in a data table component
<DataTable rows={cropsData} columns={columns} />
```

### Use query builders when

- You want to filter and sort with readable, chainable method calls
- You need to branch a query into multiple sub-queries
- You want access to convenience methods like `findByName()` and `count()`
- You are writing application logic that benefits from the query builder API

```ts
import { crops } from 'stardew-valley-data'

const summerRegrowing = crops()
  .bySeason('summer')
  .regrowing()
  .sortBySellPrice('desc')
  .get()
```

### Combining both approaches

You can import raw data and wrap it in a query builder when needed:

```ts
import cropsData from 'stardew-valley-data/data/crops'
import { crops } from 'stardew-valley-data'

// Custom pre-filter, then use query builder
const expensive = cropsData.filter(c => c.cropSellPrice > 200)
const sorted = crops(expensive).sortByGrowDays('asc').get()
```

---

## Next steps

- Learn about [image assets](/docs/images) for accessing sprite files
- See the [query builder](/docs/query-builder) page for the full chainable API
