const menu = require("./inventory.js");

class Basket {
    constructor() {
        this.basketArray = [];
        this.basketSize = 4;
        this.priceArray = []
        this.discountedArray = []
        this.count = 0;
    }
    addToBasket(sku) {
        for (let i = 0; i < menu.length; i++) {
            if (menu[i].sku === sku && this.basketArray.length < this.basketSize) {
                this.basketArray.push(menu[i])
            }
        }
        return "WARNING - Basket is full"
    }

    removeItems(sku) {
        for (var i = 0; i < this.basketArray.length; i++) {
            if (this.basketArray[i].sku === sku) {
                this.basketArray.splice(i, 1);
            }
        }
        return "That item isn't in your basket"
    }

    checkPrice(sku) {
        for (let i = 0; i < menu.length; i++) {
            if (menu[i].sku === sku) {
                this.priceArray.push(menu[i].price)
            }
        }
    }

    totalBasketPrice() {
        let totalPrice = 0
        for (let i = 0; i < this.basketArray.length; i++) {
            totalPrice += this.basketArray[i].price
        }
        let discountedPrice = this.discountedPrice()
        totalPrice = totalPrice + discountedPrice
        return Number(totalPrice.toFixed(2))
    }

    addToDiscountedArray(){
        for (let i = 0; i < this.basketArray.length; i++) {
            this.discountedArray.push(this.basketArray[i].sku)
        }
    }

    cofBagelDiscount(totalDiscount){
        if ('COF' in this.count && 'BGLP' in this.count) {
            const bagelRest = this.count['BGLP'] % 12
            if (bagelRest != 0) {
                const howManyCoffee = this.count['COF']
                const lesserBetweenBagelCoffee = Math.min(bagelRest, howManyCoffee)
                totalDiscount -= 0.39 * lesserBetweenBagelCoffee
            }
        }
        return totalDiscount
    }

    bagelDiscount(totalDiscount){
        const skus = Object.keys(this.count)
        for (let i = 0; i < skus.length; i++) {
            const count = this.count[skus[i]]
            const item = this.getItem(skus[i])
            if (item.discount) {
                if (count >= item.discountTrigger) {
                    totalDiscount += item.saving * (Math.floor(count / item.discountTrigger))
                }
            }
        }
        totalDiscount = this.cofBagelDiscount(totalDiscount)
        return totalDiscount
    }

    discountedPrice() {
        this.addToDiscountedArray()
        this.count = this.discountedArray.reduce((tally, sku) => {
            tally[sku] = (tally[sku] || 0) + 1
            return tally
        }, {})
        let totalDiscount = 0;
        totalDiscount = this.bagelDiscount(totalDiscount)
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


module.exports = Basket;


