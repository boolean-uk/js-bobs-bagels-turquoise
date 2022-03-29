const Price = require("./price.js");
const menu = require("./inventory.js");

class Receipt {
  constructor() {
    this.price = new Price();
  }

  printReceipt() {
    return this.price.countQuantity();
    // for (let item in this.price.countQuantity()) {
    //   console.log(item);
    // }
  }
}

module.exports = Receipt;
