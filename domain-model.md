## Requirement Part 1

As a member of the public,
So I can order a bagel when I want to,
I'd like to add an item to my basket,

As a member of the public,
So that I can change my order,
I'd like to remove an item from my basket,

## Noun & Verb

Noun: bagel(item), basket, order
Verb: order, add, change, remove

## Domain Model

| Objects     | Properties           |
| ----------- | -------------------- |
| sku         | @String              |
| basketArray | @Array[Object @menu] |

| Methods           | Output                                                |
| ----------------- | ----------------------------------------------------- |
| addToBasket(@sku) | no output or @String "WARNING - Basket is full"       |
| removeItems(@sku) | no output or @String "That item isn't in your basket" |

---

## Requirement Part 2

As a member of the public,
So that I can not overfill my small bagel basket,
I'd like to know when my basket is full when I try adding an item beyond my basket capacity.

As a Bob's Bagels manager,
So that I can record more sales,
I’d like to create baskets with larger capacity when I need to.

As a member of the public
So that I can maintain my sanity
I'd like to know if I try to remove an item that doesn't exist in my basket.

## Noun & Verb

Noun: basket, item, basket capacity, larger capacity
Verb: cannot overfill, is full, add, create baskets, remove

## Domain Model

| Objects    | Properties |
| ---------- | ---------- |
| basketSize | @Number    |

| Methods                  | Output    |
| ------------------------ | --------- |
| increaseBasketSize(size) | no output |

---

## Requirement Part 3

As a member of the public,
So that I can know how much my bagels are,
I’d like to see the price of each item before I add it to my basket.

As a member of the public
So that I can buy many of my favorite bagel,
I'd like to be able to add the same type of bagel to my basket more than once.

As a member of the public,
So that I can prepare to pay,
When I go to checkout I'd like to know the total sum of the bagels in my basket.

## Noun & Verb

Noun: price of each item, total sum
Verb: see, add more than once, before adding to basket

## Domain Model

| Methods            | Output              |
| ------------------ | ------------------- |
| checkPrice(@sku)   | price @Number       |
| totalBasketPrice() | total price @Number |

## Extension 1

| Methods            | Output                    |
| ------------------ | ------------------------- |
| countQuantity()    | Object {sku: @Number}     |
| discountedAmount() | discounted amount @Number |
| finalPrice()       | final price @Number       |

- countQuantity() will iterate through basketArray, and create a object {sku: @Number}
- discountedAmount() will return the price that is going to be discounted
  -finalPrice(): subtracts discountedAmount from totalBasketPrice
