const menu = require("./inventory.js");

class Basket {
  constructor() {
    this.basketArray = [];
    this.basketSize = 4;
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

  // return individual price
  checkPrice(sku) {
    let itemPrice = 0;
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].sku === sku) {
        itemPrice = menu[i].price;
      }
    }
    return itemPrice;
  }

  // { BGLO: 7, BGLP: 1, BGLE: 1, BGLS: 1, COF: 1, BGSE: 1 }

  countQuantity() {
    const skuArray = [];
    for (let i = 0; i < this.basketArray.length; i++) {
      skuArray.push(this.basketArray[i].sku);
    }
    let count = skuArray.reduce((tally, sku) => {
      tally[sku] = (tally[sku] || 0) + 1;
      return tally;
    }, {});

    return count;
  }

  totalBasketPrice() {
    let totalPrice = 0;
    for (let i = 0; i < this.basketArray.length; i++) {
      totalPrice += this.checkPrice(this.basketArray[i]["sku"]);
    }

    return Number(totalPrice).toFixed(3);
  }

  discountedPrice() {
    let cost = 0;
    for (let property in this.countQuantity()) {
      if (property === "BGLO" && this.countQuantity()[property] >= 6) {
        cost += Math.floor(this.countQuantity()[property] / 6) * -0.45;
      }
    }
    return cost;
  }

  finalPrice() {
    return Number(
      (+this.totalBasketPrice() + this.discountedPrice()).toFixed(2)
    );
  }
}

module.exports = Basket;
