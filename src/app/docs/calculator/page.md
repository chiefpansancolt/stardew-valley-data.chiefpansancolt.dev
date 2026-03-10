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

| Parameter | Type | Description |
| --- | --- | --- |
| `basePrice` | `number` | The base (normal quality) sell price of the item |

### Returns

An array of three `QualityPrice` objects, one for each quality tier.

### Quality sell price multipliers

| Quality | Multiplier | Example (base 100g) |
| --- | --- | --- |
| Silver | 1.25x | 125g |
| Gold | 1.5x | 150g |
| Iridium | 2.0x | 200g |

### Example

```ts
import { qualityCalculator, crops } from 'stardew-valley-data'

const calc = qualityCalculator()
const melon = crops().findByName('Melon')

if (melon) {
  const prices = calc.sellPrices(melon.cropSellPrice)
  console.log(`Melon base price: ${melon.cropSellPrice}g`)
  prices.forEach(p => {
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

| Parameter | Type | Description |
| --- | --- | --- |
| `baseEnergy` | `number` | The base (normal quality) energy restoration value |
| `baseHealth` | `number` | The base (normal quality) health restoration value |

### Returns

An array of three `QualityEnergyHealth` objects, one for each quality tier.

### Quality energy/health multipliers

| Quality | Multiplier | Example (base 100 energy) |
| --- | --- | --- |
| Silver | 1.4x | 140 energy |
| Gold | 1.8x | 180 energy |
| Iridium | 2.6x | 260 energy |

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
    stats.forEach(s => {
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
  quality: Quality     // 'silver' | 'gold' | 'iridium'
  icon: string         // Path to quality icon image
  value: number        // Calculated sell price (floored)
}
```

### QualityEnergyHealth

```ts
interface QualityEnergyHealth {
  quality: Quality     // 'silver' | 'gold' | 'iridium'
  icon: string         // Path to quality icon image
  energy: number       // Calculated energy value (floored)
  health: number       // Calculated health value (floored)
}
```

Both types include an `icon` field with the path to the quality tier's icon image:

| Quality | Icon path |
| --- | --- |
| Silver | `images/misc/Silver Quality.png` |
| Gold | `images/misc/Gold Quality.png` |
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
  const iridiumPrice = prices.find(p => p.quality === 'iridium')!.value
  console.log(`${crop.name}: ${crop.cropSellPrice}g base, ${iridiumPrice}g iridium`)
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
      {prices.map(p => (
        <span key={p.quality}>
          <img src={`/stardew-images/${p.icon.replace('images/', '')}`} alt={p.quality} />
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

function getItemQualityStats(basePrice: number, baseEnergy: number, baseHealth: number) {
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
melonStats.forEach(s => {
  console.log(`${s.quality}: ${s.sellPrice}g, ${s.energy} energy, ${s.health} health`)
})
```

---

## Next steps

- Learn about the [search utility](/docs/search) for finding items across all modules
- See [image assets](/docs/images) for using quality icons in your UI
- Explore [TypeScript integration](/docs/typescript) for the `Quality`, `QualityPrice`, and `QualityEnergyHealth` types
