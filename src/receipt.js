const { Basket, getItem } = require('../src/basket.js')

function calcReceiptDiscount(item, skus, count) {
  let thisDiscount = 0
  if (item.discount) {
    if (
      item.discount === 'Coffee & Plain Bagel for 1.25' &&
      skus.includes('COF') &&
      skus.includes('BGLP') &&
      count.COF >= 1 &&
      count.BGLP >= 1
    ) {
      const lowestQuantityItem = Math.min(count.COF, count.BGLP)
      thisDiscount += item.saving * lowestQuantityItem
      count.COF -= lowestQuantityItem
      count.BGLP -= lowestQuantityItem
    }
    if (count >= item.discountTrigger) {
      thisDiscount += item.saving * Math.floor(count / item.discountTrigger)
    }
  }
  return thisDiscount
}

class Receipt {
  // constructor() {
  // }

  itemsAndQuantities(list) {
    const receiptItemArr = []
    const listArr = Object.entries(list)
    const skus = Object.keys(list)
    listArr.forEach((listItem) => {
      const item = listItem[0]
      const quantity = listItem[1]
      const itemDetails = getItem(item)
      const discount = calcReceiptDiscount(itemDetails, skus, quantity)
      const receiptItem = `${itemDetails.variant} ${
        itemDetails.name
      } ${quantity} ${(itemDetails.price * quantity - discount).toFixed(2)}`
      receiptItemArr.push(receiptItem)
    })
    return receiptItemArr
  }

  printReceiptItems(list) {
    let listItem = ''
    this.itemsAndQuantities(list).forEach((item) => {
      listItem += `${item} \n`
    })
    return listItem
  }

  printReceipt(list, totalPrice) {
    return `~~~ Bob's Bagels ~~~
        
        ${new Date().toLocaleString()}
        
        ----------------------------
        
        ${this.printReceiptItems(list)}
        
        ----------------------------
        Total: £${totalPrice} 
        
        Thank you
        for your order!`
  }
}

const b = new Basket()
b.basketSize = 15
b.addToBasket('BGLO')
b.addToBasket('BGLO')
b.addToBasket('BGLO')
b.addToBasket('BGLO')
b.addToBasket('BGLO')
b.addToBasket('BGLO')
b.addToBasket('BGLE')
b.addToBasket('BGLS')
b.addToBasket('BGLS')
b.addToBasket('BGLS')
b.addToBasket('BGLP')
b.checkPrice('BGLO')
b.checkPrice('BGLO')
b.checkPrice('BGLO')
b.checkPrice('BGLO')
b.checkPrice('BGLO')
b.checkPrice('BGLO')
b.checkPrice('BGLE')
b.checkPrice('BGLS')
b.checkPrice('BGLS')
b.checkPrice('BGLS')
b.checkPrice('BGLP')
console.log(b.totalBasketPrice())

const r = new Receipt()
console.log(r.printReceipt(b.count, b.totalPrice))

module.exports = Receipt
