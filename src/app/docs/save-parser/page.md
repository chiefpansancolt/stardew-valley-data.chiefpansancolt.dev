---
title: Save file parser
nextjs:
  metadata:
    title: Save file parser
    description: Parse Stardew Valley XML save files into structured TypeScript data with the save file parser.
---

The save file parser reads Stardew Valley XML save files and returns a fully-typed `SaveData` object containing player info, inventory, friendships, collections, and more. {% .lead %}

---

## Basic usage

Import `parseSaveFile` and pass the raw XML string from a save file:

```ts
import { parseSaveFile } from 'stardew-valley-data'
import { readFileSync } from 'fs'

const xml = readFileSync('/path/to/SaveGameInfo', 'utf-8')
const save = parseSaveFile(xml)

console.log(`Player: ${save.player.name}`)
console.log(`Farm: ${save.player.farmName}`)
console.log(`Money: ${save.player.money}g`)
console.log(`Day ${save.date.day} of ${save.date.season}, Year ${save.date.year}`)
```

---

## The `parseSaveFile()` function

```ts
function parseSaveFile(xml: string): SaveData
```

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `xml` | `string` | The raw XML content of a Stardew Valley save file |

### Returns

A `SaveData` object containing all parsed game data. The API version is automatically resolved from the game version found in the save file.

### How it works

1. Parses the XML using `fast-xml-parser`
2. Reads the `gameVersion` field from the save data
3. Resolves the appropriate API version using `resolveApiVersion()`
4. Applies the matching versioned parser set to extract structured data
5. Returns a complete `SaveData` object

---

## The `resolveApiVersion()` function

```ts
function resolveApiVersion(gameVersion: string): number
```

Maps a game version string (e.g., `"1.6.14"`) to the corresponding API version number. If no matching version range is found, it returns `LATEST_API_VERSION` as a forward-compatible default.

```ts
import { resolveApiVersion, LATEST_API_VERSION } from 'stardew-valley-data'

const version = resolveApiVersion('1.6.14')
console.log(version) // 1

console.log(LATEST_API_VERSION) // 1
```

### Version ranges

Version ranges map game versions to parser API versions. Currently, one range is defined:

| Game version | API version |
| --- | --- |
| 1.0.0+ | 1 |

As future game updates change save file formats, new API versions and parser sets will be added. The `LATEST_API_VERSION` constant always reflects the highest supported version.

---

## The `VersionRange` type

```ts
interface VersionRange {
  minVersion: string
  maxVersion: string | null
  apiVersion: number
}
```

| Field | Type | Description |
| --- | --- | --- |
| `minVersion` | `string` | Minimum game version (inclusive) in semver format |
| `maxVersion` | `string \| null` | Maximum game version (inclusive), or `null` for open-ended |
| `apiVersion` | `number` | The parser API version to use for this range |

---

## SaveData type

The `SaveData` type is the top-level return type containing all extracted game data:

```ts
interface SaveData {
  apiVersion: number
  player: SavePlayer
  farm: SaveFarm
  date: SaveDate
  inventory: SaveItem[]
  fishCaught: SaveFishEntry[]
  itemsShipped: SaveShippedEntry[]
  museum: SaveMuseum
  friendships: SaveFriendship[]
  achievements: number[]
  activeQuests: SaveQuest[]
  stardrops: SaveStardropEntry[]
  stats: SaveStats
  animals: SaveAnimal[]
  buildings: SaveBuilding[]
  cookingRecipes: SaveRecipeEntry[]
  craftingRecipes: SaveRecipeEntry[]
  bundles: SaveBundleData
  monstersKilled: SaveMonsterKillEntry[]
  mail: string[]
  specialOrders: SaveSpecialOrders
  professions: SaveProfession[]
  booksRead: string[]
  eventsSeen: string[]
  secretNotes: SaveSecretNotes
  walnuts: SaveWalnuts
  islandUpgrades: SaveIslandUpgrades
  children: SaveChild[]
  pet: SavePet | null
  powers: SavePowers
  raccoons: SaveRaccoons
  perfection: SavePerfection
  mineProgress: SaveMineProgress
}
```

---

## Key sub-types

### SavePlayer

Core player profile including name, money, skills, and mastery progress.

```ts
interface SavePlayer {
  name: string
  farmName: string
  favoriteThing: string
  gender: string
  money: number
  totalMoneyEarned: number
  spouse: string | null
  houseUpgradeLevel: number
  maxHealth: number
  maxStamina: number
  skills: SaveSkills
  mastery: SaveMastery
  gameVersion: string
}
```

### SaveDate

```ts
interface SaveDate {
  year: number
  season: Season          // 'spring' | 'summer' | 'fall' | 'winter' | 'ginger island'
  day: number
  totalDaysPlayed: number
}
```

### SaveSkills

```ts
interface SaveSkills {
  farming: SaveSkillLevel
  fishing: SaveSkillLevel
  foraging: SaveSkillLevel
  mining: SaveSkillLevel
  combat: SaveSkillLevel
}

interface SaveSkillLevel {
  level: number
  xp: number
}
```

### SaveItem

```ts
interface SaveItem {
  id: string
  name: string
  type: string
  stack: number
  quality: number
}
```

### SaveFriendship

```ts
interface SaveFriendship {
  name: string
  points: number
  hearts: number
  status: string
  giftsThisWeek: number
}
```

### SaveBundleData

```ts
interface SaveBundleData {
  bundles: SaveBundleStatus[]
  rooms: SaveBundleRoom[]
  isJojaRoute: boolean
  isCCComplete: boolean
}
```

### SaveStats

```ts
interface SaveStats {
  daysPlayed: number
  stepsTaken: number
  fishCaught: number
  itemsShipped: number
  itemsForaged: number
  itemsCrafted: number
  itemsCooked: number
  monstersKilled: number
  questsCompleted: number
  geodesCracked: number
  giftsGiven: number
  timesFished: number
  timesUnconscious: number
  seedsSown: number
  treesChopped: number
  rocksCrushed: number
  raw: Record<string, number>   // Full raw stats dictionary
}
```

### SavePerfection

```ts
interface SavePerfection {
  farmPerfect: boolean
  waivers: number
  hasGoldClock: boolean
  obelisks: string[]
}
```

### SaveMineProgress

```ts
interface SaveMineProgress {
  deepestMineLevel: number
  deepestSkullCavernLevel: number
  hasRustyKey: boolean
  hasSkullKey: boolean
}
```

---

## Practical examples

### Reading a save file from disk (Node.js)

```ts
import { parseSaveFile } from 'stardew-valley-data'
import { readFileSync } from 'fs'
import { join } from 'path'

// Default save location on Windows
const savePath = join(
  process.env.APPDATA!,
  'StardewValley/Saves/FarmName_123456789/FarmName_123456789'
)

const xml = readFileSync(savePath, 'utf-8')
const save = parseSaveFile(xml)
```

### Reading a save file from a browser upload

```ts
import { parseSaveFile } from 'stardew-valley-data'

async function handleFileUpload(file: File) {
  const xml = await file.text()
  const save = parseSaveFile(xml)

  console.log(`Welcome, ${save.player.name}!`)
  console.log(`Year ${save.date.year}, ${save.date.season} ${save.date.day}`)
  console.log(`Total earnings: ${save.player.totalMoneyEarned}g`)
}
```

### Displaying player progress

```ts
import { parseSaveFile } from 'stardew-valley-data'

function displayProgress(xml: string) {
  const save = parseSaveFile(xml)

  // Skills
  const { skills } = save.player
  console.log('Skills:')
  console.log(`  Farming:  ${skills.farming.level} (${skills.farming.xp} XP)`)
  console.log(`  Fishing:  ${skills.fishing.level} (${skills.fishing.xp} XP)`)
  console.log(`  Foraging: ${skills.foraging.level} (${skills.foraging.xp} XP)`)
  console.log(`  Mining:   ${skills.mining.level} (${skills.mining.xp} XP)`)
  console.log(`  Combat:   ${skills.combat.level} (${skills.combat.xp} XP)`)

  // Friendships
  console.log(`\nFriendships (${save.friendships.length} villagers):`)
  save.friendships
    .sort((a, b) => b.hearts - a.hearts)
    .slice(0, 5)
    .forEach(f => console.log(`  ${f.name}: ${f.hearts} hearts (${f.status})`))

  // Collections
  console.log(`\nMuseum donations: ${save.museum.donations.length}`)
  console.log(`Fish caught: ${save.fishCaught.length} species`)
  console.log(`Items shipped: ${save.itemsShipped.length} types`)

  // Bundles
  const completedBundles = save.bundles.bundles.filter(b => b.complete).length
  const totalBundles = save.bundles.bundles.length
  console.log(`\nBundles: ${completedBundles}/${totalBundles}`)
  console.log(`Community Center complete: ${save.bundles.isCCComplete}`)
  console.log(`Joja route: ${save.bundles.isJojaRoute}`)
}
```

### Checking perfection progress

```ts
import { parseSaveFile } from 'stardew-valley-data'

function checkPerfection(xml: string) {
  const save = parseSaveFile(xml)
  const { perfection, mineProgress, walnuts } = save

  console.log('Perfection Progress:')
  console.log(`  Farm perfect: ${perfection.farmPerfect}`)
  console.log(`  Gold clock: ${perfection.hasGoldClock}`)
  console.log(`  Obelisks: ${perfection.obelisks.join(', ') || 'none'}`)
  console.log(`  Waivers used: ${perfection.waivers}`)
  console.log(`  Deepest mine level: ${mineProgress.deepestMineLevel}`)
  console.log(`  Deepest skull cavern: ${mineProgress.deepestSkullCavernLevel}`)
  console.log(`  Golden walnuts: ${walnuts.found}`)
}
```

---

## All exported save types

The following types are all importable from `'stardew-valley-data'`:

| Type | Description |
| --- | --- |
| `SaveData` | Top-level parsed save file |
| `SavePlayer` | Player profile with skills and mastery |
| `SaveFarm` | Farm type and name |
| `SaveDate` | In-game date |
| `SaveSkills` / `SaveSkillLevel` | Skill levels and XP |
| `SaveMastery` / `SaveMasteryPerk` | Mastery XP and perk unlocks |
| `SaveItem` | Inventory item |
| `SaveFishEntry` | Caught fish record |
| `SaveShippedEntry` | Shipped item record |
| `SaveMuseum` / `SaveCollectionEntry` | Museum donations and collections |
| `SaveFriendship` | NPC friendship data |
| `SaveAnimal` | Farm animal |
| `SaveBuilding` | Farm building |
| `SaveQuest` | Active quest |
| `SaveStardropEntry` | Stardrop collection status |
| `SaveRecipeEntry` | Known recipe |
| `SaveBundleData` / `SaveBundleStatus` / `SaveBundleRoom` / `SaveBundleItem` / `SaveBundleReward` | Bundle data |
| `SaveMonsterKillEntry` | Monster kill counts |
| `SaveSpecialOrders` | Special order progress |
| `SaveProfession` | Chosen profession |
| `SaveSecretNotes` | Secret notes and journal scraps |
| `SaveWalnuts` | Golden walnut progress |
| `SaveIslandUpgrades` | Ginger Island unlocks |
| `SaveChild` | Player's child |
| `SavePet` | Player's pet |
| `SavePowers` / `SavePowerEntry` | Powers and special items |
| `SaveRaccoons` | Raccoon quest progress |
| `SavePerfection` | Perfection tracker |
| `SaveMineProgress` | Mine and Skull Cavern progress |
| `SaveStats` | Lifetime gameplay statistics |
| `VersionRange` | Game version to API version mapping |

---

## Next steps

- See [TypeScript integration](/docs/typescript) for general type usage
- Learn about the [search utility](/docs/search) for finding items by name or ID
- Explore the [quality calculator](/docs/calculator) for item price calculations
