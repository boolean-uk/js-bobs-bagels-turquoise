const Receipt = require("../src/receipt.js");

describe("Receipt", () => {
  let receipt;

  beforeEach(() => {
    receipt = new Receipt();
  });

  fit("prints receipt", () => {
    // set up
    const expected = { BGLO: 1, BGLP: 1, BGLE: 1 };

    receipt.price.basket.addToBasket("BGLO");
    receipt.price.basket.addToBasket("BGLP");
    receipt.price.basket.addToBasket("BGLE");

    const result = receipt.printReceipt();
    // verify
    expect(result).toEqual(expected);
  });
});
