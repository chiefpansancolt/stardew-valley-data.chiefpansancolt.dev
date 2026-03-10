---
title: Crafting
nextjs:
  metadata:
    title: Crafting
    description: Query Stardew Valley crafting recipes with ingredients, output items, categories, and recipe sources.
---

Access the complete dataset of Stardew Valley crafting recipes with typed ingredient, output, and source information using the chainable `CraftingQuery` API. {% .lead %}

## Quick Start

```js
import { crafting } from 'stardew-valley-data'

// Get all crafting recipes
const all = crafting().get()

// Find a specific recipe by name
const sprinkler = crafting().findByName('Quality Sprinkler')

// Get recipes in a category
const lighting = crafting().byCategory('Lighting').get()

// Find a recipe by its output item ID
const recipe = crafting().findByOutputId('quality-sprinkler')

// Get recipes from a specific source
const farmingRecipes = crafting().bySource('farming').get()
```

## Type Definition

Each crafting recipe conforms to the `CraftingRecipe` interface:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier for the recipe. |
| `name` | `string` | Display name of the recipe. |
| `description` | `string` | In-game description of the crafted item. |
| `category` | `string` | Category the recipe belongs to (e.g., `"Lighting"`, `"Fencing"`, `"Artisan Equipment"`). |
| `source` | `string` | How the recipe is obtained (e.g., `"Farming Level 6"`, `"Default"`). |
| `output` | `CraftingOutput` | The item produced by the recipe (see below). |
| `ingredients` | `CraftingIngredient[]` | Array of ingredients required (see below). |
| `image` | `string` | Path to the crafted item image. |

### CraftingOutput

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier for the output item. |
| `name` | `string` | Display name of the output item. |
| `quantity` | `number` | Number of items produced per craft. |
| `isBigCraftable` | `boolean` | Whether the output is a big craftable (placed as a machine/furniture). |

### CraftingIngredient

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier for the ingredient item. |
| `name` | `string` | Display name of the ingredient. |
| `quantity` | `number` | Number of this ingredient required. |

## Query Methods

`CraftingQuery` extends `QueryBase` and inherits five terminal methods shared by all query builders:

| Method | Returns | Description |
| --- | --- | --- |
| `get()` | `CraftingRecipe[]` | Return all results as an array. |
| `first()` | `CraftingRecipe \| undefined` | Return the first result. |
| `find(id)` | `CraftingRecipe \| undefined` | Find a recipe by exact ID. |
| `findByName(name)` | `CraftingRecipe \| undefined` | Find a recipe by name (case-insensitive). |
| `count()` | `number` | Return the number of results. |

### Filter Methods

| Method | Returns | Description |
| --- | --- | --- |
| `byCategory(category)` | `CraftingQuery` | Filter recipes by category (case-insensitive exact match). |
| `bySource(source)` | `CraftingQuery` | Filter recipes by source string (case-insensitive partial match). |
| `findByOutputId(id)` | `CraftingRecipe \| undefined` | Find a single recipe by its output item ID. Returns `undefined` if not found. |

### Sort Methods

| Method | Returns | Description |
| --- | --- | --- |
| `sortByName(order?)` | `CraftingQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |
| `sortByCategory(order?)` | `CraftingQuery` | Sort alphabetically by category. Pass `'asc'` (default) or `'desc'`. |

## Examples

### List recipes by category

```js
import { crafting } from 'stardew-valley-data'

const lighting = crafting().byCategory('Lighting').sortByName().get()

lighting.forEach((r) => {
  console.log(`${r.name} — ${r.ingredients.map((i) => `${i.quantity}x ${i.name}`).join(', ')}`)
})
```

### Find recipes from a skill source

```js
import { crafting } from 'stardew-valley-data'

const farmingRecipes = crafting().bySource('farming').sortByName().get()

farmingRecipes.forEach((r) => {
  console.log(`${r.name} (${r.source})`)
})
```

### Look up a recipe by its output item

```js
import { crafting } from 'stardew-valley-data'

const recipe = crafting().findByOutputId('quality-sprinkler')

if (recipe) {
  console.log(`${recipe.name}:`)
  console.log(`  Produces: ${recipe.output.quantity}x ${recipe.output.name}`)
  console.log(`  Ingredients:`)
  recipe.ingredients.forEach((i) => {
    console.log(`    ${i.quantity}x ${i.name}`)
  })
}
```

### List all big craftable items

```js
import { crafting } from 'stardew-valley-data'

const bigCraftables = crafting().get().filter((r) => r.output.isBigCraftable)

bigCraftables.forEach((r) => {
  console.log(`${r.name} [${r.category}]`)
})
```

### Count recipes per category

```js
import { crafting } from 'stardew-valley-data'

const all = crafting().get()
const categories = new Map()

all.forEach((r) => {
  categories.set(r.category, (categories.get(r.category) ?? 0) + 1)
})

for (const [category, count] of categories) {
  console.log(`${category}: ${count} recipes`)
}
```

### Wrap a pre-filtered array

You can pass an existing `CraftingRecipe[]` array into the `crafting()` function to create a new query from it:

```js
import { crafting } from 'stardew-valley-data'

const myList = crafting().byCategory('Fencing').get()
const sorted = crafting(myList).sortByName('desc').get()
```
