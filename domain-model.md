## Part One

```
# User Story 1
As a member of the public
So I can order a bagel when I want to
I'd like to add an item to my basket

# Method: AddToBasket()

# Input: sku(@object)

# Data: sku: @string, price: @number, name: @string, variant: string, discount: @string, saving: @number

# Scenario: if ske exists in menu || basket is not full

# Output: basket[{item, }]
```

---

```
# User Story 2
As a member of the public,
So that I can change my order
I'd like to remove an item from my basket

# Method: RemoveItems()

# Input: sku(@string)

# Scenario: if valid sku in the basket => basket[item1, item2]

# Output: basket[item1] || basket[]
```

<!-- ---

```
# User Story 2
As a member of the public,
So that I can change my order
I'd like to remove an item from my basket

# Method: RemoveItems()

# Input: sku(@string)

# Scenario: if valid sku in the basket => basket[item1, item2]

# Output: basket[item1] || basket[]
``` -->
