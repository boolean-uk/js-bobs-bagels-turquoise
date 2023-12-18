| Methods            | Properties   | Notes                                       | Scenario            | Output  |
| ------------------ | ------------ | ------------------------------------------- | ------------------- | ------- |
| addToBasket()      | sku(@String) |                                             | item exists         | @String |
|                    |              |                                             | item does not exist | @String |
| removeItems()      | sku(@String) |                                             | item exists         | @String |
|                    |              |                                             | item does not exist | @String |
| addToBasket()      | sku(@String) |                                             | basket is full      | @String |
| updateCapacity()   | num(@Number) | manager wants to update basket size         |                     | @String |
|                    |              |                                             | invalid input       | @String |
| checkPrice()       | sku(@String) | user wants to check for specific item price | item exists         | @Number |
|                    |              |                                             | item does not exist | @String |
| totalBasketPrice() |              |                                             |                     | @Number |
