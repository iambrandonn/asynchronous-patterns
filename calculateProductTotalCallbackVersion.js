/*
Problem statement:
You are running an ecommerce site and before a person checks out, you need to calculate the total cost of a product in their cart.
The total cost is the original cost + tax - discount. You need to get each of these values from the database and in order
to be performant, you need to make all the db calls at the same time and make the calculations as soon as you are able to.
 */

function makeDatabaseCall(valueToFind, cb) {
    var delay = Math.random() * 10000;
    setTimeout(function() {
	    let value = valueToFind === "Cost" ? 100 : valueToFind === "Tax" ? 15 : 10;
	    cb(value)
	},delay);
}

function getCostInfo() {
    makeDatabaseCall("Cost", function(value){
	    processInfo("Cost",value);
	});
}

function getTaxInfo() {
    makeDatabaseCall("Tax", function(value){
	    processInfo("Tax",value);
	});
}

function getDiscountInfo() {
    makeDatabaseCall("Discount", function(value){
	    processInfo("Discount",value);
	});
}

let cost, tax, discount;
let processedTotal;

let total = 0;
function processInfo(infoToFind, valueToProcess) {
    console.log("Value of " + infoToFind + " is " + valueToProcess);
    if (infoToFind === "Cost") {
		cost = valueToProcess;
		total = cost;
    }
    
    if (infoToFind === "Tax") {
		tax = valueToProcess;
		if (cost) {
	    	total = cost + (tax / 100 * cost)
		}
    }
    if (infoToFind === "Discount") {
		discount = valueToProcess;
		if (cost && tax) {
	    	total = cost + (tax / 100 * cost) - (discount / 100 * cost)
			processedTotal = true
		}
    }

    if (!processedTotal) {
		console.log('processing total.....');
		total = cost + (tax / 100 * cost) - (discount / 100 * cost)
	}

    if(total) {
		console.log("total is " + total);
    }
}

getCostInfo();
getTaxInfo();
getDiscountInfo();