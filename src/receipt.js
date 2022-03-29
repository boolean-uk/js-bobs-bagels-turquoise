const Price = require("./price.js");

class Receipt {
  constructor() {
    this.price = new Price();
  }

  printReceipt() {
    return this.price.countQuantity();
  }
}

module.exports = Receipt;
