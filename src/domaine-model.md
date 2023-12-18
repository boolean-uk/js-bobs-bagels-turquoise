# Bobs Bagels Domain Models

## Adding and removing

```
As a member of the public
So I can order a bagel when I want to
I'd like to add an item to my basket
```

```
As a member of the public,
So that I can not overfill my small bagel basket
I'd like to know when my basket is full when I try adding an item beyond my basket capacity.
```

```
As a member of the public
So that I can buy many of my favorite bagels
I'd like to be able to add the same type of bagel to my basket more than once
```

```
As a member of the public,
So that I can change my order
I'd like to remove an item from my basket
```

```
As a member of the public
So that I can maintain my sanity
I'd like to know if I try to remove an item that doesn't exist in my basket.
```

### Keywords

1. **Verbs:** order, add, overfill, buy, change, remove, know
2. **Nouns:** member, public, bagel, item, basket, capacity, same type

### Table

| Methods | Inputs | Data | Scenario | Outputs
| ------ | ------ | ------ | ----- | ------
|[ ]  addToBasket|(sku)|sku: sku:(@string), price:(@string), name:(@string), variant(@string), fillings(@string) |if sku is valid| add item to basket as a string
|[ ]  |||sku not valid|return "WARNING - Item not found"
|[ ]  |||no sku added| return "WARNING - Sku required"
|[ ]  |||if basket is full| return "WARNING - Basket is full"
|[ ]  ||sku(@string), @Integer|if sku exist in basket| increase quanitity by one
|[ ]  |||if sku does not exist in basket| add item to basket.
|[ ]  removeItems|(sku)|sku: sku:(@string), price:(@string), name:(@string), variant(@string), fillings(@string) |if sku is valid and in basket| remove item from basket
|[ ]  |||no sku added| return "sku required"
|[ ]  |||if sku does not exist in basket| return "That item isn't in your basket"
|[ ]  |||if sku does exist in basket| item is spliced from basket array

## Changing Basket Size

```
As a Bob's Bagels manager,
So that I can record more sales
I’d like to create baskets with larger capacity when I need to.
```

### Keywords

1. **Verbs:** create, record
2. **Nouns:** manager, sales

### Table

| Methods | Inputs | Data | Scenario | Outputs
| ------ | ------ | ------ | ----- | -----
|[ ]  changeBasketSize|(Size)|Size(@Number)|if changeBasketZise recieves a number| change the basket size allowance
|[ ]  |||if changeBasketSize does not revieve a number| return "error, set basket size"
|||||


## Finding and Totalling

```
As a member of the public,
So that I can know how much my bagels are,
I’d like to see the price of each item before I add it to my basket.
```

```
As a member of the public,
So that I can prepare to pay
When I go to checkout I'd like to know the total sum of the bagels in my basket
```

### Keywords

1. **Verbs:** know, see, add, pay
2. **Nouns:** member, public, bagels, price, basket, checkout

### Table

| Methods | Inputs | Data | Scenario | Outputs
| ------ | ------ | ------ | ----- | -----
|[ ]  checkPrice|(sku)|sku(@string)|if sku in inventory exists| display item description and price
|[ ]  |||if sku does not exist in inventory| return false
|||||
|[ ]  totalBasketPrice|()|@Array|if items in array|add all items prices as a number
|[ ]  |||if no items in array|return 0


## Discounting Items


```
As a member of public,
I would like to order items in groupings at a discounted price
When I checkout, I would like these new prices to be reflected onto the total cost.
```



### Keywords

1. **Verbs:** order, discounted, checkout, reflected
2. **Nouns:** items, price, checkout, cost

### Table

| Methods | Inputs | Data | Scenario | Outputs
| ------ | ------ | ------ | ----- | -----
|[ ]  discountedPrice||||
|[ ]  ||||
|[ ]  ||||
|[ ]  ||||
|[ ]  ||||
