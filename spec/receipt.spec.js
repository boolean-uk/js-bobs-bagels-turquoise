const Receipt = require("../src/receipt.js");

describe("Receipt", () => {
  let receipt;

  beforeEach(() => {
    receipt = new Receipt();
  });

  it("prints receipt", () => {
    // set up
    const expected = { BGLO: 1, BGLP: 1, BGLE: 1 };
    // execute
    // price.basket.this.basketSize = 4

    // this.price.basket.basketSize = 6;
    receipt.price.basket.addToBasket("BGLO");
    receipt.price.basket.addToBasket("BGLP");
    receipt.price.basket.addToBasket("BGLE");

    const result = receipt.printReceipt();
    // verify
    expect(result).toEqual(expected);
  });
});
