function makeDatabaseCall (valueToFind, resolve) {
  var delay = Math.random() * 10000
  setTimeout(function () {
    let value = valueToFind === 'Cost' ? 100 : valueToFind === 'Tax' ? 15 : 10
    resolve(value)
  }, delay)
}

function getCostInfo () {
  return new Promise(function (resolve, reject) {
    makeDatabaseCall('Cost', resolve)
  })
}

function getTaxInfo () {
  return new Promise(function (resolve, reject) {
    makeDatabaseCall('Tax', resolve)
  })
}

function getDiscountInfo () {
  return new Promise(function (resolve, reject) {
    makeDatabaseCall('Discount', resolve)
  })
}

let costPromise = getCostInfo()
let taxPromise = getTaxInfo()
let discountPromise = getDiscountInfo()

let total = 0
let cost

costPromise
  .then(function (value) {
    cost = value
    total = cost
    console.log('total is ' + total)
    return taxPromise
  })
  .then(function (tax) {
    total = total + tax / 100 * cost
    console.log('total is ' + total)
    return discountPromise
  })
  .then(function (discount) {
    discount = discount / 100 * total
    total = total - discount
    console.log('total is ' + total)
  })
  .then(function () {
    console.log('total is ' + total)
  })
