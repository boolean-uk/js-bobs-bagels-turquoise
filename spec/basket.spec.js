
const Basket = require("../src/basket.js");

describe("Basket", () => {
  let basket

  beforeEach(() => {
    basket = new Basket()
  })

  it("adds 1 item to basket", () => {
    // set up
    const expected = [{
      "sku": "BGLO",
      "price": 0.49,
      "name": "Bagel",
      "variant": "Onion",
      "discount": "6 for 2.49",
      "saving": -0.45,
      "discountTrigger": 6
    }]
    // execute
    // basket.this.basketSize = 4
    basket.addToBasket("BGLO")
    const result = basket.basketArray
    // verify
    expect(result).toEqual(expected);
  })

  it("adds 3 items to basket", () => {
    // set up
    const expected = [{
      "sku": "BGLO",
      "price": 0.49,
      "name": "Bagel",
      "variant": "Onion",
      "discount": "6 for 2.49",
      "saving": -0.45,
      "discountTrigger": 6
    },
    {
      "sku": "BGLP",
      "price": 0.39,
      "name": "Bagel",
      "variant": "Plain",
      "discount": "12 for 3.99",
      "saving": -0.69,
      "discountTrigger": 12
    },
    {
      "sku": "BGLE",
      "price": 0.49,
      "name": "Bagel",
      "variant": "Everything",
      "discount": "6 for 2.49",
      "saving": -0.45,
      "discountTrigger": 6
    }]

    // execute
    //    basket.this.basketSize = 4
    basket.addToBasket("BGLO")
    basket.addToBasket("BGLP")
    basket.addToBasket("BGLE")
    const result = basket.basketArray
    // verify
    expect(result).toEqual(expected);
  })

  it("remove items from basket", () => {
    // set up
    const expected = [{
      "sku": "BGLE",
      "price": 0.49,
      "name": "Bagel",
      "variant": "Everything",
      "discount": "6 for 2.49",
      "saving": -0.45,
      "discountTrigger": 6
    }]
    // execute
    basket.addToBasket("BGLO")
    basket.addToBasket("BGLE")
    basket.removeItems("BGLO")
    const result = basket.basketArray
    // verify
    expect(result).toEqual(expected);
  })

  it("trys to add more than one item to a basket that is full", () => {
    // set up
    const expected = ("WARNING - Basket is full")
    // execute
    basket.basketSize = 1
    basket.addToBasket("BGLO")
    const result = basket.addToBasket("BGSE")
    // verify
    expect(result).toEqual(expected);
  })

  it("allows a manager to increase basket size if required", () => {
    // set up
    const expected = [{
      "sku": "BGLO",
      "price": 0.49,
      "name": "Bagel",
      "variant": "Onion",
      "discount": "6 for 2.49",
      "saving": -0.45,
      "discountTrigger": 6
    },
    {
      "sku": "BGLP",
      "price": 0.39,
      "name": "Bagel",
      "variant": "Plain",
      "discount": "12 for 3.99",
      "saving": -0.69,
      "discountTrigger": 12
    },
    {
      "sku": "BGLE",
      "price": 0.49,
      "name": "Bagel",
      "variant": "Everything",
      "discount": "6 for 2.49",
      "saving": -0.45,
      "discountTrigger": 6
    },
    {
      "sku": "BGLS",
      "price": 0.49,
      "name": "Bagel",
      "variant": "Sesame"
    },
    {
      "sku": "COF",
      "price": 0.99,
      "name": "Bagel",
      "variant": ""
    },
    {
      "sku": "BGSE",
      "price": 2.99,
      "name": "Bagel Sandwich",
      "variant": "Everything",
    }]
    // execute
    basket.basketSize = 6
    basket.addToBasket("BGLO")
    basket.addToBasket("BGLP")
    basket.addToBasket("BGLE")
    basket.addToBasket("BGLS")
    basket.addToBasket("COF")
    basket.addToBasket("BGSE")
    const result = basket.basketArray
    // verify
    expect(result).toEqual(expected);
  })

  it("It can't remove items from basket that doesn't exist", () => {
    // set up
    const expected = ("That item isn't in your basket")
    // execute

    const result = basket.removeItems("BGLP")
    // verify
    expect(result).toEqual(expected);
  })


  it("returns the price of an item", () => {
    // set up
    const expected = [2.99]
    // execute
    // basket.this.basketSize = 4
    basket.checkPrice("BGSE")
    const result = basket.priceArray
    // verify
    expect(result).toEqual(expected);
  })

  it("returns the price of all items in the basket", () => {
    // set up
    const expected = 5.84
    // execute
    // basket.this.basketSize = 4
    basket.basketSize = 6
    for (let i = 0; i < 2; i++) {
      basket.addToBasket("BGLO")
      basket.addToBasket("BGLP")
      basket.addToBasket("BGLE")
      basket.addToBasket("BGLS")
      basket.addToBasket("COF")
      basket.addToBasket("BGSE")
    }

    const result = basket.totalBasketPrice()
    // verify
    expect(result).toEqual(expected);
  })

  it("Applies special offer pricing to the basket total", () => {
    // set up
    const expected = 23.89
    // execute
    basket.basketSize = 50
    for (let i = 0; i < 6; i++) {
      basket.addToBasket("BGLO")
    }
    for (let i = 0; i < 4; i++) {
      basket.addToBasket("BGLP")
      basket.addToBasket("BGLE")
      basket.addToBasket("BGLS")
      basket.addToBasket("COF")
      basket.addToBasket("BGSE")
    }

    const result = basket.totalBasketPrice()
    // verify
    expect(result).toEqual(expected);
  })

  it("Applies special offer pricing once to different product", () => {
    // set up
    const expected = 10.34
    // execute
    basket.basketSize = 30
    for (let i = 0; i < 13; i++) {
      basket.addToBasket("BGLP")
    }
    for (let i = 0; i < 7; i++) {
      basket.addToBasket("BGLO")
      basket.addToBasket("BGLE")
    }

    const result = basket.totalBasketPrice()
    // verify
    expect(result).toEqual(expected);
  })
})