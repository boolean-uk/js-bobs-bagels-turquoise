# DOMAIN MODEL

Class | Properties | Methods | Notes | Scenario | Output | Example
----- | ---------- | ------- | ----- | -------- | ------ | -------
Basket | basketArray @Array, basketSize @Int, priceArray @Array, discountedArray @Array, totalPriceArray @Array, count @Int | addToBasket(@String) | find item by sku, add item to basketArray | user adds item to basket | output = true, item added to basketArray | `addToBasket("BGLO") => true basketArray = [{"sku": "BGLO", "price": 0.49, "name": "Bagel", "variant": "Onion", "discount": "6 for 2.49", "saving": -0.49}]`
| | | | | user tries adding item to full basket | return error | `addToBasket("BGLO") => "WARNING - Basket is full"`
| | | | | manager can increase basket size | items added to basketArray successfully | `set up: basket.basketSize = 5 then: basket.addToBasket("BGLO") basket.addToBasket("BGLP") basket.addToBasket("BGLE") basket.addToBasket("BGLS") basket.addToBasket("COF") basketArray = these 5 bagels`
| | | removeItems(@String) | find item by sku, remove from basketArray | user removes item from basket | output = true, item removed from basketArray | `set up: addToBasket("BGLO") then: removeItems("BGLO) => true basketArray = []`
| | | | | user tries removing item which isn't in basket | return error | `removeItems("BGLO") => "That item isn't in your basket"`
| | | checkPrice(@String) | find item price by sku | | item price added to priceArray | `checkPrice("BGLO") priceArray = [0.49]`
| | | | | item doesn't exist | return error | `checkPrice("BGLO") => "sorry this item does not exist`
| | | totalBasketPrice() | | | return total price of items in basket | `set up: addToBasket("BGLO) addToBasket("BGLP) then: totalBasketPrice() => 0.88`
| | | | | special offer discount applies if qualifying items in basket | return total price of items in basket | `set up: basket.addToBasket("BGLO") x6 then: totalBasketPrice() => 2.49`
