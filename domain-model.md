# Domain-Model

## Basket-Class

| Objects | Properties | Messages | Notes | Scenario | Output | Example |
| ------- | ---------- | -------- | ----- | -------- | ------ | ------- |
| Basket(@object) | basketArray(@array) basketSize(@number) priceArray(@array) discountedArray(@array) totalPriceArray(@array) count(@number) | addToBasket(@tring) | find the item by input string and add to the basket |user adds bagel in the basketArray | item added to the basketArray | addToBasket('BGLO') => basketArray =[{sku: 'BGLO',price: 0.49,name: 'Bagel',variant: 'Onion', discount: '6 for 2.49',saving: -0.49,discountTrigger: 6}]
||||give and error message for max capacity| user adds more bagel than the capacity of the basket | returns an error(@string) |  addToBasket(@string) => 'WARNING - Basket is full'
||||increase the capacity of the basketArray| manager increase the capacity of the basketArray | items added to the basket sucessfully | addToBasket('BGLO') => condition: {basket.Size = 3} basketArray =[{sku: 'BGLO',price: 0.49,name: 'Bagel',variant: 'Onion', discount: '6 for 2.49',saving: -0.49,discountTrigger: 6},{sku: 'BGLO',price: 0.49,name: 'Bagel',variant: 'Onion', discount: '6 for 2.49',saving: -0.49,discountTrigger: 6},{sku: 'BGLO',price: 0.49,name: 'Bagel',variant: 'Onion', discount: '6 for 2.49',saving: -0.49,discountTrigger: 6}]
||| removeItems(@string) | find the item and remove from basket | item exists | user removes the item from basketArray | removeItems(@string) => {sku: 'BGLO',price: 0.49,name: 'Bagel',variant: 'Onion', discount: '6 for 2.49',saving: -0.49,discountTrigger: 6}
|||| |item doesn't exists | return error(@string) | removeItems('BGLO') => error 'That item isn't in your basket'
|| |checkPrice(@string) | | |price of the item added to the priceArray | checkPrice('BGLO') => [0.49]
|||totalBasketPrice() | || gives the total price of items in the basket | addtoBasket('BGLO')*2 totalBasketPrice() => 0.98
|||||discount offer will apply for the qualifying items | return total price of the basket | addtoBasket('BGLO')*6  totalBaksetPrice() => 2.49