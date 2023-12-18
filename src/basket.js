const menu = require('./inventory.js')

class Basket {
  constructor() {
    this.basketArray = []
    this.basketSize = 4
    this.discountedArray = []
    this.count = 0
  }
  addToBasket(sku) {
    const bagel = menu.find((item) => item.sku === sku)

    if (!bagel) {
      return 'This item does not exist'
    }

    for (let i = 0; i < menu.length; i++) {
      if (menu[i].sku === sku && this.basketArray.length < this.basketSize) {
        this.basketArray.push(menu[i])
      }
    }

    if (this.basketArray.length >= this.basketSize) {
      return 'WARNING - Basket is full'
    } else {
      return `${sku} added to basket`
    }
  }

  removeItems(sku) {
    for (var i = 0; i < this.basketArray.length; i++) {
      if (this.basketArray[i].sku === sku) {
        this.basketArray.splice(i, 1)
      }
    }
    return "That item isn't in your basket"
  }

  updateBasketSize(newBasketSize) {
    if (typeof newBasketSize === 'number') {
      this.basketSize = newBasketSize
      return `Updated basket size to ${newBasketSize}`
    } else {
      return 'Please input a valid number'
    }
  }

  checkPrice(sku) {
    const bagel = menu.find((item) => item.sku === sku)

    if (!bagel) {
      return 'This item does not exist'
    }

    const priceArr = []
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].sku === sku) {
        priceArr.push(menu[i].price)
      }
    }
    return Number(priceArr.join(''))
  }

  totalBasketPrice() {
    let totalPrice = 0
    for (let i = 0; i < this.basketArray.length; i++) {
      totalPrice += this.basketArray[i].price
    }
    totalPrice += this.discountedPrice()
    return Number(totalPrice.toFixed(2))
  }

  discountedPrice() {
    this.basketArray.forEach((item) => this.discountedArray.push(item.sku))

    this.count = this.discountedArray.reduce((tally, sku) => {
      tally[sku] = (tally[sku] || 0) + 1
      return tally
    }, {})

    let totalDiscount = 0

    const skus = Object.keys(this.count)

    for (let i = 0; i < skus.length; i++) {
      const count = this.count[skus[i]]
      const item = this.getItem(skus[i])

      const hasCOF = this.count['COF'] >= 1
      const hasBGLP = this.count['BGLP'] >= 1

      if (hasCOF && hasBGLP) {
        const pairCount = Math.min(this.count['COF'], this.count['BGLP'])
        totalDiscount += -0.13 * pairCount

        this.count['COF'] -= pairCount * 2
        this.count['BGLP'] -= pairCount * 2
      }

      if (item.discount && count >= item.discountTrigger) {
        totalDiscount += item.saving * Math.floor(count / item.discountTrigger)
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

module.exports = Basket
