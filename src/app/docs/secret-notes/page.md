---
title: Secret Notes
nextjs:
  metadata:
    title: Secret Notes
    description: Query Stardew Valley secret notes and Ginger Island journal scraps with descriptions and type filtering.
---

Access the complete dataset of secret notes and journal scraps with typed descriptions and type filtering using the chainable `SecretNoteQuery` API. {% .lead %}

## Quick Start

```js
import { secretNotes } from 'stardew-valley-data'

// Get all secret notes and journal scraps
const all = secretNotes().get()

// Get only Secret Notes (found in The Valley)
const notes = secretNotes().notes().get()

// Get only Journal Scraps (found on Ginger Island)
const scraps = secretNotes().journalScraps().get()

// Find a specific note by name
const note = secretNotes().findByName('Secret Note #1')
```

## Type Definition

Each secret note record conforms to the `SecretNote` interface:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier for the note. |
| `name` | `string` | Display name of the note or scrap. |
| `type` | `SecretNoteType` | The type of note (see below). |
| `description` | `string` | The text content of the note. |

### SecretNoteType

| Value | Description |
| --- | --- |
| `'secret-note'` | Secret Notes found in The Valley. |
| `'journal-scrap'` | Journal Scraps found on Ginger Island. |

## Query Methods

`SecretNoteQuery` extends `QueryBase` and inherits five terminal methods shared by all query builders:

| Method | Returns | Description |
| --- | --- | --- |
| `get()` | `SecretNote[]` | Return all results as an array. |
| `first()` | `SecretNote \| undefined` | Return the first result. |
| `find(id)` | `SecretNote \| undefined` | Find a note by exact ID. |
| `findByName(name)` | `SecretNote \| undefined` | Find a note by name (case-insensitive). |
| `count()` | `number` | Return the number of results. |

### Filter Methods

| Method | Returns | Description |
| --- | --- | --- |
| `byType(type)` | `SecretNoteQuery` | Filter to notes of the given type. Accepts `'secret-note'` or `'journal-scrap'`. |
| `notes()` | `SecretNoteQuery` | Shorthand for `byType('secret-note')`. Returns Secret Notes only. |
| `journalScraps()` | `SecretNoteQuery` | Shorthand for `byType('journal-scrap')`. Returns Journal Scraps only. |

## Examples

### List all Secret Notes

```js
import { secretNotes } from 'stardew-valley-data'

const notes = secretNotes().notes().get()

notes.forEach((note) => {
  console.log(`${note.name}: ${note.description}`)
})
```

### List all Journal Scraps

```js
import { secretNotes } from 'stardew-valley-data'

const scraps = secretNotes().journalScraps().get()

scraps.forEach((scrap) => {
  console.log(`${scrap.name}: ${scrap.description}`)
})
```

### Count notes by type

```js
import { secretNotes } from 'stardew-valley-data'

const noteCount = secretNotes().notes().count()
const scrapCount = secretNotes().journalScraps().count()

console.log(`Secret Notes: ${noteCount}`)
console.log(`Journal Scraps: ${scrapCount}`)
console.log(`Total: ${secretNotes().count()}`)
```

### Find a specific note

```js
import { secretNotes } from 'stardew-valley-data'

const note = secretNotes().find('secret-note-10')

if (note) {
  console.log(`${note.name} (${note.type})`)
  console.log(note.description)
}
```

### Wrap a pre-filtered array

You can pass an existing `SecretNote[]` array into the `secretNotes()` function to create a new query from it:

```js
import { secretNotes } from 'stardew-valley-data'

const myList = secretNotes().notes().get()
const reWrapped = secretNotes(myList).count()
```
