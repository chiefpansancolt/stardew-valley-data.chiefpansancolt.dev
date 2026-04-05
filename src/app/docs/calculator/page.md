---
title: Quality calculator
nextjs:
  metadata:
    title: Quality calculator
    description: Calculate quality-scaled sell prices and energy/health values for Silver, Gold, and Iridium item tiers.
---

The quality calculator computes sell prices and energy/health values for Silver, Gold, and Iridium quality items, matching the game's internal formulas. {% .lead %}

---

## Basic usage

Import `qualityCalculator` and call its methods with base values:

```ts
import { qualityCalculator } from 'stardew-valley-data'

const calc = qualityCalculator()

// Calculate sell prices for an item worth 250g base
const prices = calc.sellPrices(250)
// [
//   { quality: 'silver', icon: 'images/misc/Silver Quality.png', value: 312 },
//   { quality: 'gold',   icon: 'images/misc/Gold Quality.png',   value: 375 },
//   { quality: 'iridium', icon: 'images/misc/Iridium Quality.png', value: 500 }
// ]
```

---

## The `qualityCalculator()` function

```ts
function qualityCalculator(): QualityCalculator
```

Returns a `QualityCalculator` instance. The instance provides two methods: `sellPrices()` and `energyHealth()`.

---

## `sellPrices(basePrice)`

Calculates the sell price for each quality tier using the game's formula: `Math.floor(basePrice * multiplier)`.

```ts
sellPrices(basePrice: number): QualityPrice[]
```

### Parameters

| Parameter   | Type     | Description                                      |
| ----------- | -------- | ------------------------------------------------ |
| `basePrice` | `number` | The base (normal quality) sell price of the item |

### Returns

An array of three `QualityPrice` objects, one for each quality tier.

### Quality sell price multipliers

| Quality | Multiplier | Example (base 100g) |
| ------- | ---------- | ------------------- |
| Silver  | 1.25x      | 125g                |
| Gold    | 1.5x       | 150g                |
| Iridium | 2.0x       | 200g                |

### Example

```ts
import { qualityCalculator, crops } from 'stardew-valley-data'

const calc = qualityCalculator()
const melon = crops().findByName('Melon')

if (melon) {
  const prices = calc.sellPrices(melon.cropSellPrice)
  console.log(`Melon base price: ${melon.cropSellPrice}g`)
  prices.forEach((p) => {
    console.log(`  ${p.quality}: ${p.value}g`)
  })
}
```

---

## `energyHealth(baseEnergy, baseHealth)`

Calculates the energy and health restoration values for each quality tier. Uses different multipliers than sell prices.

```ts
energyHealth(baseEnergy: number, baseHealth: number): QualityEnergyHealth[]
```

### Parameters

| Parameter    | Type     | Description                                        |
| ------------ | -------- | -------------------------------------------------- |
| `baseEnergy` | `number` | The base (normal quality) energy restoration value |
| `baseHealth` | `number` | The base (normal quality) health restoration value |

### Returns

An array of three `QualityEnergyHealth` objects, one for each quality tier.

### Quality energy/health multipliers

| Quality | Multiplier | Example (base 100 energy) |
| ------- | ---------- | ------------------------- |
| Silver  | 1.4x       | 140 energy                |
| Gold    | 1.8x       | 180 energy                |
| Iridium | 2.6x       | 260 energy                |

### Example

```ts
import { qualityCalculator, crops } from 'stardew-valley-data'

const calc = qualityCalculator()
const crop = crops().findByName('Melon')

if (crop?.energyHealth) {
  const { energy, health } = crop.energyHealth
  if (energy !== undefined && health !== undefined) {
    const stats = calc.energyHealth(energy, health)
    console.log(`Melon base: ${energy} energy, ${health} health`)
    stats.forEach((s) => {
      console.log(`  ${s.quality}: ${s.energy} energy, ${s.health} health`)
    })
  }
}
```

---

## Return types

### QualityPrice

```ts
interface QualityPrice {
  quality: Quality // 'silver' | 'gold' | 'iridium'
  icon: string // Path to quality icon image
  value: number // Calculated sell price (floored)
}
```

### QualityEnergyHealth

```ts
interface QualityEnergyHealth {
  quality: Quality // 'silver' | 'gold' | 'iridium'
  icon: string // Path to quality icon image
  energy: number // Calculated energy value (floored)
  health: number // Calculated health value (floored)
}
```

Both types include an `icon` field with the path to the quality tier's icon image:

| Quality | Icon path                         |
| ------- | --------------------------------- |
| Silver  | `images/misc/Silver Quality.png`  |
| Gold    | `images/misc/Gold Quality.png`    |
| Iridium | `images/misc/Iridium Quality.png` |

---

## Practical examples

### Price comparison table

```ts
import { qualityCalculator, crops } from 'stardew-valley-data'

const calc = qualityCalculator()

const summerCrops = crops().bySeason('summer').sortBySellPrice('desc').get()

for (const crop of summerCrops.slice(0, 5)) {
  const prices = calc.sellPrices(crop.cropSellPrice)
  const iridiumPrice = prices.find((p) => p.quality === 'iridium')!.value
  console.log(
    `${crop.name}: ${crop.cropSellPrice}g base, ${iridiumPrice}g iridium`,
  )
}
```

### Displaying quality prices in a UI

```tsx
import { qualityCalculator } from 'stardew-valley-data'

function QualityPrices({ basePrice }: { basePrice: number }) {
  const prices = qualityCalculator().sellPrices(basePrice)

  return (
    <div>
      <span>Base: {basePrice}g</span>
      {prices.map((p) => (
        <span key={p.quality}>
          <img
            src={`/stardew-images/${p.icon.replace('images/', '')}`}
            alt={p.quality}
          />
          {p.value}g
        </span>
      ))}
    </div>
  )
}
```

### Combined price and energy display

```ts
import { qualityCalculator } from 'stardew-valley-data'

const calc = qualityCalculator()

function getItemQualityStats(
  basePrice: number,
  baseEnergy: number,
  baseHealth: number,
) {
  const prices = calc.sellPrices(basePrice)
  const stats = calc.energyHealth(baseEnergy, baseHealth)

  return prices.map((price, i) => ({
    quality: price.quality,
    icon: price.icon,
    sellPrice: price.value,
    energy: stats[i].energy,
    health: stats[i].health,
  }))
}

const melonStats = getItemQualityStats(250, 113, 50)
melonStats.forEach((s) => {
  console.log(
    `${s.quality}: ${s.sellPrice}g, ${s.energy} energy, ${s.health} health`,
  )
})
```

---

## `artisanCalculator()`

```ts
function artisanCalculator(): ArtisanCalculator
```

Calculates sell prices and energy/health values for artisan goods. Each method takes the base values of the source ingredient.

### Methods

| Method           | Signature                                                                        | Formula                                                             |
| ---------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `roe`            | `roe(baseFishPrice: number): ArtisanResult`                                      | `30 + Math.floor(baseFishPrice / 2)`                                |
| `agedRoe`        | `agedRoe(baseFishPrice: number): ArtisanResult`                                  | `60 + baseFishPrice`                                                |
| `honey`          | `honey(baseFlowerPrice: number): ArtisanResult`                                  | `100 + (baseFlowerPrice * 2)` — pass `0` for wild honey             |
| `wine`           | `wine(baseFruitPrice, baseEnergy, baseHealth): ArtisanEnergyResult`              | sell `Math.floor(baseFruitPrice * 3)`, energy/health `×1.75`        |
| `juice`          | `juice(basePrice, baseEnergy, baseHealth): ArtisanEnergyResult`                  | sell `Math.floor(basePrice * 2.25)`, energy/health `×2`             |
| `pickles`        | `pickles(basePrice, baseEnergy, baseHealth): ArtisanEnergyResult`                | sell `Math.floor(basePrice * 2) + 50`, energy/health `×1.75`        |
| `jelly`          | `jelly(baseFruitPrice, baseEnergy, baseHealth): ArtisanEnergyResult`             | sell `Math.floor(baseFruitPrice * 2) + 50`, energy/health `×2`      |
| `driedMushrooms` | `driedMushrooms(baseMushroomPrice, baseEnergy, baseHealth): ArtisanEnergyResult` | sell `Math.floor(baseMushroomPrice * 7.5) + 25`, energy/health `×3` |
| `driedFruit`     | `driedFruit(baseFruitPrice, baseEnergy, baseHealth): ArtisanEnergyResult`        | sell `Math.floor(baseFruitPrice * 7.5)`, energy/health `×3`         |
| `smokedFish`     | `smokedFish(baseFishPrice, baseEnergy, baseHealth): ArtisanEnergyResult`         | sell `Math.floor(baseFishPrice * 2)`, energy/health `×1.5`          |

### Return types

```ts
interface ArtisanResult {
  sellPrice: number
}

interface ArtisanEnergyResult {
  sellPrice: number
  energy: number
  health: number
}
```

### Example

```ts
import { artisanCalculator, crops } from 'stardew-valley-data'

const calc = artisanCalculator()
const melon = crops().findByName('Melon')

if (melon) {
  const wine = calc.wine(
    melon.cropSellPrice,
    melon.energyHealth!.energy,
    melon.energyHealth!.health,
  )
  console.log(`Melon Wine: ${wine.sellPrice}g, ${wine.energy} energy`)

  const jelly = calc.jelly(
    melon.cropSellPrice,
    melon.energyHealth!.energy,
    melon.energyHealth!.health,
  )
  console.log(`Melon Jelly: ${jelly.sellPrice}g`)
}
```

---

## `professionCalculator()`

```ts
function professionCalculator(): ProfessionCalculator
```

Calculates sell prices with profession bonuses applied. Each method takes a base sell price and returns the adjusted value.

### Methods

| Method       | Signature                           | Multiplier |
| ------------ | ----------------------------------- | ---------- |
| `artisan`    | `artisan(price: number): number`    | `×1.4`     |
| `rancher`    | `rancher(price: number): number`    | `×1.2`     |
| `tiller`     | `tiller(price: number): number`     | `×1.1`     |
| `blacksmith` | `blacksmith(price: number): number` | `×1.5`     |
| `gemologist` | `gemologist(price: number): number` | `×1.3`     |
| `tapper`     | `tapper(price: number): number`     | `×1.25`    |
| `fisher`     | `fisher(price: number): number`     | `×1.25`    |
| `angler`     | `angler(price: number): number`     | `×1.5`     |

All results are `Math.floor`ed.

### Example

```ts
import { professionCalculator, crops } from 'stardew-valley-data'

const calc = professionCalculator()
const parsnip = crops().findByName('Parsnip')

if (parsnip) {
  const base = parsnip.cropSellPrice
  console.log(`Base: ${base}g`)
  console.log(`Tiller: ${calc.tiller(base)}g`)
  console.log(`Artisan (pickles): ${calc.artisan(calc.tiller(base))}g`)
}
```

---

## `knowledgeCalculator()`

```ts
function knowledgeCalculator(): KnowledgeCalculator
```

Calculates sell prices with special knowledge bonuses (Bear's Knowledge, Spring Onion Mastery).

### Methods

| Method               | Signature                                   | Formula                 |
| -------------------- | ------------------------------------------- | ----------------------- |
| `springOnionMastery` | `springOnionMastery(price: number): number` | `Math.floor(price * 5)` |
| `bearsKnowledge`     | `bearsKnowledge(price: number): number`     | `Math.floor(price * 3)` |

### Example

```ts
import { knowledgeCalculator, forageables } from 'stardew-valley-data'

const calc = knowledgeCalculator()
const springOnion = forageables().findByName('Spring Onion')

if (springOnion) {
  console.log(`Base: ${springOnion.sellPrice}g`)
  console.log(
    `With mastery: ${calc.springOnionMastery(springOnion.sellPrice)}g`,
  )
}
```

---

## `jojaParrotCalculator()`

```ts
function jojaParrotCalculator(): JojaParrotCalculator
```

Calculates the gold cost to purchase remaining Golden Walnuts from the Joja Parrot. Each unfound walnut costs 10,000g, and all remaining walnuts are delivered after sleeping.

### Methods & getters

| Member                    | Type                               | Description                            |
| ------------------------- | ---------------------------------- | -------------------------------------- |
| `cost(walnutsFound)`      | `(walnutsFound: number) => number` | Gold cost to buy all remaining walnuts |
| `remaining(walnutsFound)` | `(walnutsFound: number) => number` | Number of walnuts still unfound        |
| `total`                   | `number` (getter)                  | Total Golden Walnuts in the game (130) |
| `costPerWalnut`           | `number` (getter)                  | Cost per individual walnut (10,000g)   |

### Example

```ts
import { jojaParrotCalculator } from 'stardew-valley-data'

const calc = jojaParrotCalculator()
const found = 87

console.log(`Total walnuts: ${calc.total}`)
console.log(`Walnuts remaining: ${calc.remaining(found)}`)
console.log(`Cost to buy all remaining: ${calc.cost(found).toLocaleString()}g`)
```

---

## Next steps

- Learn about the [search utility](/docs/search) for finding items across all modules
- See [image assets](/docs/images) for using quality icons in your UI
- Explore [TypeScript integration](/docs/typescript) for the `Quality`, `QualityPrice`, and `QualityEnergyHealth` types
