---
title: Shops
nextjs:
  metadata:
    title: Shops
    description: Overview of all 20 shop modules in stardew-valley-data with shared query patterns, filter methods, and sort methods.
---

Query stock data for every shop and vendor in Stardew Valley using a consistent, chainable query builder API. {% .lead %}

## Shared Query Pattern

Every shop module exports a **factory function** that returns a typed query builder. The query builder follows an immutable, chainable pattern -- each filter or sort method returns a new query instance, and a **terminal method** extracts the results.

```js
import { pierre } from 'stardew-valley-data'

const items = pierre() // create a query for all Pierre items
  .bySeason('spring') // filter (returns new query)
  .sortByPrice('asc') // sort (returns new query)
  .get() // terminal -- returns PierreItem[]
```

Every factory function also accepts an optional pre-filtered array so you can wrap existing data in a new query:

```js
const myItems = pierre().seeds().get()
const sorted = pierre(myItems).sortByName().get()
```

## Terminal Methods

All query builders extend `QueryBase` and inherit these five terminal methods:

| Method             | Returns          | Description                                          |
| ------------------ | ---------------- | ---------------------------------------------------- |
| `get()`            | `T[]`            | Return all matching items as an array.               |
| `first()`          | `T \| undefined` | Return the first matching item.                      |
| `find(id)`         | `T \| undefined` | Find an item by its exact ID string.                 |
| `findByName(name)` | `T \| undefined` | Find an item by name (case-insensitive exact match). |
| `count()`          | `number`         | Return the number of matching items.                 |

## Common Filter Methods

Many shops share similar filter methods. The exact set varies per shop, but common ones include:

| Method                 | Description                                                                     |
| ---------------------- | ------------------------------------------------------------------------------- |
| `bySeason(season)`     | Filter to items available in the given season (shops with seasonal stock).      |
| `byCategory(category)` | Filter by the shop's category type.                                             |
| `permanent()`          | Filter to year-round permanent stock only.                                      |
| `alwaysAvailable()`    | Filter to items with no special purchase condition.                             |
| `recipes()`            | Filter to recipe items only (where applicable).                                 |
| `byDay(day)`           | Filter to items available on a specific day of the week (rotating stock shops). |

## Common Sort Methods

| Method                | Description                                                               |
| --------------------- | ------------------------------------------------------------------------- |
| `sortByPrice(order?)` | Sort by gold price ascending (`'asc'`, default) or descending (`'desc'`). |
| `sortByName(order?)`  | Sort alphabetically by item name ascending or descending.                 |

Some shops have additional sort methods specific to their data (e.g., `sortByMineLevel`, `sortByFishingLevel`, `sortByTradeAmount`).

## All Shops

| Shop                                             | Import                                | Description                                                           |
| ------------------------------------------------ | ------------------------------------- | --------------------------------------------------------------------- |
| [Blacksmith](/docs/shops-blacksmith)             | `blacksmith`                          | Ores, coal, and tool upgrade materials from Clint.                    |
| [Bookseller](/docs/shops-bookseller)             | `booksellerShop` / `booksellerTrades` | Books for purchase and trade-in offers from the traveling Bookseller. |
| [Carpenter](/docs/shops-carpenter)               | `carpenter`                           | Building materials, recipes, and furniture from Robin.                |
| [Casino](/docs/shops-casino)                     | `casino`                              | Furniture, hats, and consumables purchased with Qi Coins.             |
| [Desert Trader](/docs/shops-desert-trader)       | `desertTrader`                        | Barter trades in the Calico Desert.                                   |
| [Dwarf](/docs/shops-dwarf)                       | `dwarfShop`                           | Bombs, consumables, and recipes from the Dwarf in the Mines.          |
| [Adventurer's Guild](/docs/shops-guild)          | `guild`                               | Weapons, boots, rings, and slingshots from Marlon.                    |
| [Island Trader](/docs/shops-island-trader)       | `islandTrader`                        | Barter trades on Ginger Island.                                       |
| [Joja Mart](/docs/shops-joja)                    | `joja`                                | Seeds and supplies from JojaMart.                                     |
| [Krobus](/docs/shops-krobus)                     | `krobus`                              | Unique items from the shadow merchant in the sewers.                  |
| [Marnie's Ranch](/docs/shops-marnie)             | `marnie`                              | Animal supplies, tools, and furniture from Marnie.                    |
| [Medical Supplies](/docs/shops-medical-supplies) | `medicalSupplies`                     | Healing items from Harvey's Clinic.                                   |
| [Oasis](/docs/shops-oasis)                       | `oasis`                               | Seeds, food, and clothing from Sandy in the Calico Desert.            |
| [Pierre's General Store](/docs/shops-pierre)     | `pierre`                              | Seeds, saplings, ingredients, fertilizers, and recipes.               |
| [Qi's Walnut Room](/docs/shops-qi)               | `qiStock`                             | End-game items purchased with Qi Gems and Golden Walnuts.             |
| [Stardrop Saloon](/docs/shops-saloon)            | `saloon`                              | Food, drinks, and cooking recipes from Gus.                           |
| [Volcano Dungeon](/docs/shops-volcano)           | `volcanoShop`                         | Gear and consumables from the Volcano Dungeon Dwarf.                  |
| [Willy's Fish Shop](/docs/shops-willy)           | `willy`                               | Fishing rods, bait, tackle, and equipment from Willy.                 |
| [Wizard's Tower](/docs/shops-wizard)             | `wizard`                              | Magical buildings and constructions from the Wizard.                  |
