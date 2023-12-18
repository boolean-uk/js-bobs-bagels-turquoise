const Basket = require('../src/basket.js')

describe('Basket', () => {
  let basket

  beforeEach(() => {
    basket = new Basket()
  })

  describe('when adding items', () => {
    it('adds 1 item to basket', () => {
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
      const result = basket.addToBasket('BGLO')
      const updatedBasket = basket.basketArray

      // verify
      expect(result).toBeTrue()
      expect(updatedBasket).toEqual(expected)
    })

    it('adds 3 items to basket', () => {
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

    it('tries adding an item that does not exist', () => {
      // set up
      const expected = 'this item does not exist'

      // execute
      const result = basket.addToBasket()

      // verify
      expect(result).toEqual(expected)
    })

    it('tries to add more than one item to a basket that is full', () => {
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
  })

  describe('when removing items', () => {
    it('remove items from basket', () => {
      // set up
      const expected = [
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
      const result = basket.removeItems('BGLO')
      const updatedBasket = basket.basketArray

      // verify
      expect(result).toBeTrue()
      expect(updatedBasket).toEqual(expected)
    })

    it("It can't remove items from basket that doesn't exist", () => {
      // set up
      const expected = "That item isn't in your basket"

      // execute
      const result = basket.removeItems(99)

      // verify
      expect(result).toEqual(expected)
    })
  })

  it('allows a manager to increase basket size if required', () => {
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
        name: 'Bagel',
        variant: ''
      },
      {
        sku: 'BGSE',
        price: 2.99,
        name: 'Bagel Sandwich',
        variant: 'Everything'
      }
    ]
    // execute
    basket.basketSize = 6
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

  describe('when checking an item price', () => {
    it('returns the price of an item', () => {
      // set up
      const expected = [2.99]

      // execute
      const result = basket.checkPrice('BGSE')
      const updatedPriceArray = basket.priceArray

      // verify
      expect(result).toBeTrue()
      expect(updatedPriceArray).toEqual(expected)
    })

    it('unable to check price of item that does not exist', () => {
      // set up
      const expected = 'sorry this item does not exist'

      // execute
      const result = basket.checkPrice()

      // verify
      expect(result).toEqual(expected)
    })
  })

  describe('calculate total price', () => {
    it('returns the price of all items in the basket', () => {
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
      basket.checkPrice('BGLO')
      basket.checkPrice('BGLP')
      basket.checkPrice('BGLE')
      basket.checkPrice('BGLS')
      basket.checkPrice('COF')
      basket.checkPrice('BGSE')
      const result = basket.totalBasketPrice()

      // verify
      expect(result).toEqual(expected)
    })
  })

  describe('calculate special offer pricing', () => {
    it('for onion bagel', () => {
      // set up
      const expected = 2.49

      // execute
      basket.basketSize = 6
      basket.addToBasket('BGLO')
      basket.addToBasket('BGLO')
      basket.addToBasket('BGLO')
      basket.addToBasket('BGLO')
      basket.addToBasket('BGLO')
      basket.addToBasket('BGLO')
      basket.checkPrice('BGLO')
      basket.checkPrice('BGLO')
      basket.checkPrice('BGLO')
      basket.checkPrice('BGLO')
      basket.checkPrice('BGLO')
      basket.checkPrice('BGLO')

      const result = basket.totalBasketPrice()

      // verify
      expect(result).toEqual(expected)
    })

    it('for everything bagel', () => {
      // set up
      const expected = 2.49

      // execute
      basket.basketSize = 6
      basket.addToBasket('BGLE')
      basket.addToBasket('BGLE')
      basket.addToBasket('BGLE')
      basket.addToBasket('BGLE')
      basket.addToBasket('BGLE')
      basket.addToBasket('BGLE')
      basket.checkPrice('BGLE')
      basket.checkPrice('BGLE')
      basket.checkPrice('BGLE')
      basket.checkPrice('BGLE')
      basket.checkPrice('BGLE')
      basket.checkPrice('BGLE')

      const result = basket.totalBasketPrice()

      // verify
      expect(result).toEqual(expected)
    })

    it('for plain bagel', () => {
      // set up
      const expected = 3.99

      // execute
      basket.basketSize = 12
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
      basket.checkPrice('BGLP')
      basket.checkPrice('BGLP')
      basket.checkPrice('BGLP')
      basket.checkPrice('BGLP')
      basket.checkPrice('BGLP')
      basket.checkPrice('BGLP')
      basket.checkPrice('BGLP')
      basket.checkPrice('BGLP')
      basket.checkPrice('BGLP')
      basket.checkPrice('BGLP')
      basket.checkPrice('BGLP')
      basket.checkPrice('BGLP')

      const result = basket.totalBasketPrice()

      // verify
      expect(result).toEqual(expected)
    })
  })

  it('when multiple special offers in basket as well as non special offer items', () => {
    // set up
    const expected = 5.47

    // execute
    basket.basketSize = 20
    basket.addToBasket('BGLO')
    basket.addToBasket('BGLO')
    basket.addToBasket('BGLO')
    basket.addToBasket('BGLO')
    basket.addToBasket('BGLO')
    basket.addToBasket('BGLO') // 2.49 for 6
    basket.addToBasket('BGLE')
    basket.addToBasket('BGLE')
    basket.addToBasket('BGLE')
    basket.addToBasket('BGLE')
    basket.addToBasket('BGLE')
    basket.addToBasket('BGLE') // 2.49 for 6
    basket.addToBasket('BGLS') // 0.49

    basket.checkPrice('BGLO')
    basket.checkPrice('BGLO')
    basket.checkPrice('BGLO')
    basket.checkPrice('BGLO')
    basket.checkPrice('BGLO')
    basket.checkPrice('BGLO')
    basket.checkPrice('BGLE')
    basket.checkPrice('BGLE')
    basket.checkPrice('BGLE')
    basket.checkPrice('BGLE')
    basket.checkPrice('BGLE')
    basket.checkPrice('BGLE')
    basket.checkPrice('BGLS')

    const result = basket.totalBasketPrice()

    // verify
    expect(result).toEqual(expected)
  })
})
