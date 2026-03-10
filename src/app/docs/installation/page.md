---
title: Installation
nextjs:
  metadata:
    title: Installation
    description: Install stardew-valley-data and start importing Stardew Valley game data into your project.
---

Get up and running with stardew-valley-data in your JavaScript or TypeScript project in under a minute. {% .lead %}

---

## Install the package

Install with your preferred package manager:

### npm

```shell
npm install stardew-valley-data
```

### Yarn

```shell
yarn add stardew-valley-data
```

### pnpm

```shell
pnpm add stardew-valley-data
```

---

## Basic imports

### Named imports

Import individual factory functions and types directly from the package:

```ts
import { crops, fish, villagers } from 'stardew-valley-data'

const allCrops = crops().get()
const catfish = fish().findByName('Catfish')
const marriageable = villagers().marriageable().get()
```

This is the recommended approach for most use cases. Tree-shaking-friendly bundlers will only include the modules you actually use.

### Namespace import

If you prefer, you can import the entire package as a namespace:

```ts
import * as sdv from 'stardew-valley-data'

const springCrops = sdv.crops().bySeason('spring').get()
const search = sdv.search('Parsnip')
```

### Type-only imports

When you only need types for annotations, use `import type`:

```ts
import type { Crop, Fish, Season } from 'stardew-valley-data'

function displayCrop(crop: Crop): string {
  return `${crop.name} (${crop.seasons.join(', ')})`
}
```

---

## Package exports map

The package exposes three entry points through its exports map:

| Entry point | Description | Example import |
| --- | --- | --- |
| `stardew-valley-data` | Main entry -- all query builders, types, utilities, and the save file parser | `import { crops } from 'stardew-valley-data'` |
| `stardew-valley-data/data/*` | Raw JSON data files for each module | `import cropsData from 'stardew-valley-data/data/crops'` |
| `stardew-valley-data/images/*` | Image assets (PNG files) for items, characters, and UI elements | Referenced via file path in bundlers |

### Main entry point

The main entry point re-exports everything: factory functions for all 68 data modules, all TypeScript types, the `search()` utility, the `qualityCalculator()` utility, and the `parseSaveFile()` function.

```ts
import { crops, search, qualityCalculator, parseSaveFile } from 'stardew-valley-data'
```

### Direct data access

If you want the raw JSON arrays without the query builder wrapper, import directly from `stardew-valley-data/data/*`:

```ts
import cropsData from 'stardew-valley-data/data/crops'
import fishData from 'stardew-valley-data/data/fish'
```

See the [Direct data access](/docs/direct-data) page for the full list of available data paths.

### Image assets

Image files are available under `stardew-valley-data/images/*` for use in web applications, documentation, or tools:

```ts
// Path resolution depends on your bundler
import parsnipImage from 'stardew-valley-data/images/crops/Parsnip.png'
```

See the [Image assets](/docs/images) page for details on available image categories and usage patterns.

---

## Requirements

- **Node.js** 18 or later
- **TypeScript** 5.0 or later (optional, but recommended)

The package ships with full TypeScript declarations. No additional `@types` package is needed.

---

## Next steps

- Learn the [core concepts](/docs/core-concepts) behind the query builder pattern
- Explore the [query builder](/docs/query-builder) API for filtering and sorting data
- See [TypeScript integration](/docs/typescript) for type usage and type guards
