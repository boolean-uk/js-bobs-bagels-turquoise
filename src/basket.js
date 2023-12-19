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
    else {
      menu.forEach((bagel) => {
        if (bagel.sku === sku) {
          this.basketArray.push(bagel)
        }
      })
    }
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
    const priceToCheck = menu.find((bagel) => bagel.sku === sku)
    if (!priceToCheck) {
      return 'Enter a valid name'
    } else {
      this.priceArray.push(priceToCheck.price)
      return this.priceArray
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
}
const basket = new Basket()

basket.addToBasket('BGLO')
basket.addToBasket('BGLP')

basket.checkPrice('BGLP')
basket.checkPrice('BGLP')

basket.basketSize = 40

console.log(basket.basketSize)
console.log(basket.priceArray)
console.log(basket.totalBasketPrice())

module.exports = Basket
