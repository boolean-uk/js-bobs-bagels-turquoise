const Basket = require("./basket.js");
const menu = require("./inventory.js");

class Price {
  constructor() {
    this.basket = new Basket();
  }

  checkPrice(sku) {
    let itemPrice = 0;
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].sku === sku) {
        itemPrice = menu[i].price;
      }
    }
    return itemPrice;
  }

  totalBasketPrice() {
    let totalPrice = +0;
    for (let i = 0; i < this.basket.basketArray.length; i++) {
      totalPrice += this.checkPrice(this.basket.basketArray[i]["sku"]);
    }

    return +totalPrice.toFixed(2);
  }

  countQuantity() {
    const skuArray = [];
    for (let i = 0; i < this.basket.basketArray.length; i++) {
      skuArray.push(this.basket.basketArray[i].sku);
    }
    const count = skuArray.reduce((tally, sku) => {
      tally[sku] = (tally[sku] || 0) + 1;
      return tally;
    }, {});

    return count;
  }

  discountedAmount() {
    let accumulatedCost = 0;

    for (const property in this.countQuantity()) {
      const quantitySku = this.countQuantity()[property];
      switch (true) {
        case property === "BGLP" && quantitySku >= 12:
          accumulatedCost +=
            Math.floor(this.countQuantity()[property] / 12) * -0.69;
          break;
        case property === "BGLO" && quantitySku >= 6:
          accumulatedCost +=
            Math.floor(this.countQuantity()[property] / 6) * -0.45;
          break;

        case property === "BGLE" && quantitySku >= 6:
          accumulatedCost +=
            Math.floor(this.countQuantity()[property] / 6) * -0.45;
          break;
      }
    }

    return +accumulatedCost.toFixed(2);
  }

  finalPrice() {
    return +(+this.totalBasketPrice() + this.discountedAmount()).toFixed(2);
  }
}

module.exports = Price;
