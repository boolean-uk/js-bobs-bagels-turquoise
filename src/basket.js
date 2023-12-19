const menu = require('./inventory.js')

class Basket {
  constructor() {
    this.basketArray = []
    this.basketSize = 4
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
    const foundItem = this.basketArray.find((item) => item.sku === sku)
    if (foundItem) {
      this.basketArray.splice(this.basketArray.indexOf(foundItem), 1)
      return 'FOUND'
    } else {
      return 'WARNING - item not in basket'
    }
  }

  checkPrice(sku) {
    const foundItem = menu.find((item) => item.sku === sku)
    return foundItem.price
  }

  totalBasketPrice() {
    let totalPrice = 0
    this.basketArray.forEach((item) => {
      totalPrice += item.price
    })
    totalPrice = totalPrice - this.discountedPrice()
    return Number(totalPrice.toFixed(2))
  }

  changeBasketSize(size) {
    this.basketSize = size
    return size
  }

  discountedPrice() {
    for (let i = 0; i < this.basketArray.length; i++) {
      this.discountedArray.push(this.basketArray[i].sku)
    }

    console.log('discounted Array', this.discountedArray)

    this.count = this.discountedArray.reduce((tally, sku) => {
      tally[sku] = (tally[sku] || 0) + 1
      return tally
    }, {})
    console.log('the total count of items', this.count)

    let totalDiscount = 0
    const skus = Object.keys(this.count)
    console.log('individual skus', skus)

    for (let i = 0; i < skus.length; i++) {
      const count = this.count[skus[i]]
      console.log('count of bagels', count)

      const item = this.getItem(skus[i])
      console.log('current item to discount', item)

      if (!item.discount) {
        continue
      }

      if (item.name === 'Coffee' && skus.includes('BGLP')) {
        if (this.count.BGLP % 12 !== 0) {
          const coffeeDiscount = (this.count.COF % 12) * item.saving

          console.log('Coffee Discount', coffeeDiscount)
          totalDiscount += coffeeDiscount
        }
      }

      if (count >= item.discountTrigger) {
        const multipleDiscountCheck = Math.floor(count / item.discountTrigger)
        console.log('discountaccum', multipleDiscountCheck)

        totalDiscount += item.saving * multipleDiscountCheck
        console.log('current discount amount to add', totalDiscount)
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
