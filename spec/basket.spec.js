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
				saving: -0.49,
				discountTrigger: 6,
			},
		]
		// execute
		basket.addToBasket('BGLO')
		const result = basket.basketArray
		// verify
		expect(result).toEqual(expected)
	})
	it('Adds item with same ID multiple times', () => {
		// set up
		const expected = 'Your item is in the cart'
		// execute
		basket.addToBasket('BGLO')

		const result = basket.addToBasket('BGLO')
		// verify
		expect(result).toEqual(expected)
	})

	it('no item is added to basket', () => {
		// set up
		const expected = []
		// execute
		basket.addToBasket('')
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
				saving: -0.49,
				discountTrigger: 6,
			},
			{
				sku: 'BGLP',
				price: 0.39,
				name: 'Bagel',
				variant: 'Plain',
				discount: '12 for 3.99',
				saving: -0.69,
			},
			{
				sku: 'BGLE',
				price: 0.49,
				name: 'Bagel',
				variant: 'Everything',
				discount: '6 for 2.49',
				saving: -0.49,
			},
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
				saving: -0.49,
			},
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

	it('try to remove an item that is not in the basket', () => {
		// set up
		const expected = [
			{
				sku: 'BGLE',
				price: 0.49,
				name: 'Bagel',
				variant: 'Everything',
				discount: '6 for 2.49',
				saving: -0.49,
			},
		]
		// execute

		basket.addToBasket('BGLE')
		basket.removeItems('BGLO')

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

	it('allows a manager to increase basket size if required', () => {
		// set up
		const expected = [
			{
				sku: 'BGLO',
				price: 0.49,
				name: 'Bagel',
				variant: 'Onion',
				discount: '6 for 2.49',
				saving: -0.49,
				discountTrigger: 6,
			},
			{
				sku: 'BGLP',
				price: 0.39,
				name: 'Bagel',
				variant: 'Plain',
				discount: '12 for 3.99',
				saving: -0.69,
			},
			{
				sku: 'BGLE',
				price: 0.49,
				name: 'Bagel',
				variant: 'Everything',
				discount: '6 for 2.49',
				saving: -0.49,
			},
			{
				sku: 'BGLS',
				price: 0.49,
				name: 'Bagel',
				variant: 'Sesame',
			},
			{
				sku: 'COF',
				price: 0.99,
				name: 'Bagel',
				variant: '',
			},
			{
				sku: 'BGSE',
				price: 2.99,
				name: 'Bagel Sandwich',
				variant: 'Everything',
			},
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
		const expected = [2.99]
		// execute
		basket.checkPrice('BGSE')
		const result = basket.priceArray
		// verify
		expect(result).toEqual(expected)
	})

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

	it('Applies special offer pricing to the basket total', () => {
		// set up
		const expected = 2.49
		// execute
		basket.basketSize = 50
		basket.addToBasket('BGLO')
		basket.addToBasket('BGLO')
		basket.addToBasket('BGLO')
		basket.addToBasket('BGLO')
		basket.addToBasket('BGLO')
		basket.addToBasket('BGLO')

		const result = basket.totalBasketPrice()
		// verify
		expect(result).toEqual(expected)
	})
})
