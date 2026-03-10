---
title: Animals
nextjs:
  metadata:
    title: Animals
    description: Query Stardew Valley animal data including pets and farm animals with type guards and filters.
---

Access pet and farm animal data with a discriminated union type, type guards, and filters for building, harvest method, and more. {% .lead %}

## Quick Start

```js
import { animals, isPet, isFarmAnimal } from 'stardew-valley-data'

// All animals
const all = animals().get()

// Only farm animals
const farmOnly = animals().farmAnimals().get()

// Coop animals
const coopAnimals = animals().byBuilding('Coop').get()

// Use type guards
const first = animals().first()
if (first && isFarmAnimal(first)) {
  console.log(`${first.name} lives in the ${first.building}`)
}
```

## Type Definition

Animals use a discriminated union: `Animal = Pet | FarmAnimal`. Use the `type` field or the exported type guards to narrow the type.

### Pet

```ts
interface Pet {
  type: 'pet'
  id: string
  name: string
  variant?: number
  image: string
}
```

| Field     | Type                  | Description                                      |
| --------- | --------------------- | ------------------------------------------------ |
| `type`    | `'pet'`               | Discriminator for pets.                          |
| `id`      | `string`              | Unique identifier.                               |
| `name`    | `string`              | Pet breed name (e.g. `"Cat"`, `"Dog"`).          |
| `variant` | `number \| undefined` | Variant number for the pet breed, if applicable. |
| `image`   | `string`              | Path to the image asset.                         |

### FarmAnimal

```ts
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

interface AnimalProduce {
  id: string
  name: string
  sellPrice: number
  image: string
}
```

| Field           | Type                        | Description                                                    |
| --------------- | --------------------------- | -------------------------------------------------------------- |
| `type`          | `'farm-animal'`             | Discriminator for farm animals.                                |
| `id`            | `string`                    | Unique identifier.                                             |
| `name`          | `string`                    | Animal name (e.g. `"Chicken"`, `"Cow"`).                       |
| `description`   | `string`                    | In-game description.                                           |
| `building`      | `string`                    | Required building (e.g. `"Coop"`, `"Barn"`).                   |
| `purchasePrice` | `number \| null`            | Purchase price in gold, or `null` if not purchasable.          |
| `sellPrice`     | `number`                    | Sell price when sold.                                          |
| `daysToMature`  | `number`                    | Days until the animal starts producing.                        |
| `daysToProduce` | `number`                    | Days between each product.                                     |
| `harvestMethod` | `'drop' \| 'tool' \| 'dig'` | How the product is collected.                                  |
| `harvestTool`   | `string \| null`            | Tool required for harvesting, if any (e.g. `"Milk Pail"`).     |
| `produce`       | `AnimalProduce`             | Standard produce item with id, name, sell price, and image.    |
| `deluxeProduce` | `AnimalProduce \| null`     | Deluxe produce item when friendship is high enough, or `null`. |
| `image`         | `string`                    | Path to the image asset.                                       |

## Type Guards

The package exports two type guard functions for narrowing the `Animal` union:

```ts
import { isPet, isFarmAnimal } from 'stardew-valley-data'

function isPet(animal: Animal): animal is Pet
function isFarmAnimal(animal: Animal): animal is FarmAnimal
```

Use these in conditional blocks to safely access subtype-specific fields:

```js
const animal = animals().first()

if (isPet(animal)) {
  console.log(animal.variant) // safe: Pet-only field
}

if (isFarmAnimal(animal)) {
  console.log(animal.building) // safe: FarmAnimal-only field
}
```

## Query Methods

The `animals()` function returns an `AnimalQuery` instance. All methods return a new `AnimalQuery` for chaining.

### Inherited Methods

| Method              | Returns               | Description                      |
| ------------------- | --------------------- | -------------------------------- |
| `.get()`            | `Animal[]`            | Return all results as an array.  |
| `.first()`          | `Animal \| undefined` | Return the first result.         |
| `.find(id)`         | `Animal \| undefined` | Find by exact ID.                |
| `.findByName(name)` | `Animal \| undefined` | Find by name (case-insensitive). |
| `.count()`          | `number`              | Return the number of results.    |

### Filter Methods

| Method            | Signature                                            | Description                                                                           |
| ----------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `pets`            | `pets()`                                             | Filter to pets only.                                                                  |
| `byPetName`       | `byPetName(name: string)`                            | Filter to a specific pet breed by name (case-insensitive).                            |
| `farmAnimals`     | `farmAnimals()`                                      | Filter to farm animals only.                                                          |
| `byBuilding`      | `byBuilding(building: string)`                       | Filter farm animals by required building (case-insensitive, e.g. `'Coop'`, `'Barn'`). |
| `byHarvestMethod` | `byHarvestMethod(method: 'drop' \| 'tool' \| 'dig')` | Filter farm animals by how their product is harvested.                                |
| `purchasable`     | `purchasable()`                                      | Filter to farm animals that have a purchase price.                                    |

## Examples

### Barn animals and their products

```js
import { animals, isFarmAnimal } from 'stardew-valley-data'

const barnAnimals = animals().byBuilding('Barn').get()

barnAnimals.forEach((a) => {
  if (isFarmAnimal(a)) {
    console.log(
      `${a.name}: produces ${a.produce.name} (${a.produce.sellPrice}g)`,
    )
    if (a.deluxeProduce) {
      console.log(
        `  Deluxe: ${a.deluxeProduce.name} (${a.deluxeProduce.sellPrice}g)`,
      )
    }
  }
})
```

### Animals that require a tool to harvest

```js
const toolHarvest = animals().byHarvestMethod('tool').get()
```

### All purchasable farm animals

```js
const buyable = animals().purchasable().get()

buyable.forEach((a) => {
  if (isFarmAnimal(a)) {
    console.log(`${a.name}: ${a.purchasePrice}g`)
  }
})
```

### List all pet breeds

```js
const allPets = animals().pets().get()
allPets.forEach((p) => console.log(p.name))
```
