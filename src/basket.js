const menu = require('./inventory.js')

class Basket {
  constructor() {
    this.basketArray = []
    this.basketSize = 4
    this.priceArray = []
    this.discountedArray = []
    this.totalPriceArray = []
    this.count = 0
  }

  addToBasket(sku) {
    if (this.basketArray.length >= this.basketSize)
      return 'WARNING - Basket is full'

    menu.find((item) => {
      if (item.sku === sku) this.basketArray.push(item)
    })
    return this.basketArray
  }

  increaseBasketCapacity(number) {
    this.basketSize = number
    return this.basketSize
  }

  removeItems(sku) {
    for (let i = 0; i < this.basketArray.length; i++) {
      if (this.basketArray[i].sku === sku) {
        this.basketArray.splice(i, 1)
      }
    }
    return "That item isn't in your basket"
  }

  checkPrice(sku) {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].sku === sku) {
        this.priceArray.push(menu[i].price)
      }
    }
    return this.priceArray
  }

  discountedPrice() {
    for (let i = 0; i < this.basketArray.length; i++) {
      this.discountedArray.push(this.basketArray[i].sku)
    }
    this.count = this.discountedArray.reduce((acc, sku) => {
      acc[sku] = (acc[sku] || 0) + 1
      return acc
    }, {})
    let totalDiscount = 0
    const skus = Object.keys(this.count)
    for (let i = 0; i < skus.length; i++) {
      const count = this.count[skus[i]]
      const item = this.getItem(skus[i])
      if (item.discount) {
        if (count >= item.discountTrigger) {
          totalDiscount +=
            item.saving * Math.floor(count / item.discountTrigger)
        }
      }
    }

    return totalDiscount
  }

  totalBasketPrice() {
    let totalPrice = this.priceArray.reduce((acc, total) => acc + total)
    totalPrice -= this.discountedPrice()
    return Number(totalPrice.toFixed(2))
  }

  getItem(sku) {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].sku === sku) {
        return menu[i]
      }
    }
  }

  //this discountedPrice function is now returning an object which contains
  //the name of each SKU and the amount of times it occurs

  // for (let i = 0; i < this.discountedArray.length; i++)
  // if (this.discountedArray[i].sku === ""
}

module.exports = Basket
