## Part One

### User Story 1

```
As a member of the public
So I can order a bagel when I want to
I'd like to add an item to my basket

# Method: AddToBasket()

# Input: sku(@object)

# Data: sku: @string, price: @number, name: @string, variant: @string, discount: @string, saving: @number

# Scenario: if sku exists in menu || as lon as basket is not full

# Output: basket[{item, ...}]
```

---

### User Story 2

```
As a member of the public,
So that I can change my order
I'd like to remove an item from my basket

# Method: RemoveItems()

# Input: sku(@string)

# Scenario: if valid sku in the basket => basket[item1, item2]

# Output: basket[item1] || basket[]
```

---

## Part Two

### User Story 1

```
As a member of the public,
So that I can not overfill my small bagel basket
I'd like to know when my basket is full when I try adding an item beyond my basket capacity.

# Method: addToBasket()

# Input: null

# Scenario: if basket is full

# Output: throw error 'Basket is full'
```

---

### User Story 2

```
As a Bob's Bagels manager,
So that I can record more sales
I’d like to create baskets with larger capacity when I need to.

# Method: increaseBasketCapacity()

# Input: null

# Scenario: if basket is full (basketCapacity = 4)

# Output: increase basketCapacity (basketCapacity = 6)
```

---

### User Story 3

```
As a member of the public
So that I can maintain my sanity
I'd like to know if I try to remove an item that doesn't exist in my basket. In the same way, I want to know if I try to add an item with the same ID already in my basket.

# Method: removeItem(sku)

# Input: sku(@string)

# Scenario: if basket is empty

# Output: trow error "Cannot remove item from empty basket"
```

## Part Three

### User Story 1

```
As a member of the public,
So that I can know how much my bagels are,
I’d like to see the price of each item before I add it to my basket.

# Method: checkPrice(sku)

# Input: sku(@string)

# Scenario: if valid sku slected from menu

# Output: return priceArray: priceArray([2.49, ])
```

### User Story 2

```
As a member of the public,
So that I can prepare to pay
When I go to checkout I'd like to know the total sum of the bagels in my basket

# Method: totalBasketPrice()

# Input: totalPrice(@number)

# Scenario: if discounted price

# Output: return discounted total price or return total price: priceArray[20.99]
```
