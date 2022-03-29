const Price = require("../src/price.js");

describe("Price", () => {
  let price;

  beforeEach(() => {
    price = new Price();
  });

  it("returns the price of an item", () => {
    // set up
    const expected = 2.99;
    // execute
    // basket.this.basketSize = 4

    const result = price.checkPrice("BGSE");
    // verify
    expect(result).toEqual(expected);
  });

  it("returns the price of all items in the basket", () => {
    // set up
    const expected = 5.84;
    // execute
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLE");
    price.basket.addToBasket("BGLS");
    price.basket.addToBasket("COF");
    price.basket.addToBasket("BGSE");

    const result = price.totalBasketPrice();
    // verify
    expect(result).toEqual(expected);
  });

  it("total basket price before discount", () => {
    // set up
    const expected = 2.94;
    // execute
    price.basket.increaseBasketSize(50);
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");

    const result = price.totalBasketPrice();
    // verify
    expect(result).toEqual(expected);
  });

  it("discount amount", () => {
    // set up
    const expected = -1.35;
    // execute
    price.basket.increaseBasketSize(50);
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");

    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");

    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");

    const result = price.discountedAmount();

    // { BGLO: 7, BGLP: 1, BGLE: 1, BGLS: 1, COF: 1, BGSE: 1 }.discountedAmount()

    console.log("line 262............................", result);
    // verify
    expect(result).toEqual(expected);
  });

  it("final price", () => {
    // set up
    const expected = 2.49;
    // execute
    price.basket.increaseBasketSize(50);
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");

    const result = price.finalPrice();

    // { BGLO: 7, BGLP: 1, BGLE: 1, BGLS: 1, COF: 1, BGSE: 1 }.discountedAmount()

    console.log("line 262............................", result);
    // verify
    expect(result).toEqual(expected);
  });

  it("discounted price", () => {
    // set up
    const expected = -1.59;
    // execute
    price.basket.increaseBasketSize(50);
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");

    price.basket.addToBasket("BGLE");
    price.basket.addToBasket("BGLE");
    price.basket.addToBasket("BGLE");
    price.basket.addToBasket("BGLE");
    price.basket.addToBasket("BGLE");
    price.basket.addToBasket("BGLE");

    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");

    const result = price.discountedAmount();

    // { BGLO: 7, BGLP: 1, BGLE: 1, BGLS: 1, COF: 1, BGSE: 1 }.discountedAmount()

    console.log("line 262............................", result);
    // verify
    expect(result).toEqual(expected);
  });

  it("total price", () => {
    // set up
    const expected = 10.56;
    // execute
    price.basket.increaseBasketSize(50);
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");

    price.basket.addToBasket("BGLE");
    price.basket.addToBasket("BGLE");
    price.basket.addToBasket("BGLE");
    price.basket.addToBasket("BGLE");
    price.basket.addToBasket("BGLE");
    price.basket.addToBasket("BGLE");

    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");

    const result = price.totalBasketPrice();

    // { BGLO: 7, BGLP: 1, BGLE: 1, BGLS: 1, COF: 1, BGSE: 1 }.discountedAmount()

    console.log("line 262............................", result);
    // verify
    expect(result).toEqual(expected);
  });

  it("final price", () => {
    // set up
    const expected = 8.97;
    // execute
    price.basket.increaseBasketSize(50);
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");
    price.basket.addToBasket("BGLO");

    price.basket.addToBasket("BGLE");
    price.basket.addToBasket("BGLE");
    price.basket.addToBasket("BGLE");
    price.basket.addToBasket("BGLE");
    price.basket.addToBasket("BGLE");
    price.basket.addToBasket("BGLE");

    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");
    price.basket.addToBasket("BGLP");

    const result = price.finalPrice();

    // { BGLO: 7, BGLP: 1, BGLE: 1, BGLS: 1, COF: 1, BGSE: 1 }.discountedAmount()

    console.log("line 451............................", result);
    // verify
    expect(result).toEqual(expected);
  });
});
