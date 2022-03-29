const Basket = require("../src/basket.js");

describe("Basket", () => {
  let basket;

  beforeEach(() => {
    basket = new Basket();
  });

  it("adds 1 item to basket", () => {
    // set up
    const expected = [
      {
        sku: "BGLO",
        price: 0.49,
        name: "Bagel",
        variant: "Onion",
        discount: "6 for 2.49",
        saving: -0.45,
      },
    ];

    basket.addToBasket("BGLO");
    const result = basket.basketArray;
    // verify
    expect(result).toEqual(expected);
  });

  it("adds 3 items to basket", () => {
    // set up
    const expected = [
      {
        sku: "BGLO",
        price: 0.49,
        name: "Bagel",
        variant: "Onion",
        discount: "6 for 2.49",
        saving: -0.45,
      },
      {
        sku: "BGLP",
        price: 0.39,
        name: "Bagel",
        variant: "Plain",
        discount: "12 for 3.99",
        saving: -0.69,
      },
      {
        sku: "BGLE",
        price: 0.49,
        name: "Bagel",
        variant: "Everything",
        discount: "6 for 2.49",
        saving: -0.45,
      },
    ];

    // execute
    //    basket.this.basketSize = 4
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLE");
    const result = basket.basketArray;
    // verify
    expect(result).toEqual(expected);
  });

  it("remove items from basket", () => {
    // set up
    const expected = [
      {
        sku: "BGLE",
        price: 0.49,
        name: "Bagel",
        variant: "Everything",
        discount: "6 for 2.49",
        saving: -0.45,
      },
    ];
    // execute
    // basket.this.basketSize = 4
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLE");
    basket.removeItems("BGLO");
    basket.removeItems("BGLP");
    const result = basket.basketArray;
    // verify
    expect(result).toEqual(expected);
  });

  it("tries to add more than one item to a basket that is full", () => {
    // set up
    const expected = "WARNING - Basket is full";
    // execute
    // basket.this.basketSize = 4
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLE");
    basket.addToBasket("COF");
    const result = basket.addToBasket("BGSE");
    // verify
    expect(result).toEqual(expected);
  });

  //    it("trys to add an item that doesn't exist", () => {
  //     // set up
  //     const expected = ("This item does not exist")
  //     // execute
  //     // basket.this.basketSize = 4

  //     const result = basket.addToBasket("BGLL")
  //     // verify
  //      expect(result).toEqual(expected);
  //    })

  it("allows a manager to increase basket size if required", () => {
    // set up
    const expected = [
      {
        sku: "BGLO",
        price: 0.49,
        name: "Bagel",
        variant: "Onion",
        discount: "6 for 2.49",
        saving: -0.45,
      },
      {
        sku: "BGLP",
        price: 0.39,
        name: "Bagel",
        variant: "Plain",
        discount: "12 for 3.99",
        saving: -0.69,
      },
      {
        sku: "BGLE",
        price: 0.49,
        name: "Bagel",
        variant: "Everything",
        discount: "6 for 2.49",
        saving: -0.45,
      },
      {
        sku: "BGLS",
        price: 0.49,
        name: "Bagel",
        variant: "Sesame",
      },
      {
        sku: "COF",
        price: 0.99,
        name: "Bagel",
        variant: "",
      },
      {
        sku: "BGSE",
        price: 2.99,
        name: "Bagel Sandwich",
        variant: "Everything",
      },
    ];
    // execute
    basket.increaseBasketSize(6);
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLE");
    basket.addToBasket("BGLS");
    basket.addToBasket("COF");
    basket.addToBasket("BGSE");
    const result = basket.basketArray;
    // verify
    expect(result).toEqual(expected);
  });

  it("It can't remove items from basket that doesn't exist", () => {
    // set up
    const expected = "That item isn't in your basket";
    // execute
    // basket.this.basketSize = 4

    const result = basket.removeItems(99);
    // verify
    expect(result).toEqual(expected);
  });

  it("returns the price of an item", () => {
    // set up
    const expected = 2.99;
    // execute
    // basket.this.basketSize = 4

    const result = basket.checkPrice("BGSE");
    // verify
    expect(result).toEqual(expected);
  });

  it("returns the price of all items in the basket", () => {
    // set up
    const expected = 5.84;
    // execute
    // basket.this.basketSize = 4
    basket.increaseBasketSize(6);
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLE");
    basket.addToBasket("BGLS");
    basket.addToBasket("COF");
    basket.addToBasket("BGSE");

    const result = basket.totalBasketPrice();
    // verify
    expect(result).toEqual(expected);
  });

  it("total basket price before discount", () => {
    // set up
    const expected = 2.94;
    // execute
    basket.increaseBasketSize(50);
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");

    const result = basket.totalBasketPrice();
    // verify
    expect(result).toEqual(expected);
  });

  it("discount amount", () => {
    // set up
    const expected = -1.35;
    // execute
    basket.increaseBasketSize(50);
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");

    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");

    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");

    const result = basket.discountedAmount();

    // { BGLO: 7, BGLP: 1, BGLE: 1, BGLS: 1, COF: 1, BGSE: 1 }.discountedAmount()

    console.log("line 262............................", result);
    // verify
    expect(result).toEqual(expected);
  });

  it("final price", () => {
    // set up
    const expected = 2.49;
    // execute
    basket.increaseBasketSize(50);
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");

    const result = basket.finalPrice();

    // { BGLO: 7, BGLP: 1, BGLE: 1, BGLS: 1, COF: 1, BGSE: 1 }.discountedAmount()

    console.log("line 262............................", result);
    // verify
    expect(result).toEqual(expected);
  });

  it("discounted price", () => {
    // set up
    const expected = -1.59;
    // execute
    basket.increaseBasketSize(50);
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");

    basket.addToBasket("BGLE");
    basket.addToBasket("BGLE");
    basket.addToBasket("BGLE");
    basket.addToBasket("BGLE");
    basket.addToBasket("BGLE");
    basket.addToBasket("BGLE");

    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");

    const result = basket.discountedAmount();

    // { BGLO: 7, BGLP: 1, BGLE: 1, BGLS: 1, COF: 1, BGSE: 1 }.discountedAmount()

    console.log("line 262............................", result);
    // verify
    expect(result).toEqual(expected);
  });

  it("total price", () => {
    // set up
    const expected = 10.56;
    // execute
    basket.increaseBasketSize(50);
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");

    basket.addToBasket("BGLE");
    basket.addToBasket("BGLE");
    basket.addToBasket("BGLE");
    basket.addToBasket("BGLE");
    basket.addToBasket("BGLE");
    basket.addToBasket("BGLE");

    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");

    const result = basket.totalBasketPrice();

    // { BGLO: 7, BGLP: 1, BGLE: 1, BGLS: 1, COF: 1, BGSE: 1 }.discountedAmount()

    console.log("line 262............................", result);
    // verify
    expect(result).toEqual(expected);
  });

  it("final price", () => {
    // set up
    const expected = 8.97;
    // execute
    basket.increaseBasketSize(50);
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");
    basket.addToBasket("BGLO");

    basket.addToBasket("BGLE");
    basket.addToBasket("BGLE");
    basket.addToBasket("BGLE");
    basket.addToBasket("BGLE");
    basket.addToBasket("BGLE");
    basket.addToBasket("BGLE");

    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");
    basket.addToBasket("BGLP");

    const result = basket.finalPrice();

    // { BGLO: 7, BGLP: 1, BGLE: 1, BGLS: 1, COF: 1, BGSE: 1 }.discountedAmount()

    console.log("line 451............................", result);
    // verify
    expect(result).toEqual(expected);
  });
});
