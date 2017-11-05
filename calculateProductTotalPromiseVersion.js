/*
Problem statement:
You are running an ecommerce site and before a person checks out, you need to calculate the total cost of a product in their cart.
The total cost is the original cost + tax - discount. You need to get each of these values from the database and in order
to be performant, you need to make all the db calls at the same time and make the calculations as soon as you are able to.
 */

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


let costPromise = getCostInfo()
let taxPromise = getTaxInfo()
let discountPromise = getDiscountInfo()

let total = 0
let cost

costPromise.
then(function(value) {
	cost = value
	total = cost
	console.log('total is ' +  total)
	return taxPromise	
}).then(function(tax) {
	total = total + (tax / 100 * cost)
	console.log('total is ' +  total)
	return discountPromise
}).then(function(discount) {
	discount = (discount / 100 * total)
	total = total - discount
	console.log('total is ' +  total)
}).then(function() {
	console.log('total is ' +  total)
})


