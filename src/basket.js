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
    const bagelToAdd = menu.find((bagel) => bagel.sku === sku)
    if (!bagelToAdd) return 'this item does not exist'
    else {
      this.basketArray.push(bagelToAdd)
      return true
    }
  }

  removeItems(sku) {
    for (let i = 0; i < this.basketArray.length; i++) {
      if (this.basketArray[i].sku === sku) {
        this.basketArray.splice(i, 1)
        return true
      }
    }
    return "That item isn't in your basket"
  }

  checkPrice(sku) {
    const bagelPrice = menu.find((bagel) => bagel.sku === sku)
    if (!bagelPrice) return 'sorry this item does not exist'
    else {
      this.priceArray.push(bagelPrice.price)
      return true
    }
  }

  totalBasketPrice() {
    let totalPrice = 0
    this.priceArray.forEach((price) => {
      totalPrice += price
    })
    totalPrice = totalPrice - this.discountedPrice()
    return Number(totalPrice.toFixed(2))
  }

  discountedPrice() {
    for (let i = 0; i < this.basketArray.length; i++) {
      this.discountedArray.push(this.basketArray[i].sku)
    }
    this.count = this.discountedArray.reduce((tally, sku) => {
      tally[sku] = (tally[sku] || 0) + 1
      return tally
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

  getItem(sku) {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].sku === sku) {
        return menu[i]
      }
    }
  }

  // this discountedPrice function is now returning an object which contains
  // the name of each SKU and the amount of times it occurs

  // for (let i = 0; i < this.discountedArray.length; i++)
  // if (this.discountedArray[i].sku === ""
}

const b = new Basket()
b.addToBasket('BGLO')
b.addToBasket('BGLE')
b.checkPrice('BGLO')
b.checkPrice('BGLE')
// console.log(b.addToBasket())
// console.log(b.removeItems('BGLE'))
console.log(b.basketArray)
console.log(b.totalBasketPrice())
// console.log(b.checkPrice('BGLO'))

module.exports = Basket
