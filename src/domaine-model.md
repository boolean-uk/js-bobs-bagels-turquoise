# Bobs Bagels Domain Models

## Part 1

```
As a member of the public
So I can order a bagel when I want to
I'd like to add an item to my basket
```

```
As a member of the public,
So that I can change my order
I'd like to remove an item from my basket
```

### Keywords

1. **Verbs:** order, add
2. **Nouns:** member, public, bagel, item, basket

### Table

| Methods | Inputs | Data | Scenario | Outputs
| ------ | ------ | ------ | ----- | ------
|addToBasket|(sku)|sku: sku:(@string), price:(@string), name:(@string), variant(@string), fillings(@string) |if sku is valid| add item to basket as a string
||||sku not valid|return "item not found"
||||no sku added| return "sku required"
|||||
|removeItem|(sku)|sku: sku:(@string), price:(@string), name:(@string), variant(@string), fillings(@string) |if sku is valid and in basket| remove item from basket
||||no sku added| return "sku required"


## Part 2

```
As a member of the public,
So that I can not overfill my small bagel basket
I'd like to know when my basket is full when I try adding an item beyond my basket capacity.
```

```
As a Bob's Bagels manager,
So that I can record more sales
I’d like to create baskets with larger capacity when I need to.
```

```
As a member of the public
So that I can maintain my sanity
I'd like to know if I try to remove an item that doesn't exist in my basket.
```

### Keywords

1. **Verbs:** overfill, know, adding, create, record
2. **Nouns:** public, bagel, basket, manager, sales, capacity

### Table

| Methods | Inputs | Data | Scenario | Outputs
| ------ | ------ | ------ | ----- | -----
|checkIfFull|()|quantity(@Number)|If basket equals to basket full max items| return "basket is full"
|||||
|changeBasketSize|(Size)|Size(@Number)|if changeBasketZise recieves a number| change the basket size allowance
||||if changeBasketSize does not revieve a number| return "error, set basket size"
|||||
|removeItem CONTINUED|(sku)|sku: sku:(@string), price:(@string), name:(@string), variant(@string), fillings(@string) |if sku does not exist in basket| return "false" and "item does not exist in basket"
||||if sku does exist in basket| return sku.


## Part 3

```
As a member of the public,
So that I can know how much my bagels are,
I’d like to see the price of each item before I add it to my basket.
```

```
As a member of the public
So that I can buy many of my favorite bagels
I'd like to be able to add the same type of bagel to my basket more than once
```

```
As a member of the public,
So that I can prepare to pay
When I go to checkout I'd like to know the total sum of the bagels in my basket
```

### Keywords

1. **Verbs:** know, see, add, buy, pay
2. **Nouns:** member, public, bagels, price, basket, checkout

### Table

| Methods | Inputs | Data | Scenario | Outputs
| ------ | ------ | ------ | ----- | -----
|findItems|(sku)|sku(@string)|if sku in inventory exists| display item description and price
||||if sku does not exist in inventory| return false
|||||
|addItem CONTINUED|(sku)|sku(@string), @Number|if sku exist in basket| increase quanitity by one
||||if sku does not exist in basket| add item to basket.
|||||
|totalCost|()|@Array|if items in array|add all items prices as a number
||||if no items in array|return 0