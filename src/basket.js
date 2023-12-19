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
    if (sku.length === 0) return 'WARNING - sku required'
    const foundItem = menu.find((item) => item.sku === sku)

    if (!foundItem) return 'WARNING - item not found'

    if (this.basketArray.length < this.basketSize) {
      this.basketArray.push(foundItem)
    }
    return 'WARNING - Basket is full'
  }

  removeItems(sku) {
    const foundItem = this.basketArray.find((item) => (item.sku === sku))
    if (foundItem) {
      this.basketArray.splice(this.basketArray.indexOf(foundItem), 1)
      return 'FOUND'
    } else {
      return 'WARNING - item not in basket'
    }
  }

  checkPrice(sku) {
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].sku === sku) {
        this.priceArray.push(menu[i].price)
      }
    }
    return this.priceArray
  }

  totalBasketPrice() {
    let totalPrice = 0
    for (let i = 0; i < this.priceArray.length; i++) {
      totalPrice += this.priceArray[i]
    }
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
basket.basketSize = 8
basket.addToBasket('BGLO')
basket.addToBasket('BGLO')
basket.addToBasket('BGLO')
basket.addToBasket('BGLO')
basket.addToBasket('BGLO')
basket.addToBasket('BGLO')
basket.addToBasket('BGLO')

console.log(basket.basketArray.length)
console.log(basket.discountedArray)
console.log(basket.checkPrice('BGLO'))

module.exports = Basket
