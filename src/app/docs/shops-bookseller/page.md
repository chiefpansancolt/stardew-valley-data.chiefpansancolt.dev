---
title: Bookseller
nextjs:
  metadata:
    title: Bookseller
    description: Query Bookseller shop items and trade-in offers including availability tiers and book trades.
---

Access the traveling Bookseller's purchasable books and trade-in offers using the chainable `BooksellerItemQuery` and `BooksellerTradeQuery` APIs. {% .lead %}

## Quick Start

```js
import { booksellerShop, booksellerTrades } from 'stardew-valley-data'

// Get all books for sale
const allBooks = booksellerShop().get()

// Get always-available books sorted by price
const available = booksellerShop().alwaysAvailable().sortByPrice().get()

// Get all trade-in offers
const trades = booksellerTrades().get()
```

## Type Definitions

### BooksellerItem

Each purchasable book conforms to the `BooksellerItem` interface:

| Field          | Type                                    | Description                     |
| -------------- | --------------------------------------- | ------------------------------- |
| `id`           | `string`                                | Unique identifier.              |
| `name`         | `string`                                | Display name of the book.       |
| `availability` | `BooksellerAvailability`                | When the book appears in stock. |
| `price`        | `number`                                | Base purchase price in gold.    |
| `priceTiers`   | `[number, number, number] \| undefined` | Optional tiered pricing array.  |
| `image`        | `string`                                | Path to the book's image.       |

### BooksellerAvailability

```ts
type BooksellerAvailability =
  | 'always'
  | 'rotating-skill'
  | 'rotating-year3'
  | 'chance'
  | 'golden-walnut'
```

### BooksellerTrade

Each trade-in offer conforms to the `BooksellerTrade` interface:

| Field             | Type       | Description                         |
| ----------------- | ---------- | ----------------------------------- |
| `bookId`          | `string`   | ID of the book being traded.        |
| `bookName`        | `string`   | Display name of the book.           |
| `bookImage`       | `string`   | Path to the book's image.           |
| `receiveItems`    | `string[]` | Item names you receive in exchange. |
| `receiveQuantity` | `number`   | Quantity of items received.         |

## Query Methods

### BooksellerItemQuery

`BooksellerItemQuery` extends `QueryBase` and inherits five terminal methods:

| Method             | Returns                       | Description                             |
| ------------------ | ----------------------------- | --------------------------------------- |
| `get()`            | `BooksellerItem[]`            | Return all results as an array.         |
| `first()`          | `BooksellerItem \| undefined` | Return the first result.                |
| `find(id)`         | `BooksellerItem \| undefined` | Find a book by exact ID.                |
| `findByName(name)` | `BooksellerItem \| undefined` | Find a book by name (case-insensitive). |
| `count()`          | `number`                      | Return the number of results.           |

#### Filter Methods

| Method                         | Returns               | Description                                       |
| ------------------------------ | --------------------- | ------------------------------------------------- |
| `byAvailability(availability)` | `BooksellerItemQuery` | Filter to books with the given availability type. |
| `alwaysAvailable()`            | `BooksellerItemQuery` | Filter to books that are always in stock.         |

#### Sort Methods

| Method                | Returns               | Description                                                      |
| --------------------- | --------------------- | ---------------------------------------------------------------- |
| `sortByPrice(order?)` | `BooksellerItemQuery` | Sort by price. Pass `'asc'` (default) or `'desc'`.               |
| `sortByName(order?)`  | `BooksellerItemQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |

### BooksellerTradeQuery

| Method                 | Returns                        | Description                                        |
| ---------------------- | ------------------------------ | -------------------------------------------------- |
| `get()`                | `BooksellerTrade[]`            | Return all trade-in offers.                        |
| `count()`              | `number`                       | Return the number of trade-in offers.              |
| `findByBookId(bookId)` | `BooksellerTrade \| undefined` | Find a trade-in offer by the book ID being traded. |

## Examples

### List rotating books by availability

```js
import { booksellerShop } from 'stardew-valley-data'

const rotating = booksellerShop().byAvailability('rotating-skill').get()

rotating.forEach((book) => {
  console.log(`${book.name} - ${book.price}g`)
})
```

### Look up a trade-in offer

```js
import { booksellerTrades } from 'stardew-valley-data'

const trade = booksellerTrades().findByBookId('book_of_stars')

if (trade) {
  console.log(
    `Trade ${trade.bookName} for ${trade.receiveQuantity}x ${trade.receiveItems.join(', ')}`,
  )
}
```
