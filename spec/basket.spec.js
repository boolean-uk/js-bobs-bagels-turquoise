const Basket = require('../src/basket.js')

describe('Basket', () => {
  let basket

  beforeEach(() => {
    basket = new Basket()
  })

  it('adds 1 item to basket', () => {
    // set up
    const expected = [
      {
        sku: 'BGLO',
        price: 0.49,
        name: 'Bagel',
        variant: 'Onion',
        discount: '6 for 2.49',
        saving: -0.45,
        discountTrigger: 6
      }
    ]
    // execute
    basket.addToBasket('BGLO')
    const result = basket.basketArray
    // verify
    expect(result).toEqual(expected)
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
        saving: -0.45,
        discountTrigger: 6
      },
      {
        sku: 'BGLP',
        price: 0.39,
        name: 'Bagel',
        variant: 'Plain',
        discount: '12 for 3.99',
        saving: -0.69,
        discountTrigger: 12
      },
      {
        sku: 'BGLE',
        price: 0.49,
        name: 'Bagel',
        variant: 'Everything',
        discount: '6 for 2.49',
        saving: -0.45,
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

  it('remove items from basket', () => {
    // set up
    const expected = [
      {
        sku: 'BGLE',
        price: 0.49,
        name: 'Bagel',
        variant: 'Everything',
        discount: '6 for 2.49',
        saving: -0.45,
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

  it('trys to add more than one item to a basket that is full', () => {
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

  it("trys to add an item that doesn't exist", () => {
    // set up
    const expected = 'This item does not exist'
    // execute

    const result = basket.addToBasket('BGLL')
    // verify
    expect(result).toEqual(expected)
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
        saving: -0.45,
        discountTrigger: 6
      },
      {
        sku: 'BGLP',
        price: 0.39,
        name: 'Bagel',
        variant: 'Plain',
        discount: '12 for 3.99',
        saving: -0.69,
        discountTrigger: 12
      },
      {
        sku: 'BGLE',
        price: 0.49,
        name: 'Bagel',
        variant: 'Everything',
        discount: '6 for 2.49',
        saving: -0.45,
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
    basket.updateBasketSize(6)
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

  it('trys to update basket size with invalid input', () => {
    const expected = 'Please input a valid number'

    const result = basket.updateBasketSize('this is a string')

    expect(result).toEqual(expected)
  })

  it("It can't remove items from basket that doesn't exist", () => {
    // set up
    const expected = "That item isn't in your basket"
    // execute

    const result = basket.removeItems(99)
    // verify
    expect(result).toEqual(expected)
  })

  it('returns the price of an item', () => {
    // set up
    const expected = 2.99
    // execute

    const result = basket.checkPrice('BGSE')
    // verify
    expect(result).toEqual(expected)
  })

  it("trys to check price for item that doesn't exist", () => {
    const expected = 'This item does not exist'

    const result = basket.checkPrice('BGSA')

    expect(result).toEqual(expected)
  })

  it('returns the price of all items in the basket', () => {
    // set up
    const expected = 5.45
    // execute

    basket.updateBasketSize(10)
    basket.addToBasket('BGLO')
    basket.addToBasket('BGLE')
    basket.addToBasket('BGLS')
    basket.addToBasket('COF')
    basket.addToBasket('BGSE')
    const result = basket.totalBasketPrice()
    // verify
    expect(result).toEqual(expected)
  })

  it('Applies discount for 16 plain bagels', () => {
    const expected = 5.55

    basket.updateBasketSize(16)
    for (let i = 0; i < 16; i++) {
      basket.addToBasket('BGLP')
    }

    const result = basket.totalBasketPrice()

    expect(result).toEqual(expected)
  })

  it('Applies normal price after coffee & plain bagel discount', () => {
    const expected = 2.24

    basket.addToBasket('COF')
    basket.addToBasket('COF')
    basket.addToBasket('BGLP')

    const result = basket.totalBasketPrice()

    expect(result).toEqual(expected)
  })

  it('Applies discount for 13 plain bagels & 2 coffee and plain bagel deals', () => {
    const expected = 6.88

    basket.updateBasketSize(20)
    for (let i = 0; i < 12; i++) {
      basket.addToBasket('BGLP')
    }
    basket.addToBasket('COF')
    basket.addToBasket('BGLP')
    basket.addToBasket('COF')
    basket.addToBasket('BGLP')
    basket.addToBasket('BGLP')

    const result = basket.totalBasketPrice()

    expect(result).toEqual(expected)
  })

  it('Applies special offer pricing to the basket total', () => {
    // set up
    const expected = 8.47
    // execute
    basket.updateBasketSize(20)
    basket.addToBasket('BGLO')
    basket.addToBasket('BGLO')
    basket.addToBasket('BGLO')
    basket.addToBasket('BGLO')
    basket.addToBasket('BGLO')
    basket.addToBasket('BGLO')
    basket.addToBasket('BGLE')
    basket.addToBasket('BGLE')
    basket.addToBasket('BGLE')
    basket.addToBasket('BGLE')
    basket.addToBasket('BGLE')
    basket.addToBasket('BGLE')
    basket.addToBasket('COF')
    basket.addToBasket('BGLP')
    basket.addToBasket('COF')
    basket.addToBasket('BGLP')
    basket.addToBasket('COF')

    const result = basket.totalBasketPrice()
    // verify
    expect(result).toEqual(expected)
  })

  it('Applies special offer pricing to the basket total with multiple deals', () => {
    // set up
    const expected = 10.43
    // execute
    basket.updateBasketSize(50)

    for (let i = 0; i < 12; i++) {
      basket.addToBasket('BGLP')
    }

    for (let i = 0; i < 6; i++) {
      basket.addToBasket('BGLE')
    }
    basket.addToBasket('BGLO')
    basket.addToBasket('BGLO')
    basket.addToBasket('COF')
    basket.addToBasket('COF')
    basket.addToBasket('COF')

    const result = basket.totalBasketPrice()
    // verify
    expect(result).toEqual(expected)
  })
})
