var Q = require('q')

function makeDatabaseCall(valueToFind, resolve) {
    var delay = Math.random() * 10000;
    setTimeout(function() {
	    let value = valueToFind === "Cost" ? 100 : valueToFind === "Tax" ? 15 : 10
	    resolve(value)
	},delay)
}

function getCostInfo() {
    return new Promise(function(resolve, reject) {
    	makeDatabaseCall("Cost", resolve)
	})
}

function getTaxInfo() {
    return new Promise(function(resolve, reject) {
    	makeDatabaseCall("Tax", resolve)
	})
}

function getDiscountInfo() {
    return new Promise(function(resolve, reject) {
    	makeDatabaseCall("Discount", resolve)
	})
}

Q.spawn(function* () {
    let cost = yield getCostInfo()
    let tax = yield getTaxInfo()
    let discount = yield getDiscountInfo()

    let total = cost + (tax / 100 * cost)
    total = total - (discount / 100 * total)
    console.log('Total is ' +  total)
});




