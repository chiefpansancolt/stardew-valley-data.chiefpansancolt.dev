---
title: Artisan Goods
nextjs:
  metadata:
    title: Artisan Goods
    description: Query Stardew Valley artisan goods with equipment filters, cask aging data, and price formula calculations.
---

Access artisan good data including processing equipment, ingredients, cask aging, and dynamic price formulas. {% .lead %}

## Quick Start

```js
import { artisanGoods, calculateArtisanPrice } from 'stardew-valley-data'

// All artisan goods
const all = artisanGoods().get()

// Goods made with a Keg
const kegGoods = artisanGoods().byEquipment('Keg').get()

// Goods that can be aged in a Cask
const caskable = artisanGoods().caskAgeable().get()

// Calculate price from ingredient
const wine = artisanGoods().findByName('Wine')
if (wine) {
  const price = calculateArtisanPrice(wine, 150) // 150g ingredient
  console.log(`Wine sell price: ${price}g`)
}
```

## Type Definition

```ts
interface ArtisanGood {
  id: string
  name: string
  description: string
  equipment: string
  ingredients: ArtisanIngredient[]
  processingMinutes: number
  processingDays: number
  sellPrice: number | null
  sellPriceFormula: string | null
  priceFormula: PriceFormula | null
  qualityLevels: boolean
  cask: CaskAging | null
  image: string
}
```

### Field Reference

| Field               | Type                   | Description                                                                                    |
| ------------------- | ---------------------- | ---------------------------------------------------------------------------------------------- |
| `id`                | `string`               | Unique identifier.                                                                             |
| `name`              | `string`               | Display name (e.g. `"Wine"`, `"Cheese"`).                                                      |
| `description`       | `string`               | In-game description text.                                                                      |
| `equipment`         | `string`               | Equipment used to produce this good (e.g. `"Keg"`, `"Preserves Jar"`).                         |
| `ingredients`       | `ArtisanIngredient[]`  | Array of required ingredients.                                                                 |
| `processingMinutes` | `number`               | In-game processing time in minutes.                                                            |
| `processingDays`    | `number`               | Approximate processing time in days.                                                           |
| `sellPrice`         | `number \| null`       | Fixed sell price, or `null` if the price is formula-based.                                     |
| `sellPriceFormula`  | `string \| null`       | Human-readable formula string (e.g. `"2 * Base Price + 50"`), or `null` for fixed-price goods. |
| `priceFormula`      | `PriceFormula \| null` | Structured formula for calculating sell price from an ingredient, or `null`.                   |
| `qualityLevels`     | `boolean`              | Whether this good supports Silver/Gold/Iridium quality.                                        |
| `cask`              | `CaskAging \| null`    | Cask aging data, or `null` if it cannot be aged.                                               |
| `image`             | `string`               | Path to the image asset.                                                                       |

### Supporting Types

```ts
interface ArtisanIngredient {
  name: string
  id: string | null
  quantity: number | null
}

interface PriceFormula {
  multiplier: number
  addend: number
}

interface CaskAging {
  silverDays: number
  goldDays: number
  iridiumDays: number
}
```

## Query Methods

The `artisanGoods()` function returns an `ArtisanGoodQuery` instance. All methods return a new `ArtisanGoodQuery` for chaining.

### Inherited Methods

| Method              | Returns                    | Description                      |
| ------------------- | -------------------------- | -------------------------------- |
| `.get()`            | `ArtisanGood[]`            | Return all results as an array.  |
| `.first()`          | `ArtisanGood \| undefined` | Return the first result.         |
| `.find(id)`         | `ArtisanGood \| undefined` | Find by exact ID.                |
| `.findByName(name)` | `ArtisanGood \| undefined` | Find by name (case-insensitive). |
| `.count()`          | `number`                   | Return the number of results.    |

### Filter Methods

| Method              | Signature                        | Description                                                        |
| ------------------- | -------------------------------- | ------------------------------------------------------------------ |
| `byEquipment`       | `byEquipment(equipment: string)` | Filter by the equipment that produces the good (case-insensitive). |
| `caskAgeable`       | `caskAgeable()`                  | Filter to goods that can be aged in a Cask.                        |
| `withQualityLevels` | `withQualityLevels()`            | Filter to goods that support Silver/Gold/Iridium quality.          |
| `fixedPrice`        | `fixedPrice()`                   | Filter to goods with a fixed sell price (not formula-based).       |
| `formulaPrice`      | `formulaPrice()`                 | Filter to goods whose sell price depends on the ingredient.        |

## Helper Functions

### calculateArtisanPrice

```ts
function calculateArtisanPrice(
  good: ArtisanGood,
  ingredientBasePrice: number,
): number | null
```

Calculate the sell price of a formula-based artisan good given the ingredient's base price. Returns `null` if the good has a fixed price (no formula).

The formula applied is: `Math.floor(ingredientBasePrice * multiplier) + addend`

### applyPriceFormula

```ts
function applyPriceFormula(
  formula: PriceFormula,
  ingredientBasePrice: number,
): number
```

Apply a `PriceFormula` directly to an ingredient base price. Useful when you already have a formula object.

## Examples

### Keg products and their processing times

```js
import { artisanGoods } from 'stardew-valley-data'

const kegGoods = artisanGoods().byEquipment('Keg').get()

kegGoods.forEach((g) => {
  console.log(`${g.name}: ${g.processingDays} day(s)`)
})
```

### Calculate wine sell prices for different fruits

```js
import { artisanGoods, calculateArtisanPrice } from 'stardew-valley-data'

const wine = artisanGoods().findByName('Wine')
const fruitPrices = [50, 150, 300, 750] // base prices of various fruits

if (wine) {
  fruitPrices.forEach((base) => {
    const sellPrice = calculateArtisanPrice(wine, base)
    console.log(`${base}g fruit -> Wine sells for ${sellPrice}g`)
  })
}
```

### Cask aging breakdown

```js
const caskable = artisanGoods().caskAgeable().get()

caskable.forEach((g) => {
  if (g.cask) {
    console.log(
      `${g.name}: Silver ${g.cask.silverDays}d, Gold ${g.cask.goldDays}d, Iridium ${g.cask.iridiumDays}d`,
    )
  }
})
```

### Fixed-price vs formula-price goods

```js
const fixedCount = artisanGoods().fixedPrice().count()
const formulaCount = artisanGoods().formulaPrice().count()

console.log(
  `${fixedCount} fixed-price goods, ${formulaCount} formula-based goods`,
)
```
