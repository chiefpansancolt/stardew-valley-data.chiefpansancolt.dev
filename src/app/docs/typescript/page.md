---
title: TypeScript integration
nextjs:
  metadata:
    title: TypeScript integration
    description: Use the full TypeScript type system with typed exports, shared types, union types, type guards, and generics.
---

stardew-valley-data ships with complete TypeScript declarations -- every function, type, and interface is fully typed with no additional packages required. {% .lead %}

---

## Importing types

All types are exported from the main entry point. Use `import type` when you only need the type for annotations:

```ts
import type { Crop, Fish, Villager, Season, Quality } from 'stardew-valley-data'
```

You can also import types alongside runtime values:

```ts
import { crops, type Crop, type Season } from 'stardew-valley-data'

function getCropsBySeason(season: Season): Crop[] {
  return crops().bySeason(season).get()
}
```

---

## Common shared types

Several types are shared across multiple modules. These are defined in the common type module and re-exported from the main package.

### Season

```ts
type Season = 'spring' | 'summer' | 'fall' | 'winter' | 'ginger island'
```

Used by crops, fish, trees, villager birthdays, and more. Note that `'ginger island'` is included as a season for items available year-round on the island.

### Quality

```ts
type Quality = 'silver' | 'gold' | 'iridium'
```

Used by the quality calculator and anywhere item quality tiers apply.

### EnergyHealth

```ts
interface EnergyHealth {
  energy?: number
  health?: number
  poison?: boolean
}
```

Represents the energy and health values of consumable items. Present on crops, fish, cooking recipes, and other edible items.

### SeedBuyPrice

```ts
interface SeedBuyPrice {
  place: string
  price: number
}
```

Represents a purchase location and cost for seeds or saplings.

### Ingredient

```ts
interface Ingredient {
  name: string
  id: string
  quantity: number
}
```

Represents a crafting or cooking recipe ingredient with its required quantity.

### Stage

```ts
interface Stage {
  name: string
  image: string
}
```

Represents a growth stage for crops and trees, with an associated image path.

### GiftPreferences

```ts
interface GiftPreferences {
  loves: string[]
  likes: string[]
  neutrals: string[]
  dislikes: string[]
  hates: string[]
}
```

Gift preference lists used by villagers and universal gift data.

---

## Union types

Several modules use discriminated unions to represent items with different shapes. The discriminant is always the `type` field.

### Animal

```ts
type Animal = Pet | FarmAnimal
```

Where:

```ts
interface Pet {
  type: 'pet'
  id: string
  name: string
  variant?: number
  image: string
}

interface FarmAnimal {
  type: 'farm-animal'
  id: string
  name: string
  description: string
  building: string
  purchasePrice: number | null
  sellPrice: number
  daysToMature: number
  daysToProduce: number
  harvestMethod: 'drop' | 'tool' | 'dig'
  harvestTool: string | null
  produce: AnimalProduce
  deluxeProduce: AnimalProduce | null
  image: string
}
```

### Tree

```ts
type Tree = FruitTree | WildTree
```

Where `FruitTree` has `type: 'fruit-tree'` with produce and sapling data, and `WildTree` has `type: 'wild-tree'` with seed and tapper data.

---

## Type guards

The package exports type guard functions for narrowing union types. These are standard TypeScript type predicates that work with `if` statements, `filter()`, and anywhere else TypeScript narrows types.

### isPet / isFarmAnimal

```ts
import { animals, isPet, isFarmAnimal } from 'stardew-valley-data'

const allAnimals = animals().get()

for (const animal of allAnimals) {
  if (isPet(animal)) {
    // TypeScript knows `animal` is Pet here
    console.log(`Pet: ${animal.name}`)
  }

  if (isFarmAnimal(animal)) {
    // TypeScript knows `animal` is FarmAnimal here
    console.log(`${animal.name} produces ${animal.produce.name}`)
    console.log(`Lives in: ${animal.building}`)
  }
}
```

Type guards also work with `Array.filter()`:

```ts
import { animals, isFarmAnimal } from 'stardew-valley-data'

// TypeScript infers FarmAnimal[] -- no cast needed
const farmAnimals = animals().get().filter(isFarmAnimal)
```

---

## Using generics with QueryBase

The `QueryBase<T>` class is generic over any type `T` that has `id: string` and `name: string`. This means all terminal methods are fully typed:

```ts
import { crops } from 'stardew-valley-data'

// crops() returns CropQuery which extends QueryBase<Crop>
const result = crops().bySeason('summer').get()   // Crop[]
const first = crops().first()                      // Crop | undefined
const found = crops().find('248')                  // Crop | undefined
const byName = crops().findByName('Melon')         // Crop | undefined
const count = crops().count()                      // number
```

When you pass custom source data to a factory function, the types flow through automatically:

```ts
import { crops, type Crop } from 'stardew-valley-data'

const customData: Crop[] = [/* your data */]
const query = crops(customData)      // CropQuery (extends QueryBase<Crop>)
const results = query.get()          // Crop[]
```

---

## Typing function parameters

Use the exported types to write strongly-typed functions:

```ts
import { crops, type Crop, type Season } from 'stardew-valley-data'

function getMostValuableCrop(season: Season): Crop | undefined {
  return crops()
    .bySeason(season)
    .sortBySellPrice('desc')
    .first()
}

function formatCrop(crop: Crop): string {
  const seasons = crop.seasons.join(', ')
  const regrow = crop.regrowDays ? ` (regrows in ${crop.regrowDays}d)` : ''
  return `${crop.name}: ${crop.cropSellPrice}g${regrow} [${seasons}]`
}
```

### Working with search results

```ts
import { search, type SearchResult, type SearchResultKind } from 'stardew-valley-data'

function findItems(query: string, kind?: SearchResultKind): SearchResult[] {
  return kind ? search(query, [kind]) : search(query)
}

const results = findItems('Melon', 'crop')
results.forEach(r => {
  console.log(`[${r.kind}] ${r.name} - ${r.sellPrice ?? 'N/A'}g`)
})
```

### Working with calculator results

```ts
import { qualityCalculator, type QualityPrice, type QualityEnergyHealth } from 'stardew-valley-data'

const calc = qualityCalculator()
const prices: QualityPrice[] = calc.sellPrices(250)
const stats: QualityEnergyHealth[] = calc.energyHealth(113, 50)
```

---

## Module-specific types

Each module exports its own types. Here are some commonly used ones:

| Module | Key types |
| --- | --- |
| Crops | `Crop`, `HarvestQuantity` |
| Fish | `Fish`, `FishCatchType`, `FishWeather` |
| Villagers | `Villager` |
| Animals | `Animal`, `Pet`, `FarmAnimal`, `AnimalProduce` |
| Trees | `Tree`, `FruitTree`, `WildTree`, `FruitTreeProduce`, `WildTreeTapper` |
| Search | `SearchResult`, `SearchResultKind` |
| Calculator | `QualityPrice`, `QualityEnergyHealth` |
| Save file | `SaveData`, `SavePlayer`, `SaveFarm`, `SaveDate`, and 30+ more |
| Seasons | `SeasonData`, `Festival` |
| Common | `Season`, `Quality`, `EnergyHealth`, `SeedBuyPrice`, `Ingredient`, `Stage`, `GiftPreferences` |

All types are importable from the main `'stardew-valley-data'` entry point.

---

## Next steps

- Explore [direct data access](/docs/direct-data) for raw JSON imports
- Use the [search utility](/docs/search) for cross-module lookups
- See the [quality calculator](/docs/calculator) for price and energy calculations
