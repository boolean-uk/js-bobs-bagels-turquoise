const menu = require("./inventory.js");

class Basket {
  constructor() {
    this.basketArray = [];
    this.basketSize = 20;
  }

  increaseBasketSize(amount) {
    this.basketSize = amount;
  }

  addToBasket(sku) {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].sku === sku && this.basketArray.length < this.basketSize) {
        this.basketArray.push(menu[i]);
      }
    }
    return "WARNING - Basket is full";
  }

  removeItems(sku) {
    for (var i = 0; i < this.basketArray.length; i++) {
      if (this.basketArray[i].sku === sku) {
        this.basketArray.splice(i, 1);
      }
    }
    return "That item isn't in your basket";
  }

  //   receipt() {
  //     return ```
  //     ~~~ Bob's Bagels ~~~

  //     2021-03-16 21:38:44

  // ----------------------------

  // Onion Bagel        2   £0.98
  // Plain Bagel        12  £3.99
  // Everything Bagel   6   £2.49
  // Coffee             3   £2.97

  // ----------------------------
  // Total                 £10.43

  //         Thank you
  //       for your order!
  // ```;
  //   }
}

module.exports = Basket;
