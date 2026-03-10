---
title: Special Orders
nextjs:
  metadata:
    title: Special Orders
    description: Query Stardew Valley special orders by type, requester, and repeatability with the SpecialOrderQuery API.
---

Access the full dataset of Stardew Valley special orders -- both town board and Mr. Qi challenges -- and filter by type, requester, or repeatability using the chainable `SpecialOrderQuery` API. {% .lead %}

## Quick Start

```js
import { specialOrders } from 'stardew-valley-data'

// Get all special orders
const all = specialOrders().get()

// Get only town board orders
const townOrders = specialOrders().byType('town').get()

// Get Mr. Qi's special orders
const qiOrders = specialOrders().byType('qi').get()

// Find repeatable orders
const repeatable = specialOrders().repeatable().get()
```

## Type Definition

Each special order record conforms to the `SpecialOrderData` interface:

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier for the special order. |
| `name` | `string` | Display name of the special order. |
| `requester` | `string` | Name of the NPC who requests the order. |
| `type` | `'town' \| 'qi'` | Whether this is a town board order or a Mr. Qi challenge. |
| `text` | `string` | Description or flavor text of the order. |
| `prerequisites` | `string \| null` | Any prerequisites that must be met before the order appears, or `null` if none. |
| `timeframe` | `number` | Number of days to complete the order. |
| `requirements` | `string` | What the player must do to complete the order. |
| `rewards` | `string` | What the player receives upon completion. |
| `repeatable` | `boolean` | Whether the order can be completed more than once. |

The `SpecialOrderCategory` type is defined as `'town' | 'qi'`.

## Query Methods

`SpecialOrderQuery` extends `QueryBase` and inherits five terminal methods shared by all query builders:

| Method | Returns | Description |
| --- | --- | --- |
| `get()` | `SpecialOrderData[]` | Return all results as an array. |
| `first()` | `SpecialOrderData \| undefined` | Return the first result. |
| `find(id)` | `SpecialOrderData \| undefined` | Find a special order by exact ID. |
| `findByName(name)` | `SpecialOrderData \| undefined` | Find a special order by name (case-insensitive). |
| `count()` | `number` | Return the number of results. |

### Filter Methods

| Method | Returns | Description |
| --- | --- | --- |
| `byType(type)` | `SpecialOrderQuery` | Filter by order type. Pass `'town'` or `'qi'`. |
| `byRequester(requester)` | `SpecialOrderQuery` | Filter by requester NPC name (case-insensitive exact match). |
| `repeatable()` | `SpecialOrderQuery` | Filter to only repeatable special orders. |

### Sort Methods

| Method | Returns | Description |
| --- | --- | --- |
| `sortByName(order?)` | `SpecialOrderQuery` | Sort alphabetically by name. Pass `'asc'` (default) or `'desc'`. |

## Examples

### List all town board orders

```js
import { specialOrders } from 'stardew-valley-data'

const townOrders = specialOrders()
  .byType('town')
  .sortByName()
  .get()

townOrders.forEach((o) => {
  console.log(`${o.name} — requested by ${o.requester} (${o.timeframe} days)`)
})
```

### Find all orders from a specific NPC

```js
import { specialOrders } from 'stardew-valley-data'

const orders = specialOrders().byRequester('Demetrius').get()

orders.forEach((o) => {
  console.log(`${o.name}: ${o.requirements}`)
  console.log(`Reward: ${o.rewards}`)
})
```

### Get repeatable Qi challenges

```js
import { specialOrders } from 'stardew-valley-data'

const repeatableQi = specialOrders()
  .byType('qi')
  .repeatable()
  .sortByName()
  .get()

repeatableQi.forEach((o) => {
  console.log(`${o.name} — ${o.rewards}`)
})
```

### Check prerequisites before accepting an order

```js
import { specialOrders } from 'stardew-valley-data'

const order = specialOrders().findByName('Island Ingredients')

if (order) {
  if (order.prerequisites) {
    console.log(`Prerequisites: ${order.prerequisites}`)
  } else {
    console.log('No prerequisites required.')
  }
  console.log(`Complete within: ${order.timeframe} days`)
}
```

### Wrap a pre-filtered array

```js
import { specialOrders } from 'stardew-valley-data'

const qiOrders = specialOrders().byType('qi').get()
const sorted = specialOrders(qiOrders).sortByName('desc').get()
```
