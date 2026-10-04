---
title: Change Log
nextjs:
  metadata:
    title: stardew-valley-data - Change Log
    description: See what has changed from release to release in stardew-valley-data.
---

This page summarizes recent releases. See the full [CHANGELOG.md](https://github.com/chiefpansancolt/stardew-valley-data/blob/main/CHANGELOG.md) on GitHub for the complete history. {% .lead %}

---

## Version [1.1.1](https://github.com/chiefpansancolt/stardew-valley-data/releases/tag/v1.1.1)

### Changed

Tooling and dependency updates only, with no changes to the data or the API. The project moved to
pnpm 12, the publish workflow now releases to npm with trusted publishing, and development
dependencies were bumped.

## Version [1.1.0](https://github.com/chiefpansancolt/stardew-valley-data/releases/tag/v1.1.0)

### Changed

All dependencies updated to their latest in-range versions, including `fast-xml-parser`, `eslint`,
`jest`, `prettier`, `ts-jest`, `tsx`, `typescript` 6.0.3, and `@typescript-eslint`. GitHub Actions
were updated as well.

## Version [1.0.1](https://github.com/chiefpansancolt/stardew-valley-data/releases/tag/v1.0.1)

### Fixed

`parseFishingRod` now resolves the rod tier by `itemId` instead of `name`. Older save files set
every fishing rod name to `"Fishing Rod"`, which made every rod fall back to an unknown level. Both
old and new saves now identify the rod correctly.

## Version [1.0.0](https://github.com/chiefpansancolt/stardew-valley-data/releases/tag/v1.0.0)

### Added

The `rarecrows` module, with a `rarecrows()` factory that exposes all 8 rarecrows and a
`sortByNumber()` sort method. Save file parsing gained `SaveData.rarecrows`, which lists every
placed rarecrow, including those stored inside chests and building interiors.

---

## Keeping up to date

This package tracks Stardew Valley updates closely. Watch the [GitHub repository](https://github.com/chiefpansancolt/stardew-valley-data)
for release notifications.
