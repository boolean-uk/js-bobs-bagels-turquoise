const menu = require("./inventory.js");

class Basket {
  constructor() {
    this.basketArray = [];
    this.basketSize = 4;
    this.priceArray = [];
    this.discountedArray = [];
    this.totalPriceArray = [];
    this.count = 0;
    this.quantities = [
      { sku: "BGLO", quantity: 0 },
      { sku: "BGLP", quantity: 0 },
      { sku: "BGLE", quantity: 0 },
      { sku: "BGLS", quantity: 0 },
      { sku: "COF", quantity: 0 },
      { sku: "BGSE", quantity: 0 },
      { sku: "BGSS", quantity: 0 }
    ];
  }
  addToBasket(sku) {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].sku === sku && this.basketArray.length < this.basketSize) {
        this.basketArray.push(menu[i]);
        for (let j= 0; j< this.quantities.length; j++) {
            if (sku === this.quantities.sku) {
                this.quantities[j].quantity += 2
            }
        }
        return this.quantities

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

  checkPrice(sku) {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].sku === sku) {
        // console.log("sku", menu[i])
        this.priceArray.push(menu[i].price);
      }
    }
  }

  totalBasketPrice() {
    let totalPrice = 0;
    console.log("price array", this.priceArray);
    for (let i = 0; i < this.priceArray.length; i++) {
      totalPrice += this.priceArray[i];
    }
    totalPrice = totalPrice - this.discountedPrice();
    return Number(totalPrice.toFixed(2));
  }

  discountedPrice() {
    for (let i = 0; i < this.basketArray.length; i++) {
      this.discountedArray.push(this.basketArray[i].sku);
    }
    this.count = this.discountedArray.reduce((tally, sku) => {
      tally[sku] = (tally[sku] || 0) + 1;
      return tally;
    }, {});
    let totalDiscount = 0;
    const skus = Object.keys(this.count);
    for (let i = 0; i < skus.length; i++) {
      const count = this.count[skus[i]];
      const item = this.getItem(skus[i]);
      if (item.discount) {
        if (count >= item.discountTrigger) {
          totalDiscount +=
            item.saving * Math.floor(count / item.discountTrigger);
        }
      }
    }

    return totalDiscount;
  }

  getItem(sku) {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].sku === sku) {
        return menu[i];
      }
    }
  }
}

let testBasket = new Basket();
testBasket.addToBasket("BGLO");
testBasket.addToBasket("BGLO");
testBasket.addToBasket("BGLO");
testBasket.addToBasket("BGLO");
console.log("add when test is full", testBasket.addToBasket("BGLO"));

console.log(testBasket.basketArray);
console.log(testBasket.quantities);

module.exports = Basket;
