---
title: Cooking
nextjs:
  metadata:
    title: Cooking
    description: Query Stardew Valley cooking recipes with ingredients, buffs, sell prices, energy values, and recipe sources.
---

Access the complete dataset of Stardew Valley cooked dishes with typed ingredient, buff, and recipe source information using the chainable `CookingQuery` API. {% .lead %}

## Quick Start

```js
import { cooking } from 'stardew-valley-data'

// Get all cooked dishes
const all = cooking().get()

// Find a specific dish by name
const soup = cooking().findByName('Pumpkin Soup')

// Get dishes sorted by sell price (most valuable first)
const valuable = cooking().sortBySellPrice('desc').get()

// Get the most energizing dishes
const energizing = cooking().sortByEnergy('desc').get()

// Find all dishes that use a specific ingredient
const eggDishes = cooking().withIngredient('egg').get()
```

## Type Definition

Each cooked dish conforms to the `CookedDish` interface:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier for the dish. |
| `name` | `string` | Display name of the dish. |
| `description` | `string` | In-game description of the dish. |
| `sellPrice` | `number` | Gold value when sold. |
| `energyHealth` | `EnergyHealth` | Energy and health restoration values (see below). |
| `ingredients` | `Ingredient[]` | Array of ingredients required to cook the dish (see below). |
| `image` | `string` | Path to the dish image. |
| `buffs` | `CookingBuff[]` | Array of stat buffs applied when eaten (see below). |
| `buffDuration` | `number \| null` | Duration of buffs in minutes, or `null` if no buffs. |
| `recipeSources` | `RecipeSource[]` | How the recipe can be obtained (see below). |

### EnergyHealth

| Field | Type | Description |
| --- | --- | --- |
| `energy` | `number \| undefined` | Energy restored when consumed. |
| `health` | `number \| undefined` | Health restored when consumed. |
| `poison` | `boolean \| undefined` | Whether the item causes a poison debuff. |

### Ingredient

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` | Display name of the ingredient. |
| `id` | `string` | Unique identifier for the ingredient item. |
| `quantity` | `number` | Number of this ingredient required. |

### CookingBuff

| Field | Type | Description |
| --- | --- | --- |
| `stat` | `string` | The stat that is buffed (e.g., `"Farming"`, `"Speed"`). |
| `value` | `number` | The buff value applied. |

### RecipeSource

`RecipeSource` is a union type describing how a recipe is obtained:

| Type | Fields | Description |
| --- | --- | --- |
| `{ type: 'default' }` | -- | Known by default at the start of the game. |
| `{ type: 'friendship' }` | `villager: string`, `hearts: number` | Received from a villager at a friendship level. |
| `{ type: 'skill' }` | `skill: string`, `level: number` | Learned upon reaching a skill level. |
| `{ type: 'queen-of-sauce' }` | `season: Season`, `day: number`, `year: number` | Learned from the Queen of Sauce TV show. |
| `{ type: 'purchase' }` | `from: string`, `price: number`, `currency: string` | Purchased from a shop. |
| `{ type: 'cutscene' }` | `description: string` | Obtained through a cutscene event. |

## Query Methods

`CookingQuery` extends `QueryBase` and inherits five terminal methods shared by all query builders:

| Method | Returns | Description |
| --- | --- | --- |
| `get()` | `CookedDish[]` | Return all results as an array. |
| `first()` | `CookedDish \| undefined` | Return the first result. |
| `find(id)` | `CookedDish \| undefined` | Find a dish by exact ID. |
| `findByName(name)` | `CookedDish \| undefined` | Find a dish by name (case-insensitive). |
| `count()` | `number` | Return the number of results. |

### Filter Methods

| Method | Returns | Description |
| --- | --- | --- |
| `withIngredient(ingredientId)` | `CookingQuery` | Filter to dishes that require a specific ingredient by item ID. |

### Sort Methods

| Method | Returns | Description |
| --- | --- | --- |
| `sortByName(order?)` | `CookingQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |
| `sortBySellPrice(order?)` | `CookingQuery` | Sort by sell price. Pass `'desc'` (default) or `'asc'`. |
| `sortByEnergy(order?)` | `CookingQuery` | Sort by energy restored. Dishes with no energy value sort as 0. Pass `'desc'` (default) or `'asc'`. |

## Examples

### Find the most valuable dishes

```js
import { cooking } from 'stardew-valley-data'

const topDishes = cooking().sortBySellPrice('desc').get()

topDishes.slice(0, 5).forEach((d) => {
  console.log(`${d.name}: ${d.sellPrice}g`)
})
```

### Get the best energy-restoring dishes

```js
import { cooking } from 'stardew-valley-data'

const energizing = cooking().sortByEnergy('desc').get()

energizing.slice(0, 5).forEach((d) => {
  const energy = d.energyHealth.energy ?? 0
  console.log(`${d.name}: +${energy} energy`)
})
```

### Find dishes that use a specific ingredient

```js
import { cooking } from 'stardew-valley-data'

const milkDishes = cooking().withIngredient('milk').sortByName().get()

milkDishes.forEach((d) => {
  console.log(`${d.name} — Ingredients: ${d.ingredients.map((i) => i.name).join(', ')}`)
})
```

### List dishes with buffs

```js
import { cooking } from 'stardew-valley-data'

const buffDishes = cooking().get().filter((d) => d.buffs.length > 0)

buffDishes.forEach((d) => {
  const buffStr = d.buffs.map((b) => `${b.stat} +${b.value}`).join(', ')
  console.log(`${d.name}: ${buffStr} (${d.buffDuration} min)`)
})
```

### View recipe sources for a dish

```js
import { cooking } from 'stardew-valley-data'

const dish = cooking().findByName('Pumpkin Soup')

if (dish) {
  dish.recipeSources.forEach((source) => {
    switch (source.type) {
      case 'friendship':
        console.log(`${source.villager} at ${source.hearts} hearts`)
        break
      case 'queen-of-sauce':
        console.log(`Queen of Sauce: ${source.season} ${source.day}, Year ${source.year}`)
        break
      case 'default':
        console.log('Known by default')
        break
    }
  })
}
```

### Wrap a pre-filtered array

You can pass an existing `CookedDish[]` array into the `cooking()` function to create a new query from it:

```js
import { cooking } from 'stardew-valley-data'

const myList = cooking().withIngredient('egg').get()
const sorted = cooking(myList).sortBySellPrice('desc').get()
```
