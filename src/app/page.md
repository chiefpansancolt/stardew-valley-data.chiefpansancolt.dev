---
title: Getting started
---

Documentation for the stardew-valley-data NPM package — a comprehensive, fully-typed dataset for Stardew Valley with structured JSON data, 1,900+ image assets, and a chainable query builder API. {% .lead %}

{% quick-links %}

{% quick-link title="Installation" icon="installation" href="/docs/installation" description="Install the package and start using Stardew Valley data in your project." /%}

{% quick-link title="Core concepts" icon="presets" href="/docs/core-concepts" description="Learn the query builder pattern, terminal methods, and chaining." /%}

{% quick-link title="Query builder" icon="plugins" href="/docs/query-builder" description="Filter, sort, and query any dataset with the chainable API." /%}

{% quick-link title="TypeScript" icon="theming" href="/docs/typescript" description="Full TypeScript support with typed exports, type guards, and generics." /%}

{% /quick-links %}

---

## Quick start

### Install the package

```shell
npm install stardew-valley-data
```

### Import and query data

```js
import { crops, fish, villagers } from 'stardew-valley-data'

// Get all summer crops
const summerCrops = crops().bySeason('summer').get()

// Find a specific fish
const catfish = fish().findByName('Catfish')

// Get all marriageable villagers
const singles = villagers().marriageable().get()
```

### Chain multiple filters

Every query builder supports chaining — combine filters and sorts in any order:

```js
import { crops } from 'stardew-valley-data'

const results = crops()
  .bySeason('summer')
  .regrowing()
  .sortBySellPrice('desc')
  .get()
```

---

## What's included

The package provides access to 68 data modules covering every aspect of Stardew Valley:

- **Farming** — Crops, trees, forageables, animals, artisan goods, seasons
- **Fishing & Mining** — Fish, bait, tackle, minerals, artifacts
- **Characters** — Villagers, gift preferences, events, quests
- **Skills** — Skills, professions, achievements, perfection tracking
- **Combat** — Monsters, weapons, rings, trinkets
- **Equipment** — Tools, footwear, hats, special items
- **World** — Buildings, locations, maps, golden walnuts
- **Collections** — Bundles, cooking, crafting, secret notes
- **Shops** — 20 in-game shops with full inventory data
- **Utilities** — Cross-module search, quality calculator, save file parser

---

## Getting help

### Submit an issue

Found a bug or have a feature request? Open an issue on the [GitHub repository](https://github.com/chiefpansancolt/stardew-valley-data/issues).

### View on GitHub

Check out the source code at [github.com/chiefpansancolt/stardew-valley-data](https://github.com/chiefpansancolt/stardew-valley-data).
