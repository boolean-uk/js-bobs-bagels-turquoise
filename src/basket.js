const menu = require("./inventory.js");

class Basket {
  constructor() {
    this.basketArray = [];
    this.basketSize = 4;
    this.priceArray = [];
    this.discountedArray = [];
    this.totalPriceArray = [];
    // this.count = 0;
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
    // IT DOESN?T MAKE SENSE TO ITERATE THE PRICE ARRAY

    // console.log(`inside the basket array: ${this.basketArray.sku}`);

    for (let i = 0; i < this.basketArray.length; i++) {
      this.checkPrice(this.basketArray[i]["sku"]);
      totalPrice += this.priceArray[i];
    }
    // console.log(`inside totalBasketPrice price array:${this.priceArray}`);
    console.log(`total price before: ${totalPrice}`);
    console.log("inside total price before:", this.discountedPrice());
    // console.log(`total price after: ${totalPrice}`);
    // console.log("inside total price after:", this.discountedPrice());

    return totalPrice + this.discountedPrice();
  }

  discountedPrice() {
    for (let i = 0; i < this.basketArray.length; i++) {
      this.discountedArray.push(this.basketArray[i].sku);
    }

    let count = this.discountedArray.reduce((tally, sku) => {
      tally[sku] = (tally[sku] || 0) + 1;
      return tally;
    }, {});

    // console.log(`inside discountePrice this.count:`, count);

    let totalDiscount = 0;
    const skus = Object.keys(count);
    // skus = ["BGLO"]
    // console.log("inside discountrPrice skus:", skus);
    for (let i = 0; i < skus.length; i++) {
      const skuNum = count[skus[i]];
      const item = this.getItem(skus[i]);

      console.log("check skuNum", skuNum);
      //   console.log("check item", item);

      console.log("logging item discount: ", item.discount);
      if (item.discount) {
        console.log("inside for loop: ", item.discountTrigger);

        if (skuNum >= item.discountTrigger) {
          totalDiscount +=
            item.saving * Math.floor(skuNum / item.discountTrigger);
        }
      }
    }
    return totalDiscount;
  }

  getItem(sku) {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].sku === sku) {
        // console.log("inside getItem", menu[i]);
        return menu[i];
      }
    }
  }

  //this discountedPrice function is now returning an object which contains
  //the name of each SKU and the amount of times it occurs

  // for (let i = 0; i < this.discountedArray.length; i++)
  // if (this.discountedArray[i].sku === ""
}

module.exports = Basket;
