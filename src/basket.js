const menu = require('./inventory.js')

const getItem = (sku) => {
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].sku === sku) {
      return menu[i]
    }
  }
}

class Basket {
  constructor() {
    this.basketArray = []
    this.basketSize = 4
    this.priceArray = []
    this.discountedArray = []
    this.totalPriceArray = []
    this.totalPrice = 0
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
    this.totalPrice = Number(totalPrice.toFixed(2))
    return this.totalPrice
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
      const item = getItem(skus[i])
      if (item.discount) {
        // if skus contains COF & BGLP and there are at least 1x of each of these items
        if (
          item.discount === 'Coffee & Plain Bagel for 1.25' &&
          skus.includes('COF') &&
          skus.includes('BGLP') &&
          this.count.COF >= 1 &&
          this.count.BGLP >= 1
        ) {
          // find lowest quantity item to calc total saving
          const lowestQuantityItem = Math.min(this.count.COF, this.count.BGLP)
          totalDiscount += item.saving * lowestQuantityItem
          // reduce count of COF & BGLP by lowest quantity so they aren't
          // included in further discounts
          this.count.COF -= lowestQuantityItem
          this.count.BGLP -= lowestQuantityItem
        }
        if (count >= item.discountTrigger) {
          totalDiscount +=
            item.saving * Math.floor(count / item.discountTrigger)
        }
      }
    }
    return totalDiscount
  }

  // this discountedPrice function is now returning an object which contains
  // the name of each SKU and the amount of times it occurs
}

module.exports = { Basket, getItem }
