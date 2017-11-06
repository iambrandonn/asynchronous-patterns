var Q = require('q')

function makeDatabaseCall (valueToFind, resolve) {
  var delay = Math.random() * 10000
  setTimeout(() => {
    let value = valueToFind === 'Cost' ? 100 : valueToFind === 'Tax' ? 15 : 10
    resolve(value)
  }, delay)
}

function getCostInfo () {
  return new Promise((resolve, reject) => {
    makeDatabaseCall('Cost', resolve)
  })
}

function getTaxInfo () {
  return new Promise((resolve, reject) => {
    makeDatabaseCall('Tax', resolve)
  })
}

function getDiscountInfo () {
  return new Promise((resolve, reject) => {
    makeDatabaseCall('Discount', resolve)
  })
}

Q.spawn(function * () {
  let costPromise = getCostInfo()
  let taxPromise = getTaxInfo()
  let discountPromise = getDiscountInfo()

  let cost = yield costPromise
  let tax = yield taxPromise
  let total = cost + tax / 100 * cost

  let discount = yield discountPromise
  total = total - discount / 100 * total

  console.log(`Total is ${total}`)
})
