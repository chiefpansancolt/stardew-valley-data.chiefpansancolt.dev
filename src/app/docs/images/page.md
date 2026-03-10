---
title: Image assets
nextjs:
  metadata:
    title: Image assets
    description: Access 1,900+ Stardew Valley image assets including item sprites, character portraits, and UI icons.
---

The package includes over 1,900 PNG image assets covering items, characters, maps, and UI elements from Stardew Valley. {% .lead %}

---

## How images work

Image files are distributed with the package under the `images/` directory. Each data item that has a visual representation includes an `image` field containing the relative path to its image file.

```ts
import { crops } from 'stardew-valley-data'

const parsnip = crops().findByName('Parsnip')
console.log(parsnip?.image)
// "images/crops/Parsnip.png"
```

---

## Accessing images

### In a bundler (Webpack, Vite, etc.)

Most modern bundlers can resolve image imports from `node_modules`. Use the image path from the data item combined with the package name:

```ts
import { crops } from 'stardew-valley-data'

const crop = crops().findByName('Parsnip')
const imagePath = `stardew-valley-data/${crop.image}`
```

### In React

```tsx
import { crops } from 'stardew-valley-data'

function CropCard({ name }: { name: string }) {
  const crop = crops().findByName(name)
  if (!crop) return null

  return (
    <div>
      <img
        src={`/node_modules/stardew-valley-data/${crop.image}`}
        alt={crop.name}
      />
      <h3>{crop.name}</h3>
      <p>{crop.cropSellPrice}g</p>
    </div>
  )
}
```

### Copying images to your public directory

For production use, you may want to copy the images directory into your project's public/static folder during your build step:

```shell
# Copy all images to your public directory
cp -r node_modules/stardew-valley-data/images public/stardew-images
```

Then reference them with a simple path:

```tsx
<img src={`/stardew-images/crops/Parsnip.png`} alt="Parsnip" />
```

### In Next.js

If you are using Next.js, you can create a helper to resolve image paths:

```ts
function stardewImage(relativePath: string): string {
  return `/stardew-images/${relativePath.replace('images/', '')}`
}

// Usage
const crop = crops().findByName('Parsnip')
const src = stardewImage(crop.image)
// "/stardew-images/crops/Parsnip.png"
```

---

## Image categories

Images are organized into directories by category. The following categories are available:

| Directory | Content | Examples |
| --- | --- | --- |
| `images/crops/` | Crop item sprites and seed sprites | Parsnip.png, Melon Seeds.png |
| `images/trees/` | Tree sprites, saplings, and fruit | Apple Tree.png, Oak Tree.png |
| `images/fish/` | Fish sprites | Catfish.png, Pufferfish.png |
| `images/animals/` | Animal sprites (pets and farm animals) | Chicken.png, Cat.png |
| `images/villagers/` | Villager portraits | Penny.png, Abigail.png |
| `images/monsters/` | Monster sprites | Slime.png, Skeleton.png |
| `images/weapons/` | Weapon sprites | Galaxy Sword.png |
| `images/tools/` | Tool sprites at various upgrade levels | Watering Can.png |
| `images/hats/` | Hat sprites | Cowboy Hat.png |
| `images/footwear/` | Boot and shoe sprites | Sneakers.png |
| `images/rings/` | Ring sprites | Iridium Band.png |
| `images/trinkets/` | Trinket sprites | Parrot Egg.png |
| `images/minerals/` | Mineral, geode, ore, and gem sprites | Diamond.png, Geode.png |
| `images/artifacts/` | Artifact sprites | Rusty Sword.png |
| `images/artisan-goods/` | Artisan goods sprites | Wine.png, Cheese.png |
| `images/cooking/` | Cooked dish sprites | Pizza.png |
| `images/crafting/` | Crafted item sprites | Scarecrow.png |
| `images/bait/` | Bait sprites | Bait.png |
| `images/tackle/` | Tackle sprites | Spinner.png |
| `images/forageables/` | Forageable item sprites | Daffodil.png |
| `images/buildings/` | Farm building sprites | Barn.png, Coop.png |
| `images/maps/` | Map images | Farm.png |
| `images/seasons/` | Season icons and artwork | Spring.png |
| `images/misc/` | Quality icons and UI elements | Silver Quality.png, Gold Quality.png |

---

## Using image paths from data

Every data item with a visual representation has an `image` field. Some items have additional image fields:

| Field | Found on | Description |
| --- | --- | --- |
| `image` | Most items | Primary item sprite |
| `seedImage` | Crops, wild trees | Seed or sapling sprite |
| `saplingImage` | Fruit trees | Sapling sprite |
| `giantImage` | Crops (optional) | Giant crop sprite |
| `spouseImage` | Villagers (optional) | Spouse room sprite |
| `calendarIcon` | Festivals | Calendar icon sprite |

```ts
import { crops } from 'stardew-valley-data'

const melon = crops().findByName('Melon')
if (melon) {
  console.log(melon.image)       // "images/crops/Melon.png"
  console.log(melon.seedImage)   // "images/crops/Melon Seeds.png"
  console.log(melon.giantImage)  // "images/crops/Giant Melon.png" (if available)
}
```

---

## Quality icons

The quality calculator module references quality tier icons from the `images/misc/` directory:

| Quality | Icon path |
| --- | --- |
| Silver | `images/misc/Silver Quality.png` |
| Gold | `images/misc/Gold Quality.png` |
| Iridium | `images/misc/Iridium Quality.png` |

```ts
import { qualityCalculator } from 'stardew-valley-data'

const prices = qualityCalculator().sellPrices(250)
prices.forEach(p => {
  console.log(`${p.quality}: ${p.value}g (icon: ${p.icon})`)
})
```

---

## Next steps

- See [direct data access](/docs/direct-data) for importing raw JSON data
- Learn about the [quality calculator](/docs/calculator) which uses quality icons
- Explore the [search utility](/docs/search) to find items and their images across all modules
