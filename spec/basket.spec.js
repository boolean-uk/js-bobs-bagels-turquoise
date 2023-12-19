const Basket = require('../src/basket.js')

describe('Basket', () => {
  let basket

  beforeEach(() => {
    basket = new Basket()
    basket.basketArray = []
  })
  describe('/ adding and removing items', () => {
    it('/ add 1 item to basket', () => {
      // set up
      const expected = [
        {
          sku: 'BGLO',
          price: 0.49,
          name: 'Bagel',
          variant: 'Onion',
          discount: '6 for 2.49',
          saving: 0.45,
          discountTrigger: 6
        }
      ]
      // execute
      basket.addToBasket('BGLO')
      const result = basket.basketArray
      // verify
      expect(result).toEqual(expected)
    })

    it('/ add 3 items to basket', () => {
      // set up
      const expected = [
        {
          sku: 'BGLO',
          price: 0.49,
          name: 'Bagel',
          variant: 'Onion',
          discount: '6 for 2.49',
          saving: 0.45,
          discountTrigger: 6
        },
        {
          sku: 'BGLP',
          price: 0.39,
          name: 'Bagel',
          variant: 'Plain',
          discount: '12 for 3.99',
          saving: 0.69,
          discountTrigger: 12
        },
        {
          sku: 'BGLE',
          price: 0.49,
          name: 'Bagel',
          variant: 'Everything',
          discount: '6 for 2.49',
          saving: 0.45,
          discountTrigger: 6
        }
      ]

      // execute
      basket.addToBasket('BGLO')
      basket.addToBasket('BGLP')
      basket.addToBasket('BGLE')
      const result = basket.basketArray
      // verify
      expect(result).toEqual(expected)
    })

    it('/ add more than one item to a basket that is full', () => {
      // set up
      const expected = 'WARNING - Basket is full'
      // execute
      basket.addToBasket('BGLO')
      basket.addToBasket('BGLP')
      basket.addToBasket('BGLE')
      basket.addToBasket('COF')
      const result = basket.addToBasket('BGSE')
      // verify
      expect(result).toEqual(expected)
    })

    it("/ add an item that doesn't exist", () => {
      // set up
      const expected = 'WARNING - item not found'
      // execute
      const result = basket.addToBasket('BGLL')
      // verify
      expect(result).toEqual(expected)
    })

    it('/ remove items from basket', () => {
      // set up
      const expected = [
        {
          sku: 'BGLE',
          price: 0.49,
          name: 'Bagel',
          variant: 'Everything',
          discount: '6 for 2.49',
          saving: 0.45,
          discountTrigger: 6
        }
      ]
      // execute
      basket.addToBasket('BGLO')
      basket.addToBasket('BGLP')
      basket.addToBasket('BGLE')
      basket.removeItems('BGLO')
      basket.removeItems('BGLP')
      const result = basket.basketArray
      // verify
      expect(result).toEqual(expected)
    })

    it("/ can't remove items from basket that don't exist", () => {
      // set up
      const expected = 'WARNING - item not in basket'
      // execute
      const result = basket.removeItems(99)
      // verify
      expect(result).toEqual(expected)
    })
  })
  describe('/ item information', () => {
    it('/ returns the price of an item', () => {
      // set up
      const expected = 2.99
      // execute
      const result = basket.checkPrice('BGSE')
      // verify
      expect(result).toEqual(expected)
    })

    it('/ returns the price of all items in the basket', () => {
      // set up
      const expected = 5.84
      // execute
      basket.basketSize = 6
      basket.addToBasket('BGLO')
      basket.addToBasket('BGLP')
      basket.addToBasket('BGLE')
      basket.addToBasket('BGLS')
      basket.addToBasket('COF')
      basket.addToBasket('BGSE')

      const result = basket.totalBasketPrice()
      // verify
      expect(result).toEqual(expected)
    })
  })

  describe('/ basket functionality', () => {
    it('/ allows a manager to increase basket size if required', () => {
      // set up
      const expected = [
        {
          sku: 'BGLO',
          price: 0.49,
          name: 'Bagel',
          variant: 'Onion',
          discount: '6 for 2.49',
          saving: 0.45,
          discountTrigger: 6
        },
        {
          sku: 'BGLP',
          price: 0.39,
          name: 'Bagel',
          variant: 'Plain',
          discount: '12 for 3.99',
          saving: 0.69,
          discountTrigger: 12
        },
        {
          sku: 'BGLE',
          price: 0.49,
          name: 'Bagel',
          variant: 'Everything',
          discount: '6 for 2.49',
          saving: 0.45,
          discountTrigger: 6
        },
        {
          sku: 'BGLS',
          price: 0.49,
          name: 'Bagel',
          variant: 'Sesame'
        },
        {
          sku: 'COF',
          price: 0.99,
          name: 'Coffee',
          variant: 'Black',
          discount: 'Coffee and bagel for .99',
          saving: 0.39
        },
        {
          sku: 'BGSE',
          price: 2.99,
          name: 'Bagel Sandwich',
          variant: 'Everything'
        }
      ]
      // execute
      basket.changeBasketSize(6)
      basket.addToBasket('BGLO')
      basket.addToBasket('BGLP')
      basket.addToBasket('BGLE')
      basket.addToBasket('BGLS')
      basket.addToBasket('COF')
      basket.addToBasket('BGSE')
      const result = basket.basketArray
      // verify
      expect(result).toEqual(expected)
    })

    it('/ applies special offer pricing to the basket total', () => {
      // set up
      const expected = 6.48
      // execute
      basket.basketSize = 50
      basket.addToBasket('BGLO')
      basket.addToBasket('BGLO')
      basket.addToBasket('BGLO')
      basket.addToBasket('BGLO')
      basket.addToBasket('BGLO')
      basket.addToBasket('BGLO')
      basket.addToBasket('BGLP')
      basket.addToBasket('BGLP')
      basket.addToBasket('BGLP')
      basket.addToBasket('BGLP')
      basket.addToBasket('BGLP')
      basket.addToBasket('BGLP')
      basket.addToBasket('BGLP')
      basket.addToBasket('BGLP')
      basket.addToBasket('BGLP')
      basket.addToBasket('BGLP')
      basket.addToBasket('BGLP')
      basket.addToBasket('BGLP')

      const result = basket.totalBasketPrice()
      // verify
      expect(result).toEqual(expected)
    })
  })
})
