const menu = require("./inventory.js");

class Basket {
  constructor() {
    this.basketArray = [];
    this.basketSize = 4;
    this.priceArray = [];
    this.quantities = [
      { sku: "BGLO", quantity: 0 },
      { sku: "BGLP", quantity: 0 },
      { sku: "BGLE", quantity: 0 },
      { sku: "BGLS", quantity: 0 },
      { sku: "COF", quantity: 0 },
      { sku: "BGSE", quantity: 0 },
      { sku: "BGSS", quantity: 0 },
    ];
  }

  addToBasket(sku) {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].sku === sku && this.basketArray.length < this.basketSize) {
        if (!this.basketArray.find((item) => item.sku === sku)) {
          this.basketArray.push(menu[i]);
        }
        for (let j = 0; j < this.quantities.length; j++) {
          if (sku === this.quantities[j].sku) {
            this.quantities[j].quantity += 1;
          }
        }
        return "Your item is in the cart";
      }
    }
    return "WARNING - Basket is full";
  }

  removeItems(sku) {
    for (let i = 0; i < this.basketArray.length; i++) {
      if (this.basketArray[i].sku === sku) {
        this.basketArray.splice(i, 1);
      }
    }
    return "That item isn't in your basket";
  }

  checkPrice(sku) {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].sku === sku) {
        this.priceArray.push(menu[i].price);
      }
    }
  }

  totalBasketPrice() {
    let totalPrice = 0;
    for (let i = 0; i < this.basketArray.length; i++) {
      totalPrice += this.basketArray[i].price * this.quantities[i].quantity;
    }
    totalPrice = totalPrice - this.discountedPrice();
    return Number(totalPrice.toFixed(2));
  }


  discountedPrice() {
    let totalDiscount = 0;
    const quantities = this.quantities;
    for (let i = 0; i < quantities.length; i++) {
      const sku = quantities[i].sku;
      const count = quantities[i].quantity;
      const item = this.getItem(sku);
      if (item.discount && count >= item.discountTrigger) {
        const discountMultiplier = Math.floor(count / item.discountTrigger);
        totalDiscount += item.saving * discountMultiplier;
      }
    }
    return Number(-totalDiscount);
  }

  getItem(sku) {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].sku === sku) {
        return menu[i];
      }
    }
  }
}

module.exports = Basket;
