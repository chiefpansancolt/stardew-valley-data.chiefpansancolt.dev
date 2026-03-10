---
title: Lost Books
nextjs:
  metadata:
    title: Lost Books
    description: Query Stardew Valley Lost Book data found in the library museum including names, descriptions, and images.
---

Access the complete dataset of Lost Books found in Stardew Valley with typed name, description, and image information using the `LostBookQuery` API. {% .lead %}

## Quick Start

```js
import { lostBooks } from 'stardew-valley-data'

// Get all lost books
const all = lostBooks().get()

// Find a specific book by name
const book = lostBooks().findByName('Tips on Farming')

// Count total lost books
const total = lostBooks().count()

// Get the first book
const first = lostBooks().first()
```

## Type Definition

Each lost book record conforms to the `LostBook` interface:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier for the book. |
| `name` | `string` | Title of the lost book. |
| `description` | `string` | The text content of the book. |
| `image` | `string` | Path to the book image. |

## Query Methods

`LostBookQuery` extends `QueryBase` and inherits five terminal methods shared by all query builders:

| Method | Returns | Description |
| --- | --- | --- |
| `get()` | `LostBook[]` | Return all results as an array. |
| `first()` | `LostBook \| undefined` | Return the first result. |
| `find(id)` | `LostBook \| undefined` | Find a book by exact ID. |
| `findByName(name)` | `LostBook \| undefined` | Find a book by name (case-insensitive). |
| `count()` | `number` | Return the number of results. |

## Examples

### List all lost books

```js
import { lostBooks } from 'stardew-valley-data'

const all = lostBooks().get()

all.forEach((book) => {
  console.log(`${book.name}`)
})
```

### Read a specific book

```js
import { lostBooks } from 'stardew-valley-data'

const book = lostBooks().findByName('Tips on Farming')

if (book) {
  console.log(`Title: ${book.name}`)
  console.log(`Content: ${book.description}`)
}
```

### Find a book by ID

```js
import { lostBooks } from 'stardew-valley-data'

const book = lostBooks().find('lost-book-1')

if (book) {
  console.log(`${book.name}: ${book.description}`)
}
```

### Wrap a pre-filtered array

You can pass an existing `LostBook[]` array into the `lostBooks()` function to create a new query from it:

```js
import { lostBooks } from 'stardew-valley-data'

const myList = lostBooks().get()
const reWrapped = lostBooks(myList).count()
```
